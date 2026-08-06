import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-card-content">
      <h2>¿Qué es el Sistema de Soporte de HSI?</h2>
      <p class="intro-text">
        El Sistema de Soporte de HSI es la plataforma oficial para la gestión de consultas, reclamos e incidentes relacionados con Historia de Salud Integrada en la Provincia de La Rioja. Permite a los usuarios institucionales reportar errores, solicitar asistencia técnica y hacer seguimiento del estado de sus solicitudes de forma trazable y eficiente.
      </p>

      <div class="separator"></div>

      <div class="chatbot-highlight-box">
        <div class="box-header">
          <h3>Asistente Virtual 24/7</h3>
          <div class="mini-bot-icon">
            <span class="bot-face"></span>
          </div>
        </div>
        <p class="box-description">
          El chatbot está disponible las 24 horas para responder preguntas frecuentes sobre el uso de HSI, orientarte en el sistema y guiarte en la carga de tickets. Si tu consulta requiere atención personalizada, el bot escala automáticamente tu caso a un agente de soporte.
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
  `,
  styles: [`
    .about-card-content {
      padding: 40px;
    }

    h2 {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 16px;
    }

    .intro-text {
      font-family: var(--font-body);
      font-size: 15px;
      line-height: 1.7;
      color: var(--color-text-primary);
    }

    .separator {
      height: 1px;
      background-color: var(--color-border);
      margin: 24px 0;
    }

    .chatbot-highlight-box {
      background-color: var(--color-bg-secondary);
      border-radius: 12px;
      padding: 24px;
      border-left: 4px solid var(--bot-blue);
      position: relative;
    }

    .box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .box-header h3 {
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .mini-bot-icon {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-bot);
      background: var(--bot-fab-gradient);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bot-face {
      width: 14px;
      height: 10px;
      border: 2px solid white;
      border-radius: 3px;
      position: relative;
    }
    .bot-face::before, .bot-face::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 3px;
      background-color: var(--bot-yellow);
      border-radius: 50%;
      top: 2px;
    }
    .bot-face::before { left: 2px; }
    .bot-face::after { right: 2px; }

    .box-description {
      font-family: var(--font-body);
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-muted);
      margin-bottom: 16px;
      max-width: 90%;
    }

    .capabilities-list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
    }

    .capabilities-list li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-primary);
    }

    .check-icon {
      color: var(--color-accent-teal);
      font-size: 18px;
      font-weight: bold;
    }
  `]
})
export class AboutComponent { }
