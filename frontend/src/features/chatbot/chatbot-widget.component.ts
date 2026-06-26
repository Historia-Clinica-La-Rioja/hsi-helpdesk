import { Component, Output, EventEmitter, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  content: string;
  timestamp: Date;
  isCTA?: boolean;
  isEscalation?: boolean;
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Action Button (FAB) -->
    <div class="bot-fab-container" [class.hidden]="isOpen()">
      <span class="bot-fab-label">ChatBot</span>
      <button class="bot-fab animate-pulse-slow" (click)="toggleChat()">
        <!-- Decorative notification dot -->
        <span class="notification-dot"></span>
        <div class="fab-bot-icon">
          <span class="bot-eyes"></span>
        </div>
      </button>
    </div>

    <!-- Chat Window Modal / Overlay -->
    @if (isOpen()) {
      <div class="chat-overlay" (click)="closeChat()">
        <div class="chat-window" (click)="$event.stopPropagation()">
          
          <!-- Header -->
          <div class="chat-header">
            <div class="header-left">
              <div class="header-bot-icon">
                <span class="bot-eyes-mini"></span>
              </div>
              <div class="header-info">
                <span class="bot-name">Asistente HSI</span>
                <div class="status-indicator">
                  <span class="status-dot"></span>
                  <span class="status-text">En línea</span>
                </div>
              </div>
            </div>
            
            <div class="header-actions">
              <button class="refresh-btn" (click)="resetChat()" title="Reiniciar chat">
                <span class="material-icons">refresh</span>
              </button>
              <button class="close-btn" (click)="closeChat()">
                <span class="material-icons">close</span>
              </button>
            </div>
          </div>

          <!-- Message History Area -->
          <div class="chat-history" #scrollContainer>
            @for (msg of messages(); track msg.id) {
              <div class="message-row" [ngClass]="msg.sender">
                
                @if (msg.sender === 'bot' || msg.sender === 'agent') {
                  <div class="bot-avatar" [class.agent-avatar]="msg.sender === 'agent'">
                    <span class="material-icons avatar-icon">
                      {{ msg.sender === 'bot' ? 'smart_toy' : 'support_agent' }}
                    </span>
                  </div>
                }

                <div 
                  class="message-bubble" 
                  [ngClass]="{
                    'bot-bubble': msg.sender === 'bot',
                    'user-bubble': msg.sender === 'user',
                    'agent-bubble': msg.sender === 'agent',
                    'escalation-bubble': msg.isEscalation
                  }"
                >
                  <p>{{ msg.content }}</p>
                  
                  @if (msg.isCTA) {
                    <button class="cta-btn" (click)="triggerCTA()">
                      Ir a Tickets →
                    </button>
                  }
                </div>
              </div>
            }

            <!-- FAQ Suggestions chips -->
            @if (showFAQChips()) {
              <div class="faq-chips-row">
                <button 
                  class="faq-chip" 
                  (click)="onFAQClick('¿Cómo cargo un ticket?')"
                >
                  ¿Cómo cargo un ticket?
                </button>
                <button 
                  class="faq-chip" 
                  (click)="onFAQClick('Olvidé mi contraseña')"
                >
                  Olvidé mi contraseña
                </button>
                <button 
                  class="faq-chip" 
                  (click)="onFAQClick('Estado de mi ticket')"
                >
                  Estado de mi ticket
                </button>
              </div>
            }

            <!-- Typing indicator -->
            @if (isTyping()) {
              <div class="message-row bot">
                <div class="bot-avatar">
                  <span class="material-icons avatar-icon">smart_toy</span>
                </div>
                <div class="message-bubble bot-bubble typing-bubble">
                  <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Input Bar -->
          <form class="chat-input-bar" (submit)="onSubmit($event)">
            <textarea 
              rows="1"
              [(ngModel)]="userInput"
              name="userInput"
              placeholder="Escribí tu consulta..."
              (keydown.enter)="onEnterKey($event)"
              #inputTextarea
            ></textarea>
            
            <button type="submit" class="send-btn" [disabled]="!userInput.trim() || isTyping()">
              <span class="material-icons">send</span>
            </button>
          </form>

        </div>
      </div>
    }
  `,
  styles: [`
    /* FAB Button style */
    .bot-fab-container {
      position: fixed;
      bottom: 32px;
      right: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      z-index: 999;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .bot-fab-container.hidden {
      opacity: 0;
      transform: scale(0.8);
      pointer-events: none;
    }

    .bot-fab-label {
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      color: var(--bot-blue);
      text-shadow: 0 1px 2px rgba(255,255,255,0.8);
    }

    .bot-fab {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-bot);
      background: var(--bot-fab-gradient);
      border: none;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-bot-fab);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      outline: none;
    }

    .bot-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 24px rgba(64,141,243,0.55);
    }

    .notification-dot {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: var(--bot-yellow);
      border-radius: 50%;
      top: 4px;
      right: 4px;
      border: 1.5px solid white;
    }

    .fab-bot-icon {
      width: 28px;
      height: 20px;
      border: 3px solid white;
      border-radius: 5px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bot-eyes {
      display: flex;
      gap: 4px;
    }

    .bot-eyes::before, .bot-eyes::after {
      content: '';
      width: 4px;
      height: 4px;
      background-color: var(--bot-yellow);
      border-radius: 50%;
    }

    /* Modal Overlay */
    .chat-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(51, 49, 67, 0.3);
      z-index: 1000;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }

    .chat-window {
      width: 380px;
      height: 560px;
      background-color: var(--color-bg-primary);
      border-radius: var(--radius-chat);
      box-shadow: var(--shadow-bot-chat);
      margin-bottom: 32px;
      margin-right: 32px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Header */
    .chat-header {
      background: var(--bot-blue-gradient);
      height: 64px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-bot-icon {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-bot);
      background: var(--bot-fab-gradient);
      border: 1.5px solid rgba(255,255,255,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bot-eyes-mini {
      width: 16px;
      height: 12px;
      border: 2px solid white;
      border-radius: 3px;
      position: relative;
    }
    .bot-eyes-mini::before, .bot-eyes-mini::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 3px;
      background-color: var(--bot-yellow);
      border-radius: 50%;
      top: 2px;
    }
    .bot-eyes-mini::before { left: 2px; }
    .bot-eyes-mini::after { right: 2px; }

    .header-info {
      display: flex;
      flex-direction: column;
    }

    .bot-name {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 600;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      background-color: var(--color-success);
      border-radius: 50%;
    }

    .status-text {
      font-family: var(--font-body);
      font-size: 11px;
      opacity: 0.8;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .refresh-btn, .close-btn {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
      transition: opacity 0.2s;
      outline: none;
    }

    .refresh-btn:hover, .close-btn:hover {
      opacity: 1;
    }

    /* Chat History */
    .chat-history {
      flex: 1;
      background-color: var(--color-bg-secondary);
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .message-row {
      display: flex;
      gap: 8px;
      width: 100%;
    }

    .message-row.bot, .message-row.agent {
      justify-content: flex-start;
    }

    .message-row.user {
      justify-content: flex-end;
    }

    .bot-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--bot-fab-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 4px;
    }

    .bot-avatar.agent-avatar {
      background: var(--bot-blue-gradient);
    }

    .avatar-icon {
      font-size: 14px;
      color: white;
    }

    .message-bubble {
      max-width: 80%;
      padding: 10px 14px;
      font-family: var(--font-body);
      font-size: 14px;
      line-height: 1.5;
    }

    .bot-bubble {
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: 4px 16px 16px 16px;
      color: var(--color-text-primary);
    }

    .user-bubble {
      background-color: var(--bot-blue);
      border-radius: 16px 4px 16px 16px;
      color: white;
    }

    .agent-bubble {
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: 4px 16px 16px 16px;
      color: var(--color-text-primary);
    }

    .escalation-bubble {
      border: 1.5px solid var(--bot-orange) !important;
      background-color: #FFF9F3 !important;
    }

    /* FAQ Suggestions Chips */
    .faq-chips-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 32px;
      align-items: flex-start;
      margin-top: -8px;
    }

    .faq-chip {
      background-color: #EBF4FD;
      border: 1px solid var(--bot-blue);
      color: var(--bot-blue);
      padding: 6px 14px;
      border-radius: 12px;
      font-family: var(--font-body);
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      text-align: left;
    }

    .faq-chip:hover {
      background-color: #D6E9FC;
    }

    .faq-chip:active {
      transform: scale(0.97);
    }

    /* CTA Button inside bot message */
    .cta-btn {
      margin-top: 8px;
      background-color: var(--bot-blue);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 8px 16px;
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: block;
      transition: background-color 0.2s;
    }

    .cta-btn:hover {
      background-color: #2F7CE5;
    }

    /* Input Bar */
    .chat-input-bar {
      background-color: var(--color-bg-primary);
      border-top: 1px solid var(--color-border);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chat-input-bar textarea {
      flex: 1;
      height: 36px;
      max-height: 80px;
      padding: 8px 0;
      border: none;
      outline: none;
      resize: none;
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--color-text-primary);
    }

    .send-btn {
      width: 36px;
      height: 36px;
      background-color: #EBF4FD;
      border: none;
      border-radius: 50%;
      color: var(--bot-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      flex-shrink: 0;
    }

    .send-btn:hover:not(:disabled) {
      background-color: #D6E9FC;
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Typing Dots */
    .typing-bubble {
      padding: 12px 16px;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .typing-indicator span {
      width: 6px;
      height: 6px;
      background-color: var(--color-text-muted);
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }

    .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `]
})
export class ChatbotWidgetComponent implements AfterViewChecked {
  @Output() navigateToTickets = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('inputTextarea') private inputTextarea!: ElementRef;

  isOpen = signal(false);
  isTyping = signal(false);
  showFAQChips = signal(true);
  userInput = '';

  messages = signal<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'bot',
      content: '¡Hola! Soy el asistente virtual de HSI. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      setTimeout(() => this.inputTextarea?.nativeElement?.focus(), 100);
    }
  }

  closeChat(): void {
    this.isOpen.set(false);
    this.resetChat();
  }

  resetChat(): void {
    this.showFAQChips.set(true);
    this.messages.set([
      {
        id: 'msg_1',
        sender: 'bot',
        content: '¡Hola! Soy el asistente virtual de HSI. ¿En qué puedo ayudarte hoy?',
        timestamp: new Date()
      }
    ]);
    this.isTyping.set(false);
  }

  onFAQClick(faq: string): void {
    this.showFAQChips.set(false);
    this.addMessage('user', faq);
    this.isTyping.set(true);

    setTimeout(() => {
      this.isTyping.set(false);

      if (faq === '¿Cómo cargo un ticket?') {
        this.messages.set([
          ...this.messages(),
          {
            id: 'msg_' + Math.random(),
            sender: 'bot',
            content: 'Para cargar un ticket de soporte, dirigite a la sección "Tickets" en el menú superior y completá el formulario. Podés agregar la prioridad, etiquetas y capturas de pantalla para ayudarnos a resolverlo.',
            timestamp: new Date(),
            isCTA: true
          }
        ]);
      } else if (faq === 'Olvidé mi contraseña') {
        this.addMessage('bot', 'Para blanquear tu contraseña de Historia de Salud Integrada, debes comunicarte con el administrador de HSI de tu institución asistencial o escribir al área de sistemas del Ministerio de Salud.');
        this.simulateEscalation();
      } else {
        // Estado de mi ticket
        this.addMessage('bot', 'Podés revisar el estado de tus consultas activas ingresando a la pestaña "Tickets" y luego haciendo click en el ícono de listado de tickets en la barra lateral izquierda.');
        this.simulateEscalation();
      }
    }, 1200);
  }

  onEnterKey(event: Event): void {
    event.preventDefault();
    this.onSubmit();
  }

  onSubmit(event?: Event): void {
    if (event) event.preventDefault();
    const input = this.userInput.trim();
    if (!input || this.isTyping()) return;

    this.userInput = '';
    this.showFAQChips.set(false);
    this.addMessage('user', input);
    this.isTyping.set(true);

    setTimeout(() => {
      this.isTyping.set(false);

      if (input.toLowerCase().includes('ticket') || input.toLowerCase().includes('cargar') || input.toLowerCase().includes('crear')) {
        this.messages.set([
          ...this.messages(),
          {
            id: 'msg_' + Math.random(),
            sender: 'bot',
            content: 'Entiendo que querés cargar un ticket de soporte. Hacé click abajo para ir directamente al formulario.',
            timestamp: new Date(),
            isCTA: true
          }
        ]);
      } else {
        this.addMessage('bot', 'Entendido. Si necesitás atención personalizada respecto a esa consulta, puedo conectarte con un agente humano de soporte técnico.');
        this.simulateEscalation();
      }
    }, 1200);
  }

  private addMessage(sender: 'bot' | 'user' | 'agent', content: string, extra?: Partial<ChatMessage>): void {
    const newMsg: ChatMessage = {
      id: 'msg_' + Math.random(),
      sender,
      content,
      timestamp: new Date(),
      ...extra
    };
    this.messages.set([...this.messages(), newMsg]);
  }

  private simulateEscalation(): void {
    setTimeout(() => {
      this.messages.set([
        ...this.messages(),
        {
          id: 'msg_' + Math.random(),
          sender: 'bot',
          content: 'Te estoy conectando con un agente de soporte...',
          timestamp: new Date(),
          isEscalation: true
        }
      ]);

      // Conexión con agente Yanina
      setTimeout(() => {
        this.addMessage('agent', 'Hola, soy Yanina del equipo de soporte. Decime cuál es tu consulta y lo resolvemos.');
      }, 1500);

    }, 1000);
  }

  triggerCTA(): void {
    this.closeChat();
    this.navigateToTickets.emit();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      try {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      } catch (err) { }
    }
  }
}
