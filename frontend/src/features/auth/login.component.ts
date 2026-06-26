import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-container">
        <!-- Left Side: Institutional Illustration -->
        <div class="illustration-column">
          <div class="illustration-card">
            <!-- Stylized Health Network Icon -->
            <div class="health-network-icon">
              <div class="node central"></div>
              <div class="node outer outer-1"></div>
              <div class="node outer outer-2"></div>
              <div class="node outer outer-3"></div>
              <div class="connection conn-1"></div>
              <div class="connection conn-2"></div>
              <div class="connection conn-3"></div>
            </div>
            <div class="illustration-text">
              <h3>Historia de Salud Integrada</h3>
              <p>Red Asistencial de La Rioja</p>
            </div>
          </div>
        </div>

        <!-- Right Side: Login Card -->
        <div class="form-column">
          <div class="login-card">
            <!-- Logo Placeholder (120x40px) -->
            <div class="logo-placeholder">
              <span class="logo-box"></span>
              <span class="logo-text">MINSALUT</span>
            </div>

            <h1>Sistema de Soporte de HSI</h1>
            <p class="subtitle">Provincia de La Rioja — Ministerio de Salud</p>

            <!-- Mode Selector Tabs -->
            <div class="login-tabs">
              <button 
                type="button" 
                class="tab-btn" 
                [class.active]="loginMode() === 'user'" 
                (click)="setLoginMode('user')"
              >
                Usuario HSI
              </button>
              <button 
                type="button" 
                class="tab-btn" 
                [class.active]="loginMode() === 'admin'" 
                (click)="setLoginMode('admin')"
              >
                Administrador
              </button>
            </div>

            @if (loginMode() === 'user') {
              <p class="description">
                Accedé con tu usuario de Historia de Salud Integrada (Email institucional) y DNI para reportar incidentes, consultar el estado de tus tickets y acceder a recursos.
              </p>
            } @else {
              <p class="description">
                Acceso exclusivo para el personal de soporte técnico y administración del Sistema de Soporte de HSI.
              </p>
            }

            <div class="separator"></div>

            <form (submit)="onSubmit($event)">
              @if (loginMode() === 'user') {
                <!-- User Form Fields: Email & DNI -->
                <div class="form-group" [class.has-error]="errorMessage() && !hsiEmail">
                  <label for="hsiEmail">Usuario HSI (Email)</label>
                  <div class="input-container">
                    <span class="material-icons input-icon">email</span>
                    <input
                      type="email"
                      id="hsiEmail"
                      name="hsiEmail"
                      [(ngModel)]="hsiEmail"
                      placeholder="usuario@salud.larioja.gob.ar"
                      [disabled]="isLoading()"
                      required
                    />
                  </div>
                </div>

                <div class="form-group" [class.has-error]="errorMessage() && !hsiDni">
                  <label for="hsiDni">DNI</label>
                  <div class="input-container">
                    <span class="material-icons input-icon">badge</span>
                    <input
                      type="text"
                      id="hsiDni"
                      name="hsiDni"
                      [(ngModel)]="hsiDni"
                      placeholder="Ingresá tu DNI"
                      [disabled]="isLoading()"
                      pattern="[0-9]*"
                      required
                    />
                  </div>
                </div>
              } @else {
                <!-- Admin Form Fields: Username & Password -->
                <div class="form-group" [class.has-error]="errorMessage() && !adminUsername">
                  <label for="adminUsername">Usuario Admin</label>
                  <div class="input-container">
                    <span class="material-icons input-icon">person</span>
                    <input
                      type="text"
                      id="adminUsername"
                      name="adminUsername"
                      [(ngModel)]="adminUsername"
                      placeholder="Ingresá tu usuario admin"
                      [disabled]="isLoading()"
                      required
                    />
                  </div>
                </div>

                <div class="form-group" [class.has-error]="errorMessage() && !adminPassword">
                  <label for="adminPassword">Contraseña</label>
                  <div class="input-container">
                    <span class="material-icons input-icon">lock</span>
                    <input
                      type="password"
                      id="adminPassword"
                      name="adminPassword"
                      [(ngModel)]="adminPassword"
                      placeholder="Ingresá tu contraseña"
                      [disabled]="isLoading()"
                      required
                    />
                  </div>
                </div>
              }

              @if (errorMessage()) {
                <span class="error-msg">
                  {{ errorMessage() }}
                </span>
              }

              <button type="submit" class="submit-btn" [disabled]="isLoading()">
                @if (isLoading()) {
                  <span class="loader"></span>
                } @else {
                  Ingresar al sistema
                }
              </button>
            </form>

            <div class="card-footer">
              ¿Problemas para acceder? Contactá a tu administrador HSI.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-bg-secondary);
      background-image: radial-gradient(var(--color-border) 1.5px, transparent 1.5px);
      background-size: 20px 20px;
      padding: 24px;
    }

    .login-container {
      width: 100%;
      max-width: 1280px;
      height: 800px;
      display: flex;
      background: transparent;
      border-radius: var(--radius-card);
      overflow: hidden;
    }

    .illustration-column {
      flex: 0 0 45%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 20px;
    }

    .illustration-card {
      width: 100%;
      height: 100%;
      background: var(--color-bg-primary);
      border-radius: 20px;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      border: 1px solid var(--color-border);
    }

    .health-network-icon {
      position: relative;
      width: 160px;
      height: 160px;
      margin-bottom: 24px;
    }

    .node {
      position: absolute;
      border-radius: 50%;
    }

    .node.central {
      width: 44px;
      height: 44px;
      background-color: var(--color-accent-teal);
      top: 58px;
      left: 58px;
      z-index: 3;
    }

    .node.outer {
      width: 28px;
      height: 28px;
      background-color: var(--color-accent-mint);
      z-index: 3;
      border: 2px solid var(--color-accent-teal);
    }

    .outer-1 { top: 10px; left: 66px; }
    .outer-2 { bottom: 20px; left: 15px; }
    .outer-3 { bottom: 20px; right: 15px; }

    .connection {
      position: absolute;
      background-color: var(--color-accent-mint);
      height: 4px;
      z-index: 1;
      transform-origin: left center;
    }

    .conn-1 {
      width: 50px;
      top: 35px;
      left: 80px;
      transform: rotate(90deg);
    }

    .conn-2 {
      width: 60px;
      top: 80px;
      left: 80px;
      transform: rotate(135deg);
    }

    .conn-3 {
      width: 60px;
      top: 80px;
      left: 80px;
      transform: rotate(45deg);
    }

    .illustration-text {
      text-align: center;
    }

    .illustration-text h3 {
      color: var(--color-text-primary);
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .illustration-text p {
      color: var(--color-text-muted);
      font-size: 14px;
    }

    .form-column {
      flex: 0 0 55%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-card {
      width: 100%;
      height: 100%;
      background: var(--color-bg-primary);
      border-radius: 20px;
      box-shadow: var(--shadow-card);
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px solid var(--color-border);
    }

    .logo-placeholder {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
    }

    .logo-box {
      width: 24px;
      height: 24px;
      background: var(--color-accent-teal);
      border-radius: 6px;
    }

    .logo-text {
      font-family: var(--font-heading);
      font-weight: 700;
      color: var(--color-text-primary);
      letter-spacing: 1.5px;
      font-size: 14px;
    }

    .login-card h1 {
      font-size: 28px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    .subtitle {
      font-size: 14px;
      color: var(--color-text-muted);
      margin-bottom: 20px;
    }

    /* Tabs styling */
    .login-tabs {
      display: flex;
      background-color: var(--color-bg-secondary);
      border-radius: var(--radius-input);
      padding: 4px;
      margin-bottom: 16px;
      border: 1px solid var(--color-border);
      width: 100%;
      max-width: 400px;
    }

    .tab-btn {
      flex: 1;
      border: none;
      background: transparent;
      padding: 8px;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text-muted);
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .tab-btn.active {
      background-color: var(--color-bg-primary);
      color: var(--color-text-primary);
      box-shadow: var(--shadow-card);
    }

    .description {
      font-size: 12px;
      line-height: 1.6;
      color: var(--color-text-muted);
      max-width: 360px;
      margin-bottom: 8px;
    }

    .separator {
      height: 1px;
      background-color: var(--color-border);
      margin: 16px 0 24px 0;
    }

    form {
      width: 100%;
      max-width: 400px;
    }

    .form-group {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      color: var(--color-accent-teal);
      font-size: 20px;
    }

    .input-container input {
      width: 100%;
      height: 44px;
      padding: 0 12px 0 40px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-input);
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--color-text-primary);
      background-color: var(--color-bg-primary);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      outline: none;
    }

    .input-container input:focus {
      border-color: var(--color-accent-teal);
      box-shadow: 0 0 0 3px rgba(119, 194, 216, 0.15);
    }

    .form-group.has-error .input-container input {
      border-color: var(--color-error);
    }

    .form-group.has-error .input-container input:focus {
      box-shadow: 0 0 0 3px rgba(224, 88, 88, 0.15);
    }

    .error-msg {
      display: block;
      font-size: 12px;
      color: var(--color-error);
      margin-bottom: 16px;
    }

    .submit-btn {
      width: 100%;
      height: 48px;
      background-color: var(--color-accent-teal);
      color: var(--color-bg-primary);
      border: none;
      border-radius: var(--radius-button);
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, transform 0.1s ease;
      margin-top: 24px;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: var(--color-accent-teal-hover);
    }

    .submit-btn:active:not(:disabled) {
      transform: scale(0.98);
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .card-footer {
      font-size: 11px;
      color: var(--color-text-muted);
      margin-top: 24px;
    }

    .loader {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #FFF;
      animation: spin 0.8s infinite linear;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .login-container {
        height: auto;
        flex-direction: column;
      }
      
      .illustration-column {
        display: none;
      }

      .form-column {
        flex: 1;
        width: 100%;
      }

      .login-card {
        padding: 32px 24px;
        min-height: 500px;
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginMode = signal<'user' | 'admin'>('user');
  
  // HSI User fields
  hsiEmail = '';
  hsiDni = '';
  
  // Admin credentials
  adminUsername = '';
  adminPassword = '';

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  setLoginMode(mode: 'user' | 'admin'): void {
    this.loginMode.set(mode);
    this.errorMessage.set(null);
    this.hsiEmail = '';
    this.hsiDni = '';
    this.adminUsername = '';
    this.adminPassword = '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading.set(true);
    this.errorMessage.set(null);

    if (this.loginMode() === 'user') {
      if (!this.hsiEmail.trim() || !this.hsiDni.trim()) {
        this.isLoading.set(false);
        this.errorMessage.set('Usuario (Email) y DNI son obligatorios.');
        return;
      }
      this.authService.loginHSI(this.hsiEmail, this.hsiDni).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message);
        }
      });
    } else {
      if (!this.adminUsername.trim() || !this.adminPassword.trim()) {
        this.isLoading.set(false);
        this.errorMessage.set('Usuario y contraseña son obligatorios.');
        return;
      }
      this.authService.loginAgent(this.adminUsername, this.adminPassword).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message);
        }
      });
    }
  }
}
