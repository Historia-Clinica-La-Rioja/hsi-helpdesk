import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { TicketService } from '../../core/services/ticket.service';
import { AboutComponent } from './components/about/about.component';
import { TicketsTabComponent } from './components/tickets-tab/tickets-tab.component';
import { TrainingComponent } from './components/training/training.component';
import { ChatbotWidgetComponent } from '../chatbot/chatbot-widget.component';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router'; // 👈 IMPORTANTE
import { HsiRobotLogoComponent } from '../../shared/components/hsi-robot-logo/hsi-robot-logo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AboutComponent,
    TicketsTabComponent,
    TrainingComponent,
    ChatbotWidgetComponent,
    HsiRobotLogoComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="home-layout">
      <aside class="sidebar">
        <div class="sidebar-top">
          <span class="material-icons ticket-logo" title="HSI Soporte">confirmation_number</span>
        </div>

        <div class="sidebar-middle">
          @if (currentUserRole() === 'user') {
            <!-- Mis Tickets (User) -->
            <div 
              class="sidebar-item" 
              [class.active]="isRouteActive('list')"
              [class.inactive]="!hasTickets()"
              (click)="onHistoryIconClick()"
              [title]="hasTickets() ? 'Ver mis tickets (' + activeCount() + ' activos)' : 'Aún no tenés tickets enviados'"
            >
              <span class="material-icons">chat</span>
              @if (activeCount() > 0) {
                <span class="notification-badge">{{ activeCount() }}</span>
              }
            </div>

            <!-- Crear nuevo ticket (User only) -->
            <div 
              class="sidebar-item" 
              [class.active]="isRouteActive('create')"
              (click)="onCreateTicketClick()"
              title="Crear un nuevo ticket"
            >
              <span class="material-icons">add_box</span>
            </div>

            <!-- Tickets archivados (User) -->
            <div 
              class="sidebar-item" 
              [class.active]="isRouteActive('archived')"
              (click)="onArchivedTicketsClick()"
              title="Tickets archivados"
            >
              <span class="material-icons">archive</span>
            </div>

            <!-- Capacitación (User) -->
            <div 
              class="sidebar-item" 
              [class.active]="isTrainingActive()"
              (click)="onTrainingClick()"
              title="Capacitación"
            >
              <span class="material-icons">school</span>
            </div>
          } @else {
            <!-- Tickets List (Agent) -->
            <div 
              class="sidebar-item" 
              [class.active]="isRouteActive('list')"
              (click)="onHistoryIconClick()"
              [title]="'Ver tickets de soporte (' + activeCount() + ' activos)'"
            >
              <span class="material-icons">local_activity</span>
              @if (activeCount() > 0) {
                <span class="notification-badge">{{ activeCount() }}</span>
              }
            </div>

            <!-- Tickets archivados (Agent) -->
            <div 
              class="sidebar-item" 
              [class.active]="isRouteActive('archived')"
              (click)="onArchivedTicketsClick()"
              title="Tickets archivados"
            >
              <span class="material-icons">archive</span>
            </div>

            <!-- Base de Conocimiento (Agent) -->
            <div 
              class="sidebar-item" 
              [class.active]="isKnowledgeBaseActive()"
              (click)="onKnowledgeBaseClick()"
              title="Base de Conocimiento"
            >
              <span class="material-icons">menu_book</span>
            </div>
          }
        </div>

        <div class="sidebar-bottom">
          <div class="sidebar-item profile-btn" (click)="onLogout()" title="Cerrar sesión">
            <span class="material-icons">logout</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <div style="height: 24px; flex-shrink: 0;"></div>

        <div class="content-area">
          <div class="content-card">
            
            <router-outlet></router-outlet>
            
          </div>
        </div>

        @if (currentUserRole() === 'user') {
          <app-chatbot-widget (navigateToTickets)="onChatbotCTAClick()"></app-chatbot-widget>
        }
      </main>
    </div>

    <!-- Logout confirmation popup -->
    @if (showLogoutConfirm()) {
      <div class="logout-overlay">
        <div class="logout-dialog">
          <span class="material-icons logout-icon">logout</span>
          <h4>Cerrar sesión</h4>
          
          @if (hasActiveChat()) {
            <p class="logout-text">
              Tenés una conversación activa con el Asistente Virtual. Si cerrás sesión, perderás el progreso de tu consulta y el historial del chat.
            </p>
          } @else {
            <p class="logout-text">
              ¿Estás seguro de que deseas cerrar sesión en el sistema?
            </p>
          }
          
          <div class="logout-actions">
            <button class="cancel-btn" (click)="cancelLogout()">Cancelar</button>
            <button class="accept-btn" (click)="confirmLogout()">Cerrar sesión</button>
          </div>
        </div>
      </div>
    }

    <!-- About system modal (only shown once to new users) -->
    @if (showAboutModal()) {
      <div class="about-modal-overlay">
        <div class="about-modal-dialog">
          <div class="about-modal-header">
            <span class="material-icons info-logo-icon">info</span>
            <h3>¿Qué es el Sistema de Soporte de HSI?</h3>
          </div>
          
          <div class="about-modal-body">
            <p class="intro-text">
              El Sistema de Soporte de HSI es la plataforma oficial para la gestión de consultas, reclamos e incidentes relacionados con la Historia de Salud Integrada en la Provincia de La Rioja. Permite reportar errores, solicitar asistencia técnica y hacer un seguimiento del estado de tus solicitudes de forma trazable y eficiente.
            </p>

            <div class="about-separator"></div>

            <div class="chatbot-highlight-box">
              <div class="box-header">
                <h4>Asistente Virtual 24/7</h4>
                <div class="mini-bot-icon" style="background: none; width: auto; height: auto;">
                  <hsi-robot-logo size="32px" [followMouse]="false"></hsi-robot-logo>
                </div>
              </div>
              <p class="box-description">
                El chatbot está disponible las 24 horas para responder preguntas frecuentes, orientarte en el sistema y guiarte en la carga de tickets. Si tu consulta lo requiere, el asistente escalará automáticamente el caso a un agente de soporte.
              </p>
              
              <ul class="capabilities-list">
                <li>
                  <span class="material-icons check-icon">check</span>
                  <span>Respuestas a preguntas frecuentes</span>
                </li>
                <li>
                  <span class="material-icons check-icon">check</span>
                  <span>Guía de carga de tickets</span>
                </li>
                <li>
                  <span class="material-icons check-icon">check</span>
                  <span>Escalamiento a agente humano</span>
                </li>
                <li>
                  <span class="material-icons check-icon">check</span>
                  <span>Disponible sin necesidad de login</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="about-modal-actions">
            <button class="accept-btn" (click)="closeAboutModal()">Comenzar</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .home-layout {
      display: flex;
      height: 100vh;
      width: 100%;
      overflow: hidden;
    }

    /* Sidebar Navigation Styles */
    .sidebar {
      width: 64px;
      height: 100vh;
      box-sizing: border-box;
      background-color: #333143;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      flex-shrink: 0;
      z-index: 10;
    }

    .sidebar-top {
      margin-top: 8px;
    }

    .ticket-logo {
      color: white;
      font-size: 28px;
    }

    .sidebar-middle {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }

    .sidebar-item {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-input);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      color: var(--color-text-muted);
      transition: all 0.2s ease;
    }

    .sidebar-item:hover:not(.inactive):not(.active) {
      color: white;
      background-color: rgba(255,255,255,0.08);
    }

    .sidebar-item .material-icons {
      font-size: 24px;
    }

    /* Active history state */
    .sidebar-item.active {
      color: var(--color-accent-mint);
    }
    
    .sidebar-item.active:hover {
      background-color: rgba(119, 194, 216, 0.15);
    }

    /* Inactive history state */
    .sidebar-item.inactive {
      color: var(--color-text-muted);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .notification-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background-color: var(--bot-yellow);
      color: var(--color-text-primary);
      font-family: var(--font-heading);
      font-size: 10px;
      font-weight: 700;
      min-width: 16px;
      height: 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid #333143;
      padding: 0 4px;
    }

    /* Bottom Profile / Logout */
    .profile-btn {
      color: var(--color-text-muted);
    }

    .profile-btn:hover {
      color: white;
      background-color: rgba(255,255,255,0.08);
    }

    .profile-btn .tooltip {
      visibility: hidden;
      position: absolute;
      left: 74px;
      background-color: #333143;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 11px;
      white-space: nowrap;
      border: 1px solid var(--color-border);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .profile-btn:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }

    /* Main Area Layout */
    .main-content {
      flex: 1;
      background-color: var(--color-bg-secondary);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    /* Top Nav Bar Pill Buttons */
    .nav-top {
      display: flex;
      justify-content: center;
      padding-top: 32px;
      padding-bottom: 8px;
      flex-shrink: 0;
    }

    .pill-nav-container {
      display: flex;
      gap: 24px;
    }

    .pill-btn {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 500;
      border-radius: 24px;
      padding: 12px 28px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      text-decoration: none;
    }

    /* Inactive tab button */
    .pill-btn:not(.active) {
      background-color: var(--color-bg-primary);
      border: 1.5px solid var(--color-border);
      color: var(--color-text-primary);
    }

    .pill-btn:not(.active):hover {
      border-color: var(--color-accent-teal);
      background-color: var(--color-bg-secondary);
    }

    /* Active selected tab button */
    .pill-btn.active {
      background-color: var(--color-accent-teal);
      color: white;
      border: none;
      box-shadow: var(--shadow-pill-active);
    }

    /* Content Card Container Styles */
    .content-area {
      flex: 1;
      padding: 0 24px 24px 24px;
      display: flex;
    }

    .content-card {
      width: 100%;
      background-color: var(--color-bg-primary);
      border-radius: 16px;
      box-shadow: var(--shadow-card);
      border: 1px solid var(--color-border);
      overflow: hidden;
      min-height: 520px;
    }

    /* Tab Switch Transition Animation */
    .tab-content-fade {
      display: block;
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Lazy placeholder for Defer */
    .lazy-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px;
      color: var(--color-text-muted);
      gap: 16px;
    }

    .loading-spin {
      font-size: 32px;
      animation: spin 1.2s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .lazy-placeholder p {
      font-family: var(--font-body);
      font-size: 14px;
    }

    /* Logout Modal Styles */
    .logout-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(51, 49, 67, 0.4);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: logoutFadeIn 0.2s ease-out;
    }

    @keyframes logoutFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .logout-dialog {
      background-color: var(--color-bg-primary);
      padding: 32px;
      border-radius: 16px;
      width: 400px;
      max-width: 90%;
      text-align: center;
      box-shadow: var(--shadow-bot-chat);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      animation: logoutScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes logoutScaleIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .logout-icon {
      font-size: 48px;
      color: var(--bot-orange);
      background-color: rgba(243, 153, 64, 0.1);
      padding: 12px;
      border-radius: 50%;
    }

    .logout-dialog h4 {
      margin: 0;
      font-size: 20px;
      font-family: var(--font-heading);
      color: var(--color-text-primary);
      font-weight: 600;
    }

    .logout-text {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-muted);
      font-family: var(--font-body);
    }

    .logout-actions {
      display: flex;
      gap: 12px;
      width: 100%;
      margin-top: 8px;
      justify-content: center;
    }

    .logout-actions button {
      flex: 1;
      padding: 12px 24px;
      border-radius: 24px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      font-family: var(--font-heading);
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .logout-actions .cancel-btn {
      background-color: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
    }

    .logout-actions .cancel-btn:hover {
      background-color: var(--color-border);
      border-color: #d1e2e6;
    }

    .logout-actions .accept-btn {
      background-color: var(--bot-orange);
      color: white;
      box-shadow: 0 4px 12px rgba(243, 153, 64, 0.3);
    }

    .logout-actions .accept-btn:hover {
      background-color: #e28e3b;
      box-shadow: 0 6px 16px rgba(243, 153, 64, 0.4);
      transform: translateY(-1px);
    }

    .logout-actions .accept-btn:active {
      transform: translateY(0);
    }

    /* About Modal Styles */
    .about-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(51, 49, 67, 0.45);
      backdrop-filter: blur(6px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: aboutFadeIn 0.25s ease-out;
    }

    @keyframes aboutFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .about-modal-dialog {
      background-color: var(--color-bg-primary);
      padding: 36px;
      border-radius: 20px;
      width: 550px;
      max-width: 90%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: 20px;
      animation: aboutScaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes aboutScaleIn {
      from {
        opacity: 0;
        transform: scale(0.92) translateY(15px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .about-modal-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .info-logo-icon {
      font-size: 32px;
      color: var(--color-accent-teal);
    }

    .about-modal-header h3 {
      margin: 0;
      font-size: 22px;
      font-family: var(--font-heading);
      color: var(--color-text-primary);
      font-weight: 700;
    }

    .about-modal-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .about-modal-body .intro-text {
      margin: 0;
      font-family: var(--font-body);
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--color-text-primary);
    }

    .about-separator {
      height: 1px;
      background-color: var(--color-border);
      margin: 8px 0;
    }

    .about-modal-body .chatbot-highlight-box {
      background-color: var(--color-bg-secondary);
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid var(--bot-blue);
      position: relative;
    }

    .about-modal-body .box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .about-modal-body .box-header h4 {
      margin: 0;
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .about-modal-body .mini-bot-icon {
      width: 28px;
      height: 28px;
      border-radius: var(--radius-bot);
      background: var(--bot-fab-gradient);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .about-modal-body .bot-face {
      width: 12px;
      height: 8px;
      border: 1.5px solid white;
      border-radius: 2px;
      position: relative;
    }
    .about-modal-body .bot-face::before, .about-modal-body .bot-face::after {
      content: '';
      position: absolute;
      width: 2.5px;
      height: 2.5px;
      background-color: var(--bot-yellow);
      border-radius: 50%;
      top: 1.5px;
    }
    .about-modal-body .bot-face::before { left: 1.5px; }
    .about-modal-body .bot-face::after { right: 1.5px; }

    .about-modal-body .box-description {
      margin: 0 0 14px 0;
      font-family: var(--font-body);
      font-size: 13px;
      line-height: 1.5;
      color: var(--color-text-muted);
    }

    .about-modal-body .capabilities-list {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 0;
      margin: 0;
    }

    .about-modal-body .capabilities-list li {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 12.5px;
      color: var(--color-text-primary);
    }

    .about-modal-body .check-icon {
      color: var(--color-accent-teal);
      font-size: 16px;
      font-weight: bold;
    }

    .about-modal-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }

    .about-modal-actions .accept-btn {
      padding: 12px 32px;
      border-radius: 24px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      font-family: var(--font-heading);
      font-size: 14.5px;
      background-color: var(--color-accent-teal);
      color: white;
      box-shadow: 0 4px 12px rgba(119, 194, 216, 0.3);
      transition: all 0.2s ease;
    }

    .about-modal-actions .accept-btn:hover {
      background-color: var(--color-accent-teal-hover);
      box-shadow: 0 6px 16px rgba(119, 194, 216, 0.4);
      transform: translateY(-1px);
    }

    .about-modal-actions .accept-btn:active {
      transform: translateY(0);
    }
  `]
})
export class HomeComponent {
  private authService = inject(AuthService);
  private ticketService = inject(TicketService);
  public router = inject(Router);

  currentUserRole = computed(() => this.authService.currentUser()?.role || '');
  hasTickets = computed(() => this.ticketService.hasTickets());
  activeCount = computed(() => this.ticketService.activeCount());
  showLogoutConfirm = signal(false);
  showAboutModal = signal(false);

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.ticketService.loadTicketsForUser(user.username);
        this.checkAgentRedirect();

        // Check if about popup has been shown for this user
        if (typeof localStorage !== 'undefined') {
          const aboutShownKey = `hsi_about_shown_${user.id}`;
          const hasShown = localStorage.getItem(aboutShownKey);
          if (!hasShown && user.role?.toLowerCase() === 'user') {
            this.showAboutModal.set(true);
          }
        }
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAgentRedirect();
      }
    });
  }

  checkAgentRedirect(): void {
    const user = this.authService.currentUser();
    if (user && (user.role === 'agent' || user.role === 'AGENT')) {
      const currentUrl = this.router.url;
      if (currentUrl === '/home' || currentUrl === '/home/about' || currentUrl === '/home/' || currentUrl.split('?')[0] === '/home/about') {
        this.router.navigate(['/home/tickets']);
      }
    }
  }

  onHistoryIconClick(): void {
    if (this.currentUserRole() !== 'user' || this.hasTickets()) {
      this.router.navigate(['/home/tickets'], { queryParams: { view: 'list' } });
    }
  }

  onCreateTicketClick(): void {
    this.router.navigate(['/home/tickets'], { queryParams: { view: 'create' } });
  }

  onArchivedTicketsClick(): void {
    this.router.navigate(['/home/tickets'], { queryParams: { view: 'archived' } });
  }

  onTrainingClick(): void {
    this.router.navigate(['/home/training']);
  }

  isTrainingActive(): boolean {
    return this.router.url.includes('/home/training');
  }

  onKnowledgeBaseClick(): void {
    this.router.navigate(['/home/knowledge-base']);
  }

  isKnowledgeBaseActive(): boolean {
    return this.router.url.includes('/home/knowledge-base');
  }

  isRouteActive(viewParam: 'list' | 'create' | 'archived'): boolean {
    if (!this.router.url.includes('/home/tickets')) return false;

    const urlTree = this.router.parseUrl(this.router.url);
    const view = urlTree.queryParams['view'];

    if (viewParam === 'list') {
      return (!view || view === 'list');
    }
    return view === viewParam;
  }

  onChatbotCTAClick(): void {
    this.router.navigate(['/home/tickets'], { queryParams: { view: 'list' } });
  }

  closeAboutModal(): void {
    const user = this.authService.currentUser();
    if (user && typeof localStorage !== 'undefined') {
      localStorage.setItem(`hsi_about_shown_${user.id}`, 'true');
    }
    this.showAboutModal.set(false);
  }

  onLogout(): void {
    this.showLogoutConfirm.set(true);
  }

  cancelLogout(): void {
    this.showLogoutConfirm.set(false);
  }

  confirmLogout(): void {
    this.showLogoutConfirm.set(false);
    this.ticketService.clearTickets();
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('hsi_chat_messages');
      sessionStorage.removeItem('hsi_chat_open');
    }
    this.authService.logout().subscribe();
  }

  hasActiveChat(): boolean {
    if (typeof sessionStorage === 'undefined') return false;
    const saved = sessionStorage.getItem('hsi_chat_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 1;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}