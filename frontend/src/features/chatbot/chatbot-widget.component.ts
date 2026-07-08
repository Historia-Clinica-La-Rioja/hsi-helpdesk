import { Component, Output, EventEmitter, signal, ElementRef, ViewChild, AfterViewChecked, OnInit, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Faq {
  id: string;
  label: string;
  questions: string;
  answers: string;
  is_active: boolean;
}


export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  content: string;
  timestamp: Date;
  isCTA?: boolean;
  isEscalation?: boolean;
  isEscalationPrompt?: boolean;
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bot-fab-container" [class.hidden]="isOpen()">
      <span class="bot-fab-label">ChatBot</span>
      <button class="bot-fab animate-pulse-slow" (click)="toggleChat()">
        <span class="notification-dot"></span>
        <div class="fab-bot-icon">
          <span class="bot-eyes"></span>
        </div>
      </button>
    </div>

    @if (isOpen()) {
      <div class="chat-overlay">
        <div class="chat-window" (click)="$event.stopPropagation()">

          @if (confirmAction()) {
            <div class="confirm-overlay">
              <div class="confirm-dialog">
                <span class="material-icons warning-icon">warning</span>
                <h4>¿Estás seguro?</h4>
                <p>
                  {{ confirmAction() === 'reset' 
                    ? 'Se reiniciará la conversación y perderás el historial actual.' 
                    : 'Se cerrará el chat y se borrará el progreso de tu consulta.' }}
                </p>
                <div class="confirm-actions">
                  <button class="cancel-btn" (click)="cancelConfirm()">Cancelar</button>
                  <button class="accept-btn" (click)="executeConfirm()">Confirmar</button>
                </div>
              </div>
            </div>
          }

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
              <button class="refresh-btn" (click)="promptAction('reset')" title="Reiniciar chat">
                <span class="material-icons">refresh</span>
              </button>
              <button class="minimize-btn" (click)="minimizeChat()" title="Minimizar chat">
                <span class="material-icons">remove</span>
              </button>
              <button class="close-btn" (click)="promptAction('close')" title="Cerrar y borrar chat">
                <span class="material-icons">close</span>
              </button>
            </div>
          </div> <div class="chat-history" #scrollContainer>
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

                  @if (msg.isEscalationPrompt) {
                    <button class="cta-btn" (click)="triggerEscalation()" style="background-color: var(--color-accent-teal); color: white; margin-top: 8px;">
                      👤 Hablar con un agente
                    </button>
                  }
                </div>
              </div> 
            } 
            
            @if (showFAQChips() && faqs().length > 0) {
              <div class="faq-chips-row">
                
                @if (!selectedCategory()) {
                  @for (category of uniqueCategories(); track category) {
                    <button class="faq-chip" (click)="onCategoryClick(category)">
                      {{ category }}
                    </button>
                  }
                } 
                
                @else {
                  <button class="faq-chip back-chip" (click)="onBackToCategories()" style="background-color: var(--color-bg-secondary); border-color: var(--color-border); color: var(--color-text-primary);">
                    <span class="material-icons" style="font-size: 14px; vertical-align: middle;">arrow_back</span>
                  </button>
                  
                  @for (faq of faqsForCategory(); track faq.id) {
                    <button class="faq-chip" (click)="onFAQClick(faq)">
                      {{ faq.questions }}
                    </button>
                  }
                }

              </div>
            }

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
          
          <form class="chat-input-bar" (submit)="onSubmit($event)">
            <textarea 
              rows="1"
              [(ngModel)]="userInput"
              name="userInput"
              placeholder="Escritura deshabilitada temporalmente. Por favor, usá los botones..."
              (keydown.enter)="onEnterKey($event)"
              #inputTextarea
              disabled
            ></textarea>
            
            <button type="submit" class="send-btn" [disabled]="true">
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
      position: relative; /* 👇 NUEVO: Mantiene el pop-up atrapado acá adentro */
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

    .refresh-btn, .minimize-btn, .close-btn {
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

    .refresh-btn:hover, .minimize-btn:hover, .close-btn:hover {
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

    /* Confirm Overlay */
    .confirm-overlay {
      position: absolute; /* Se posiciona relativo a .chat-window */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(51, 49, 67, 0.75);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-chat);
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .confirm-dialog {
      background-color: var(--color-bg-primary, #fff);
      padding: 24px;
      border-radius: 12px;
      width: 80%;
      text-align: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .warning-icon {
      font-size: 32px;
      color: #E29E21; /* Color de advertencia */
      margin: 0 auto;
    }

    .confirm-dialog h4 {
      margin: 0;
      font-family: var(--font-heading);
      color: var(--color-text-primary);
    }

    .confirm-dialog p {
      margin: 0;
      font-size: 13px;
      line-height: 1.4;
      color: var(--color-text-primary);
      opacity: 0.8;
    }

    .confirm-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
      justify-content: center;
    }

    .confirm-actions button {
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      font-family: var(--font-body);
      font-size: 13px;
      transition: background-color 0.2s;
    }

    .confirm-actions .cancel-btn {
      background-color: #EBF4FD;
      color: var(--bot-blue);
    }

    .confirm-actions .cancel-btn:hover {
      background-color: #D6E9FC;
    }

    .confirm-actions .accept-btn {
      background-color: var(--bot-blue);
      color: white;
    }

    .confirm-actions .accept-btn:hover {
      background-color: #2F7CE5;
    }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `]
})
export class ChatbotWidgetComponent implements AfterViewChecked, OnInit {
  @Output() navigateToTickets = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('inputTextarea') private inputTextarea!: ElementRef;

  private http = inject(HttpClient);

  isOpen = signal(sessionStorage.getItem('hsi_chat_open') === 'true');
  isTyping = signal(false);
  showFAQChips = signal(true);
  confirmAction = signal<'reset' | 'close' | null>(null);
  userInput = '';

  faqs = signal<Faq[]>([]);

  // 👇 NUEVO: Signal para saber qué categoría seleccionó el usuario
  selectedCategory = signal<string | null>(null);

  failedAttempts = signal(0);

  // 👇 NUEVO: Extraemos solo las categorías (labels) únicas para el primer menú
  uniqueCategories = computed(() => {
    const allFaqs = this.faqs();
    // Usamos Set para eliminar los duplicados mágicamente
    return [...new Set(allFaqs.map(f => f.label))];
  });

  // 👇 NUEVO: Filtramos las FAQs que pertenecen a la categoría seleccionada
  faqsForCategory = computed(() => {
    const category = this.selectedCategory();
    if (!category) return [];
    return this.faqs().filter(f => f.label === category);
  });

  messages = signal<ChatMessage[]>(this.loadSavedMessages());

  private loadSavedMessages(): ChatMessage[] {
    const saved = sessionStorage.getItem('hsi_chat_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // JSON convierte las fechas a texto, las volvemos a hacer formato Date
        parsed.forEach((m: any) => m.timestamp = new Date(m.timestamp));
        return parsed;
      } catch (e) {
        console.error("Error leyendo historial", e);
      }
    }

    return [
      {
        id: 'msg_1',
        sender: 'bot',
        content: '¡Hola! Soy el asistente virtual de HSI. Podés elegir una de las opciones rápidas para resolver tu duda:',
        timestamp: new Date()
      }
    ];
  }

  constructor() {
    effect(() => {
      sessionStorage.setItem('hsi_chat_messages', JSON.stringify(this.messages()));
    });

    // guardamos el estado de la ventana (para que no se cierre si recargan)
    effect(() => {
      sessionStorage.setItem('hsi_chat_open', String(this.isOpen()));
    });
  }

  ngOnInit(): void {
    // Cargar FAQs al iniciar el componente
    this.loadFaqs();
  }

  private findBestFaqMatch(input: string): Faq | undefined {
    const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Palabras comunes que ignoramos
    const stopWords = ['el', 'la', 'los', 'las', 'un', 'una', 'como', 'mi', 'de', 'para', 'que', 'en', 'a', 'y', 'o', 'por', 'con', 'tu', 'su', 'quiero', 'necesito'];

    const keywords = normalizedInput
      .split(/\W+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));

    if (keywords.length === 0) return undefined;

    let bestMatch: Faq | undefined = undefined;
    let highestScore = 0;

    for (const faq of this.faqs()) {
      const targetText = `${faq.label} ${faq.questions} ${faq.answers}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      let score = 0;
      for (const kw of keywords) {
        if (targetText.includes(kw)) {
          score++;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    }

    return highestScore > 0 ? bestMatch : undefined;
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  loadFaqs(): void {
    // Usamos la clave exacta que vimos en el navegador
    const token = localStorage.getItem('hsi_token');

    // Armamos el encabezado con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Faq[]>('/api/faqs', { headers }).subscribe({
      next: (data) => {
        this.faqs.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las FAQs:', err);
      }
    });
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

  // Llama al pop-up
  promptAction(action: 'reset' | 'close'): void {
    this.confirmAction.set(action);
  }

  cancelConfirm(): void {
    this.confirmAction.set(null);
  }

  executeConfirm(): void {
    const action = this.confirmAction();
    if (action === 'reset') {
      this.resetChat();
    } else if (action === 'close') {
      this.closeChat();
    }
    this.confirmAction.set(null);
  }

  minimizeChat(): void {
    this.isOpen.set(false);
  }

  resetChat(): void {
    this.showFAQChips.set(true);
    this.selectedCategory.set(null);
    this.messages.set([
      {
        id: 'msg_1',
        sender: 'bot',
        content: '¡Hola! Soy el asistente virtual de HSI. Podés elegir una de las opciones rápidas para resolver tu duda:',
        timestamp: new Date()
      }
    ]);
    this.isTyping.set(false);
  }

  onCategoryClick(category: string): void {
    this.selectedCategory.set(category);
  }

  onBackToCategories(): void {
    this.selectedCategory.set(null);
  }

  onFAQClick(faq: Faq): void {
    this.showFAQChips.set(false);
    this.selectedCategory.set(null); // Reseteamos la categoría internamente

    this.addMessage('user', faq.questions);
    this.isTyping.set(true);

    setTimeout(() => {
      this.isTyping.set(false);

      this.messages.set([
        ...this.messages(),
        {
          id: 'msg_' + Math.random(),
          sender: 'bot',
          content: faq.answers,
          timestamp: new Date(),
          isCTA: faq.label.toLowerCase().includes('ticket')
        }
      ]);

      // 👇 NUEVO: Volvemos a mostrar el menú de opciones para que haga otra consulta
      this.showFAQChips.set(true);
      // Forzamos el scroll hacia abajo para que el usuario vea que reaparecieron las opciones
      setTimeout(() => this.scrollToBottom(), 50);

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
    this.selectedCategory.set(null);

    this.addMessage('user', input);
    this.isTyping.set(true);

    setTimeout(() => {
      this.isTyping.set(false);

      const matchedFaq = this.findBestFaqMatch(input);

      if (matchedFaq) {
        // ¡Entendió la pregunta! Reseteamos los fallos a 0
        this.failedAttempts.set(0);

        this.addMessage('bot', matchedFaq.answers);

        if (matchedFaq.label.toLowerCase().includes('ticket') || matchedFaq.questions.toLowerCase().includes('ticket')) {
          this.messages.set([
            ...this.messages(),
            {
              id: 'msg_' + Math.random(),
              sender: 'bot',
              content: 'Hacé click abajo para ir directamente al formulario de tickets.',
              timestamp: new Date(),
              isCTA: true
            }
          ]);
        }

        this.showFAQChips.set(true);
        setTimeout(() => this.scrollToBottom(), 50);

      } else {
        // No entendió. Sumamos 1 al contador
        const currentFails = this.failedAttempts() + 1;
        this.failedAttempts.set(currentFails);

        if (currentFails >= 3) {
          // Ya falló 3 veces, le sugerimos crear un ticket oficial
          this.messages.set([
            ...this.messages(),
            {
              id: 'msg_' + Math.random(),
              sender: 'bot',
              content: 'Parece que no logro encontrar la respuesta exacta a tu consulta. Te sugiero cargar un ticket para que el equipo de soporte técnico pueda revisarlo en detalle.',
              timestamp: new Date(),
              isCTA: true
            }
          ]);

          // Ocultamos las opciones rápidas ya que lo derivamos a tickets
          this.showFAQChips.set(false);
          setTimeout(() => this.scrollToBottom(), 50);

        } else {
          // Es el intento 1 o 2, pedimos que reformule
          this.addMessage('bot', 'No logré entender tu consulta. ¿Podrías usar otras palabras o ser un poco más específico?');

          this.showFAQChips.set(true);
          setTimeout(() => this.scrollToBottom(), 50);
        }
      }
    }, 1200);
  }

  triggerEscalation(): void {
    this.failedAttempts.set(0);
    this.addMessage('user', 'Quiero hablar con un agente humano');
    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      this.simulateEscalation();
    }, 800);
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

      // Conexión con agente 
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