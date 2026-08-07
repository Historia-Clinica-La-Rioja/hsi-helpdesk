import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HsiRobotLogoComponent } from '../../shared/components/hsi-robot-logo/hsi-robot-logo.component';
import { HsiHalftoneComponent } from '../../shared/components/hsi-halftone/hsi-halftone.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HsiRobotLogoComponent, HsiHalftoneComponent],
  template: `
    <div class="hsi-page">
      <!-- Fondo: halftone animado (oleaje de puntos) + 2 manchas que derivan lento -->
      <hsi-halftone class="hsi-halftone"></hsi-halftone>
      <div class="hsi-blob hsi-blob--a" aria-hidden="true"></div>
      <div class="hsi-blob hsi-blob--b" aria-hidden="true"></div>

      <!-- Header: logos institucionales + acceso rápido -->
      <header class="hsi-header">
        <div class="hsi-logos">
          <img class="hsi-logo hsi-logo--escudo" src="assets/logos/provincia.svg"
            alt="Escudo de la Provincia de La Rioja" />
          <span class="hsi-logo-sep" aria-hidden="true"></span>
          <img class="hsi-logo hsi-logo--min" src="assets/logos/ministerio.svg"
            alt="Ministerio de Salud" />
        </div>
      </header>

      <!-- Contenido: todo centrado en una columna -->
      <main class="hsi-main">
        <hsi-robot-logo size="clamp(160px, 25vh, 250px)"></hsi-robot-logo>

        <h1 class="hsi-title">Sistema de Soporte</h1>


        <section class="hsi-card">
          <div class="hsi-tabs" role="tablist" aria-label="Tipo de acceso">
            <button
              type="button" role="tab" class="hsi-tab"
              [class.is-active]="loginMode() === 'user'"
              [attr.aria-selected]="loginMode() === 'user'"
              (click)="setLoginMode('user')"
            >Usuario HSI</button>
            <button
              type="button" role="tab" class="hsi-tab"
              [class.is-active]="loginMode() === 'admin'"
              [attr.aria-selected]="loginMode() === 'admin'"
              (click)="setLoginMode('admin')"
            >Administrador</button>
          </div>

          <p class="hsi-help-text">
            @if (loginMode() === 'user') {
              Accedé con tu usuario de Historia de Salud Integrada (email institucional) y DNI
              para reportar incidentes, consultar el estado de tus tickets y acceder a recursos.
            } @else {
              Accedé con tus credenciales de administrador para gestionar tickets, usuarios y
              recursos del sistema de soporte.
            }
          </p>

          <form (submit)="onSubmit($event)">
            @if (loginMode() === 'user') {
              <!-- User Form Fields: Email & DNI -->
              <label class="hsi-label" for="hsi-email">Usuario HSI (Email)</label>
              <div class="hsi-field" [class.has-error]="errorMessage() && !hsiEmail">
                <span class="material-icons hsi-i" aria-hidden="true">email</span>
                <input
                  id="hsi-email"
                  type="email"
                  name="hsiEmail"
                  [(ngModel)]="hsiEmail"
                  placeholder="usuario@salud.larioja.gob.ar"
                  [disabled]="isLoading()"
                  required
                />
              </div>

              <label class="hsi-label" for="hsi-dni">DNI</label>
              <div class="hsi-field" [class.has-error]="errorMessage() && !hsiDni">
                <span class="material-icons hsi-i" aria-hidden="true">badge</span>
                <input
                  id="hsi-dni"
                  type="text"
                  inputmode="numeric"
                  name="hsiDni"
                  [(ngModel)]="hsiDni"
                  placeholder="Ingresá tu DNI"
                  [disabled]="isLoading()"
                  pattern="[0-9]*"
                  required
                />
              </div>
            } @else {
              <!-- Admin Form Fields: Username & Password -->
              <label class="hsi-label" for="admin-username">Usuario Admin</label>
              <div class="hsi-field" [class.has-error]="errorMessage() && !adminUsername">
                <span class="material-icons hsi-i" aria-hidden="true">person</span>
                <input
                  id="admin-username"
                  type="text"
                  name="adminUsername"
                  [(ngModel)]="adminUsername"
                  placeholder="Ingresá tu usuario admin"
                  [disabled]="isLoading()"
                  required
                />
              </div>

              <label class="hsi-label" for="admin-password">Contraseña</label>
              <div class="hsi-field" [class.has-error]="errorMessage() && !adminPassword">
                <span class="material-icons hsi-i" aria-hidden="true">lock</span>
                <input
                  id="admin-password"
                  type="password"
                  name="adminPassword"
                  [(ngModel)]="adminPassword"
                  placeholder="Ingresá tu contraseña"
                  [disabled]="isLoading()"
                  required
                />
              </div>
            }

            @if (errorMessage()) {
              <span class="hsi-error-msg">
                {{ errorMessage() }}
              </span>
            }

            <button type="submit" class="hsi-submit" [disabled]="isLoading()">
              @if (isLoading()) {
                <span class="hsi-loader"></span>
              } @else {
                Ingresar al sistema
              }
            </button>
          </form>

          <p class="hsi-footer-link">
            ¿Problemas para acceder?
            <a href="https://wa.me/+543804625960/?text=Hola,+solicito+asistencia+ya+que+tengo+un+problema+para+acceder+a+mi+cuenta+en+el+sistema+de+soporte+de+HSI:+" target="_blank" rel="noopener noreferrer">Contactá a tu administrador HSI</a>
          </p>
        </section>
      </main>
    </div>
  `,
  styles: [`
    :host {
      /* ---- Identidad de color HSI ---- */
      --hsi-bg: #f5fafb;
      --hsi-primary: #4aa9c1;
      --hsi-primary-2: #67c1d3;
      --hsi-primary-dark: #2f8fb0;
      --hsi-ink: #26374e;
      --hsi-ink-soft: #5f7d8a;
      --hsi-line: #dbe7ec;
      --hsi-card: #ffffff;
      --hsi-muted: #7b95a0;

      display: block;
    }

    .hsi-page {
      position: relative;
      height: 100vh;
      overflow: hidden;
      background: var(--hsi-bg);
      color: var(--hsi-ink);
      font-family: system-ui, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
    }

    /* ---------- Fondo ---------- */
    .hsi-halftone {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hsi-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(12px);
      pointer-events: none;
      will-change: transform;
      z-index: 1;
    }

    .hsi-blob--a {
      top: -140px;
      left: -110px;
      width: 440px;
      height: 440px;
      background: radial-gradient(circle at 35% 35%, #8fe0e6, #4bb8ca 60%, transparent 72%);
      opacity: 0.22;
      animation: hsi-drift-a 22s ease-in-out infinite;
    }

    .hsi-blob--b {
      bottom: -180px;
      right: -130px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle at 40% 40%, #a9c8ff, #5b8bff 55%, transparent 72%);
      opacity: 0.16;
      animation: hsi-drift-b 26s ease-in-out infinite;
    }

    @keyframes hsi-drift-a {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(40px, 30px); }
    }
    @keyframes hsi-drift-b {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-38px, -28px); }
    }

    /* ---------- Header ---------- */
    .hsi-header {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: clamp(10px, 2.5vh, 20px) clamp(20px, 4vw, 48px);
    }

    .hsi-logos {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .hsi-logo {
      display: block;
      width: auto;
    }
    .hsi-logo--escudo { height: 56px; }   /* escudo cuadrado */
    .hsi-logo--min { height: 34px; }      /* wordmark ministerio */

    .hsi-logo-sep {
      width: 1px;
      height: 38px;
      background: #c9dbe1;
    }

    .hsi-header-tag {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--hsi-primary);
      font-size: 13px;
      font-weight: 500;
    }

    /* ---------- Main (todo centrado) ---------- */
    .hsi-main {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: clamp(4px, 1.5vh, 12px);
      padding: 0 clamp(20px, 5vw, 64px) clamp(20px, 4vh, 48px);
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .hsi-title {
      margin: 6px 0 4px;
      font-size: clamp(22px, 3vw, 28px);
      font-weight: 400;
      color: #688193;
      line-height: 1.0;
    }

    .hsi-subtitle {
      margin: 0 0 10px;
      max-width: 380px;
      color: var(--hsi-ink-soft);
      font-size: 14px;
      line-height: 1.6;
    }

    /* Tarjeta */
    .hsi-card {
      width: 100%;
      max-width: 500px;
      text-align: left;
      background: var(--hsi-card);
      border-radius: 20px;
      box-shadow: 0 18px 50px -22px rgba(47, 111, 196, 0.28);
      padding: clamp(16px, 3vh, 24px) clamp(20px, 3vw, 30px);
    }

    .hsi-tabs {
      display: flex;
      gap: 4px;
      background: #eef5f7;
      border-radius: 12px;
      padding: 4px;
      margin-bottom: clamp(10px, 2vh, 16px);
    }

    .hsi-tab {
      flex: 1;
      border: none;
      background: transparent;
      border-radius: 9px;
      padding: 9px;
      font-size: 13px;
      font-weight: 500;
      color: var(--hsi-muted);
      cursor: pointer;
      transition: color 0.15s ease, background 0.15s ease;

      &.is-active {
        background: #ffffff;
        color: var(--hsi-ink);
        box-shadow: 0 2px 8px -4px rgba(0, 0, 0, 0.2);
      }
    }

    .hsi-help-text {
      margin: 0 0 16px;
      color: #6a8794;
      font-size: 12.5px;
      line-height: 1.6;
    }

    .hsi-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: #3f5566;
      margin-bottom: 6px;
    }

    .hsi-field {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--hsi-line);
      border-radius: 11px;
      padding: 10px 13px;
      margin-bottom: clamp(8px, 1.5vh, 12px);
      transition: border-color 0.15s ease, box-shadow 0.15s ease;

      &:focus-within {
        border-color: var(--hsi-primary-2);
        box-shadow: 0 0 0 3px rgba(103, 193, 211, 0.18);
      }

      &.has-error {
        border-color: var(--color-error, #e05858);
        &:focus-within {
          box-shadow: 0 0 0 3px rgba(224, 88, 88, 0.15);
        }
      }

      input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-size: 13px;
        color: var(--hsi-ink);

        &::placeholder { color: #a7bcc4; }
      }
    }

    .hsi-i {
      font-style: normal;
      font-size: 18px;
      line-height: 1;
      color: #88a7b2;
    }

    .hsi-submit {
      width: 100%;
      border: none;
      border-radius: 12px;
      padding: 13px;
      margin-top: 6px;
      background: linear-gradient(180deg, var(--hsi-primary-2), var(--hsi-primary));
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: filter 0.15s ease, transform 0.05s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) { filter: brightness(1.04); }
      &:active:not(:disabled) { transform: translateY(1px); }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .hsi-error-msg {
      display: block;
      font-size: 12px;
      color: var(--color-error, #e05858);
      margin-bottom: 12px;
      margin-top: -4px;
    }

    .hsi-loader {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #FFF;
      animation: hsi-spin 0.8s infinite linear;
      display: inline-block;
    }

    @keyframes hsi-spin {
      to { transform: rotate(360deg); }
    }

    .hsi-footer-link {
      text-align: center;
      margin: 14px 0 0;
      font-size: 12.5px;
      color: var(--hsi-muted);

      a {
        color: var(--hsi-primary-dark);
        font-weight: 500;
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hsi-blob { animation: none; }
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
