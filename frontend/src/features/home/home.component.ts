import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { TicketService } from '../../core/services/ticket.service';
import { AboutComponent } from './components/about/about.component';
import { TicketsTabComponent } from './components/tickets-tab/tickets-tab.component';
import { TrainingComponent } from './components/training/training.component';
import { ChatbotWidgetComponent } from '../chatbot/chatbot-widget.component';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router'; // 👈 IMPORTANTE

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AboutComponent,
    TicketsTabComponent,
    TrainingComponent,
    ChatbotWidgetComponent,
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
          <div 
            class="sidebar-item" 
            [class.active]="currentUserRole() !== 'user' || hasTickets()"
            [class.inactive]="currentUserRole() === 'user' && !hasTickets()"
            (click)="onHistoryIconClick()"
            [title]="currentUserRole() !== 'user' ? 'Ver tickets de soporte (' + activeCount() + ' activos)' : (hasTickets() ? 'Ver mis tickets (' + activeCount() + ' activos)' : 'Aún no tenés tickets enviados')"
          >
            <span class="material-icons">chat</span>
            @if (activeCount() > 0) {
              <span class="notification-badge">{{ activeCount() }}</span>
            }
          </div>
        </div>

        <div class="sidebar-bottom">
          <div class="sidebar-item profile-btn" (click)="onLogout()" title="Cerrar sesión">
            <span class="material-icons">account_circle</span>
            <span class="tooltip">Salir</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <nav class="nav-top">
          <div class="pill-nav-container">
            
            <a 
              class="pill-btn" 
              routerLink="about" 
              routerLinkActive="active"
            >
              Acerca del sistema
            </a>
            
            <a 
              class="pill-btn" 
              routerLink="tickets" 
              routerLinkActive="active"
            >
              Tickets
            </a>
            
            <a 
              class="pill-btn" 
              routerLink="training" 
              routerLinkActive="active"
            >
              Capacitación
            </a>

          </div>
        </nav>

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
  `,
  styles: [`
    .home-layout {
      display: flex;
      min-height: 100vh;
      width: 100%;
      overflow: hidden;
    }

    /* Sidebar Navigation Styles */
    .sidebar {
      width: 64px;
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
      transition: all 0.2s ease;
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
  `]
})
export class HomeComponent {
  private authService = inject(AuthService);
  private ticketService = inject(TicketService);
  private router = inject(Router);

  currentUserRole = computed(() => this.authService.currentUser()?.role || '');
  hasTickets = computed(() => this.ticketService.hasTickets());
  activeCount = computed(() => this.ticketService.activeCount());

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.ticketService.loadTicketsForUser(user.username);
      }
    });
  }

  onHistoryIconClick(): void {
    if (this.currentUserRole() !== 'user' || this.hasTickets()) {
      this.router.navigate(['/home/tickets']);
    }
  }

  onChatbotCTAClick(): void {
    this.router.navigate(['/home/tickets']);
  }

  onLogout(): void {
    this.ticketService.clearTickets();
    this.authService.logout().subscribe();
  }
}