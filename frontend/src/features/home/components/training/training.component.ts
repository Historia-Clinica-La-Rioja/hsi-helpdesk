import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface ResourceCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  duration: number;
  videoUrl?: string;
}

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="training-container">
      <h2>Recursos de Capacitación</h2>
      
      <!-- Toolbar -->
      <div class="toolbar-row">
        <!-- Search Input -->
        <div class="search-input-container">
          <span class="material-icons search-icon">search</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Buscar por título o tema..."
          />
        </div>

        <!-- Filter Chips -->
        <div class="filter-chips">
          @for (filter of filters; track filter) {
            <button 
              class="filter-chip" 
              [class.active]="selectedFilter() === filter"
              (click)="selectedFilter.set(filter)"
            >
              {{ filter }}
            </button>
          }
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="resources-grid">
        @for (resource of filteredResources(); track resource.id) {
          <div 
            class="resource-card"
            [class.has-video]="!!resource.videoUrl"
            (click)="resource.videoUrl ? playVideo(resource) : null"
          >
            <!-- Video Thumbnail -->
            <div class="video-thumbnail">
              @if (resource.videoUrl) {
                <img [src]="getThumbnailUrl(resource.videoUrl)" class="thumbnail-img" alt="Video Preview" />
                <span class="material-icons play-icon">play_arrow</span>
                <span class="video-duration-badge">{{ resource.duration }} min</span>
              } @else {
                <span class="material-icons lock-icon">lock_outline</span>
              }
            </div>
            
            <div class="card-body">
              <span class="category-badge">{{ resource.tag }}</span>
              <h4>{{ resource.title }}</h4>
              <p>{{ resource.description }}</p>
              
              <div class="card-footer">
                <span class="duration-text">
                  <span class="material-icons">schedule</span>
                  {{ resource.duration }} min
                </span>
                @if (resource.videoUrl) {
                  <button 
                    class="view-btn" 
                    (click)="$event.stopPropagation(); playVideo(resource)"
                  >
                    Ver →
                  </button>
                } @else {
                  <span class="no-video-text">Próximamente</span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Video Player Modal -->
    @if (selectedVideo(); as video) {
      <div class="video-modal-overlay" (click)="closeVideoPlayer()">
        <div class="video-modal-container" (click)="$event.stopPropagation()">
          <div class="video-modal-header">
            <h3>{{ video.title }}</h3>
            <button class="close-modal-btn" (click)="closeVideoPlayer()">
              <span class="material-icons">close</span>
            </button>
          </div>
          <div class="video-modal-body">
            @if (safeVideoUrl()) {
              <div class="iframe-container">
                <iframe 
                  [src]="safeVideoUrl()" 
                  allow="autoplay; encrypted-media" 
                  allowfullscreen>
                </iframe>
              </div>
            } @else {
              <div class="no-video-alert">
                <span class="material-icons">error_outline</span>
                <p>Este recurso no tiene un video disponible.</p>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .training-container {
      padding: 32px;
    }

    h2 {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 24px;
    }

    .toolbar-row {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
    }

    @media (min-width: 768px) {
      .toolbar-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .search-input-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    @media (min-width: 768px) {
      .search-input-container {
        width: 45%;
      }
    }

    .search-icon {
      position: absolute;
      left: 12px;
      color: var(--color-text-muted);
      font-size: 20px;
    }

    .search-input-container input {
      width: 100%;
      height: 40px;
      padding: 0 12px 0 40px;
      border: 1.5px solid var(--color-border);
      border-radius: 20px;
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-primary);
      background-color: var(--color-bg-primary);
      outline: none;
      transition: border-color 0.2s ease;
    }

    .search-input-container input:focus {
      border-color: var(--color-accent-teal);
    }

    .filter-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-chip {
      height: 32px;
      padding: 0 16px;
      background-color: var(--color-bg-primary);
      border: 1.5px solid var(--color-border);
      border-radius: 16px;
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-primary);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-chip:hover {
      background-color: var(--color-bg-secondary);
    }

    .filter-chip.active {
      background-color: var(--color-accent-teal);
      border-color: var(--color-accent-teal);
      color: white;
      font-weight: 500;
    }

    /* Resources Grid */
    .resources-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 768px) {
      .resources-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .resource-card {
      background-color: var(--color-bg-primary);
      border-radius: var(--radius-card);
      overflow: hidden;
      box-shadow: var(--shadow-card);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: default;
    }

    .resource-card.has-video {
      cursor: pointer;
    }

    .resource-card.has-video:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(51,49,67,0.1);
    }

    .video-thumbnail {
      height: 140px;
      background-color: var(--color-accent-mint);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .video-duration-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background-color: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 500;
      z-index: 2;
    }

    .play-icon {
      font-size: 40px;
      color: var(--color-accent-teal);
      background: white;
      border-radius: 50%;
      padding: 4px;
      box-shadow: 0 2px 8px rgba(51,49,67,0.15);
      transition: transform 0.2s ease, color 0.2s ease;
      z-index: 2;
    }

    .resource-card.has-video:hover .play-icon {
      transform: scale(1.1);
      color: var(--color-accent-teal-hover);
    }

    .lock-icon {
      font-size: 32px;
      color: var(--color-text-muted);
      opacity: 0.6;
    }

    .thumbnail-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: opacity 0.2s ease, transform 0.2s ease;
      z-index: 1;
    }

    .resource-card.has-video:hover .thumbnail-img {
      opacity: 1;
      transform: scale(1.05);
    }

    .card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 8px;
    }

    .category-badge {
      align-self: flex-start;
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-primary);
      background-color: var(--color-accent-mint);
      padding: 2px 8px;
      border-radius: 4px;
    }

    h4 {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 600;
      color: var(--color-text-primary);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 42px;
    }

    p {
      font-family: var(--font-body);
      font-size: 13px;
      line-height: 1.5;
      color: var(--color-text-muted);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 38px;
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid var(--color-border);
    }

    .duration-text {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .duration-text .material-icons {
      font-size: 16px;
    }

    .view-btn {
      background: transparent;
      border: none;
      color: var(--color-accent-teal);
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .view-btn:hover {
      color: var(--color-accent-teal-hover);
    }

    .no-video-text {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-muted);
      font-style: italic;
    }

    /* Video Modal */
    .video-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    }

    .video-modal-container {
      background-color: var(--color-bg-primary);
      border-radius: var(--radius-card);
      width: 90%;
      max-width: 800px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--color-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-modal-header {
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-border);
    }

    .video-modal-header h3 {
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0;
    }

    .close-modal-btn {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border-radius: 50%;
      transition: background-color 0.2s, color 0.2s;
    }

    .close-modal-btn:hover {
      background-color: var(--color-bg-secondary);
      color: var(--color-text-primary);
    }

    .video-modal-body {
      padding: 0;
      background-color: #000;
    }

    .iframe-container {
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
    }

    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    .no-video-alert {
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: var(--color-text-muted);
    }

    .no-video-alert .material-icons {
      font-size: 48px;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class TrainingComponent {
  private sanitizer = inject(DomSanitizer);

  searchQuery = '';
  selectedFilter = signal<string>('Todos');

  filters = ['Todos', 'Módulo Guardias', 'Turnos', 'Medicamentos', 'Facturación', 'Seguridad'];

  selectedVideo = signal<ResourceCard | null>(null);

  safeVideoUrl = computed(() => {
    const video = this.selectedVideo();
    if (!video || !video.videoUrl) return null;
    const embedUrl = this.getEmbedUrl(video.videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  });

  resources: ResourceCard[] = [
    {
      id: 'res_2fa',
      tag: 'Seguridad',
      title: 'Autenticación del Doble Factor de Identidad (2FA)',
      description: 'Guía paso a paso para configurar y utilizar la autenticación de doble factor en tu cuenta del sistema HSI.',
      duration: 5,
      videoUrl: 'https://drive.google.com/file/d/1QN1a70OqP1z-Isz05xKSgioYMykgbCYD/view?usp=sharing'
    },
    {
      id: 'res_1',
      tag: 'Módulo Guardias',
      title: 'Introducción al Módulo de Guardias HSI',
      description: 'Aprendé los conceptos básicos para registrar ingresos, evoluciones y derivaciones en el nuevo módulo de guardias de urgencia.',
      duration: 15
    },
    {
      id: 'res_2',
      tag: 'Turnos',
      title: 'Gestión de Turnos y Agendas Médicas',
      description: 'Configuración de agendas de profesionales, cancelación de turnos, bloqueos de sobreturnos y asignación de prioridades.',
      duration: 20
    },
    {
      id: 'res_3',
      tag: 'Medicamentos',
      title: 'Prescripción de Medicamentos y Receta Digital',
      description: 'Paso a paso para la prescripción de medicamentos ambulatorios y de urgencia utilizando el vademécum integrado.',
      duration: 12
    },
    {
      id: 'res_4',
      tag: 'Facturación',
      title: 'Facturación y Registro de Prestaciones',
      description: 'Cómo registrar correctamente las prácticas asistenciales realizadas para garantizar su posterior facturación y recupero.',
      duration: 18
    },
    {
      id: 'res_5',
      tag: 'Módulo Guardias',
      title: 'Carga Básica de Historia Clínica del Paciente',
      description: 'Guía completa para la creación y edición del historial de consultas del paciente, carga de antecedentes y diagnósticos.',
      duration: 25
    },
    {
      id: 'res_6',
      tag: 'Otros',
      title: 'Uso de Firmas Digitales en HSI La Rioja',
      description: 'Instructivo para configurar y utilizar tu token de firma digital homologada en los documentos y recetas electrónicas.',
      duration: 10
    }
  ];

  filteredResources = computed(() => {
    const q = this.searchQuery.toLowerCase().trim();
    const filter = this.selectedFilter();

    return this.resources.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(q) || res.description.toLowerCase().includes(q);
      const matchesFilter = filter === 'Todos' || res.tag === filter;
      return matchesSearch && matchesFilter;
    });
  });

  playVideo(video: ResourceCard) {
    this.selectedVideo.set(video);
  }

  closeVideoPlayer() {
    this.selectedVideo.set(null);
  }

  getThumbnailUrl(url: string): string | null {
    const regExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
    }
    return null;
  }

  private getEmbedUrl(url: string): string {
    const regExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  }
}
