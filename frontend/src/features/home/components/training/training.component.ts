import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ResourceCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  duration: number;
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
          <div class="resource-card">
            <!-- Video Placeholder -->
            <div class="video-thumbnail">
              <span class="material-icons play-icon">play_arrow</span>
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
                <button class="view-btn">Ver →</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
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
    }

    .resource-card:hover {
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

    .play-icon {
      font-size: 40px;
      color: var(--color-accent-teal);
      background: white;
      border-radius: 50%;
      padding: 4px;
      box-shadow: 0 2px 8px rgba(51,49,67,0.15);
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .resource-card:hover .play-icon {
      transform: scale(1.1);
      color: var(--color-accent-teal-hover);
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
  `]
})
export class TrainingComponent {
  searchQuery = '';
  selectedFilter = signal<string>('Todos');

  filters = ['Todos', 'Módulo Guardias', 'Turnos', 'Medicamentos', 'Facturación'];

  resources: ResourceCard[] = [
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
}
