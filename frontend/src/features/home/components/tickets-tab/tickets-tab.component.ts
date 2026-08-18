
import { Component, Input, Output, EventEmitter, inject, signal, computed, effect, OnInit, DestroyRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TicketService, Ticket, TicketMessage } from '../../../../core/services/ticket.service';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Faq } from '../knowledge-base/knowledge-base.component';

export interface Institution {
  _id: string;
  id: number;
  name: string;
  email: string;
}

export interface Priority {
  id: string;
  name: string;
}

@Component({
  selector: 'app-tickets-tab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <div class="tickets-container">
      @if (showInitialLoading()) {
        <div class="lazy-placeholder">
          <span class="material-icons loading-spin">sync</span>
          <p>Cargando información...</p>
        </div>
      } @else if (innerViewMode() === 'create') {
        <!-- Create Form View -->
        <div class="ticket-form-card">
          <h2>Nuevo Ticket de Soporte</h2>
          <p class="subtitle">Los campos marcados con * son obligatorios</p>
          <div class="separator"></div>

          <form [formGroup]="ticketForm" (submit)="onSubmit($event)">
            <div class="form-columns">
              <!-- Left Column -->
              <div class="form-col">
                <!-- Title -->
                <div class="form-group">
                  <div class="label-row" style="display: flex; justify-content: space-between; align-items: center;">
                    <label>Título del error o solicitud *</label>
                    <span class="char-counter" style="font-size: 11px; color: #90A4AE;">
                      {{ ticketForm.get('title')?.value?.length || 0 }}/100
                    </span>
                  </div>
                  <div class="input-container">
                    <span class="material-icons input-icon">title</span>
                    <input 
                      type="text" 
                      formControlName="title" 
                      maxlength="100"
                      placeholder="Ej: Error al firmar documento / cargar Historia Clínica"
                    />
                  </div>
                  @if (showError('title')) {
                    <span class="error-text">
                      @if (ticketForm.get('title')?.hasError('required')) {
                        El título es obligatorio
                      } @else if (ticketForm.get('title')?.hasError('maxlength')) {
                        El título no debe superar los 100 caracteres
                      }
                    </span>
                  }
                </div>

                <!-- Email -->
                <div class="form-group">
                  <label>Email institucional *</label>
                  <div class="input-container">
                    <span class="material-icons input-icon">email</span>
                    <input 
                      type="email" 
                      formControlName="email" 
                      placeholder="usuario@salud.larioja.gob.ar"
                    />
                  </div>
                  @if (showError('email')) {
                    <span class="error-text">Email inválido u obligatorio</span>
                  }
                </div>

                <!-- Institution -->
                <div class="form-group">
                  <label>Institución *</label>
                  <div class="input-container">
                    <span class="material-icons input-icon">search</span>
                    <input 
                      type="text" 
                      formControlName="institution" 
                      placeholder="Buscá tu institución..."
                      [matAutocomplete]="auto"
                      (input)="onInstitutionInput($event)"
                    />
                    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onInstitutionSelect($event.option.value)">
                      @for (inst of filteredInstitutions(); track inst._id) {
                        <mat-option [value]="inst.name">{{ inst.name }}</mat-option>
                      }
                    </mat-autocomplete>
                  </div>
                  @if (showError('institution')) {
                    <span class="error-text">Selecciona una institución</span>
                  }
                </div>

                <!-- Priority -->
                <div class="form-group">
                  <label>Prioridad *</label>
                  <div class="priority-chips-row">
                    @for (prio of priorities(); track prio.id) {
                      <button 
                        type="button" 
                        class="priority-chip"
                        [ngClass]="getPriorityChipClass(prio.name)"
                        [class.active]="selectedPriority() === prio.name"
                        (click)="setPriority(prio.name)"
                      >
                        {{ getPriorityEmoji(prio.name) }} {{ prio.name }}
                      </button>
                    }
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="form-col">
                <!-- Description -->
                <div class="form-group">
                  <label>Descripción del error o solicitud *</label>
                  <textarea 
                    formControlName="description"
                    placeholder="Describí el error o solicitud con el mayor detalle posible. Podés incluir pasos para reproducirlo, mensaje de error exacto, etc."
                  ></textarea>
                  @if (showError('description')) {
                    <span class="error-text">La descripción es obligatoria</span>
                  }
                </div>

                <!-- Tags -->
                <div class="form-group">
                  <div class="label-with-tooltip">
                    <label>Etiquetas</label>
                    <span class="material-icons info-icon" [title]="'Las etiquetas son definidas por el administrador del sistema y ayudan a clasificar tu consulta'">info</span>
                  </div>
                  
                  <mat-chip-listbox multiple class="tags-chip-list">
                    @for (tag of systemTags(); track tag.id) {
                      <mat-chip-option 
                        [selected]="selectedTags().includes(tag.id)"
                        [disabled]="!selectedTags().includes(tag.id) && selectedTags().length >= 5"
                        (selectionChange)="toggleTag(tag.id, $event.selected)"
                      >
                        {{ tag.name }}
                      </mat-chip-option>
                    }
                  </mat-chip-listbox>
                  @if (selectedTags().length === 0) {
                    <span class="error-text" style="display: block; margin-top: 4px;">Debes seleccionar al menos 1 etiqueta</span>
                  } @else if (selectedTags().length >= 5) {
                    <span class="error-text" style="display: block; margin-top: 4px;">Máximo 5 etiquetas permitidas</span>
                  }
                </div>
              </div>
            </div>

            <!-- Bottom Area: File Attachment zone -->
            <div class="form-group full-width">
              <label>Adjuntar archivos</label>
              <div 
                class="drag-drop-zone"
                [class.drag-over]="isDragOver()"
                (dragover)="onDragOver($event)"
                (dragleave)="onDragLeave()"
                (drop)="onDrop($event)"
                (click)="fileInput.click()"
              >
                <input 
                  type="file" 
                  #fileInput 
                  style="display: none;" 
                  multiple
                  (change)="onFileSelected($event)"
                />
                <span class="material-icons clip-icon">attachment</span>
                @if (attachments().length === 0) {
                  <p>Arrastrá archivos o hacé click para adjuntar</p>
                } @else {
                  <p class="attachments-list">
                    {{ attachments().length }} archivo(s) seleccionado(s): {{ attachments().join(', ') }}
                  </p>
                }
              </div>
            </div>

            <div class="separator"></div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button 
                type="button" 
                class="cancel-btn" 
                (click)="onCancel()"
                [disabled]="isSubmitting()"
              >
                Cancelar
              </button>
              
              <button 
                type="submit" 
                class="send-btn"
                [disabled]="isSubmitting() || ticketForm.invalid || selectedTags().length < 1 || selectedTags().length > 5"
              >
                @if (isSubmitting()) {
                  Cargando...
                } @else {
                  Enviar ticket →
                }
              </button>
            </div>
          </form>
        </div>
      } @else if (innerViewMode() === 'list' || innerViewMode() === 'archived') {
        <!-- List View (Mis Tickets / Tickets de Soporte) -->
        <div class="ticket-history-card">
          <div class="history-header">
            <h2>{{ innerViewMode() === 'archived' ? 'Tickets Archivados' : (currentUserRole() === 'user' ? 'Mis tickets' : 'Panel de Agente') }}</h2>
            @if (currentUserRole() === 'user' && innerViewMode() !== 'archived') {
              <button class="new-ticket-btn" (click)="setViewMode('create')">
                + Nuevo ticket
              </button>
            }
          </div>

          @if (currentUserRole() === 'user') {
            <!-- User Search & Filters Section -->
            <div class="user-filters-container">
              <!-- Search bar -->
              <div class="user-search-bar">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Buscar tus tickets por palabra clave en el título..."
                  (input)="onSearchInput($event)"
                  [value]="searchQuery()"
                />
                @if (searchQuery()) {
                  <button class="clear-search-btn" (click)="clearSearch()" title="Limpiar búsqueda">
                    <span class="material-icons">close</span>
                  </button>
                }
              </div>

              <!-- Filter Controls Row -->
              <div class="user-filter-controls">
                <!-- Dropdown for Sorting -->
                <div class="filter-group">
                  <label for="user-sort-select">Ordenar por</label>
                  <div class="select-wrapper">
                    <span class="material-icons select-icon">sort</span>
                    <select id="user-sort-select" [ngModel]="userSort()" (ngModelChange)="userSort.set($event)">
                      <option value="recent">Más recientes</option>
                      <option value="oldest">Más antiguos</option>
                      <option value="priority">Mayor prioridad</option>
                    </select>
                  </div>
                </div>

                <!-- Dropdown for Status -->
                @if (innerViewMode() !== 'archived') {
                  <div class="filter-group">
                    <label for="user-status-select">Estado</label>
                    <div class="select-wrapper">
                      <span class="material-icons select-icon">filter_alt</span>
                      <select id="user-status-select" [ngModel]="userStatusFilter()" (ngModelChange)="userStatusFilter.set($event)">
                        <option value="all">Todos los estados</option>
                        <option value="open">Abiertos</option>
                        <option value="in_progress">En progreso</option>
                        <option value="resolved">Resueltos</option>
                      </select>
                    </div>
                  </div>
                }

                <!-- Dropdown for Tags -->
                <div class="filter-group">
                  <label for="user-tag-select">Etiqueta</label>
                  <div class="select-wrapper">
                    <span class="material-icons select-icon">label</span>
                    <select id="user-tag-select" [ngModel]="userTagFilter()" (ngModelChange)="userTagFilter.set($event)">
                      <option value="all">Todas las etiquetas</option>
                      @for (tag of userTags(); track tag) {
                        <option [value]="tag">{{ tag }}</option>
                      }
                    </select>
                  </div>
                </div>

                <!-- Clear Filters button -->
                @if (hasActiveUserFilters()) {
                  <button class="clear-filters-btn" (click)="clearUserFilters()">
                    <span class="material-icons">filter_alt_off</span>
                    Restablecer
                  </button>
                }
              </div>
            </div>
          }

          @if (currentUserRole() !== 'user' && innerViewMode() !== 'archived') {
            <!-- 6 Stat Cards -->
            <div class="agent-stats-row">
              <div class="stat-card total" (click)="setStatusFilter('todos')" style="cursor: pointer;">
                <span class="stat-label">Total</span>
                <span class="stat-value">{{ statsTotal() }}</span>
              </div>
              <div class="stat-card abiertos" (click)="setStatusFilter('abierto')" style="cursor: pointer;">
                <span class="stat-label">Abiertos</span>
                <span class="stat-value">{{ statsAbiertos() }}</span>
              </div>
              <div class="stat-card progreso" (click)="setStatusFilter('en_progreso')" style="cursor: pointer;">
                <span class="stat-label">En progreso</span>
                <span class="stat-value">{{ statsProgreso() }}</span>
              </div>
              <div class="stat-card reabiertos" (click)="setStatusFilter('reabierto')" style="cursor: pointer;">
                <span class="stat-label">Reabiertos</span>
                <span class="stat-value">{{ statsReabiertos() }}</span>
              </div>
              <div class="stat-card transferidos" (click)="setStatusFilter('transferido')" style="cursor: pointer;">
                <span class="stat-label">Transferidos</span>
                <span class="stat-value">{{ statsTransferidos() }}</span>
              </div>
              <div class="stat-card resueltos" (click)="setStatusFilter('resuelto')" style="cursor: pointer;">
                <span class="stat-label">Resueltos</span>
                <span class="stat-value">{{ statsResueltos() }}</span>
              </div>
            </div>

            <!-- Agent Filter Tabs & Search Bar -->
            <div class="agent-tabs-container">
              <!-- Search input -->
              <div class="agent-search-bar">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Buscar por usuario, institución o ID..."
                  (input)="onSearchInput($event)"
                />
              </div>

              <!-- Filter funnel icon -->
              <span class="material-icons" style="color: #90A4AE; font-size: 20px; flex-shrink: 0; margin-left: 4px;">filter_alt</span>

              <!-- Horizontal pills -->
              <div class="agent-tabs">
                <button 
                  class="agent-tab-btn" 
                  [class.active]="selectedStatusFilter() === 'todos'"
                  (click)="setStatusFilter('todos')"
                >
                  Todos
                </button>
                <button 
                  class="agent-tab-btn" 
                  [class.active]="selectedStatusFilter() === 'abierto'"
                  (click)="setStatusFilter('abierto')"
                >
                  Abierto
                </button>
                <button 
                  class="agent-tab-btn" 
                  [class.active]="selectedStatusFilter() === 'en_progreso'"
                  (click)="setStatusFilter('en_progreso')"
                >
                  En progreso
                </button>
                <button 
                  class="agent-tab-btn" 
                  [class.active]="selectedStatusFilter() === 'reabierto'"
                  (click)="setStatusFilter('reabierto')"
                >
                  Reabierto
                </button>
                <button 
                  class="agent-tab-btn" 
                  [class.active]="selectedStatusFilter() === 'transferido'"
                  (click)="setStatusFilter('transferido')"
                >
                  Transferido
                </button>
                <button 
                  class="agent-tab-btn" 
                  [class.active]="selectedStatusFilter() === 'resuelto'"
                  (click)="setStatusFilter('resuelto')"
                >
                  Resuelto
                </button>
              </div>
            </div>
          }
          
          <div class="separator"></div>

          <div class="tickets-list" [class.agent-list]="currentUserRole() !== 'user' && innerViewMode() !== 'archived'">
            @if (ticketsList().length === 0) {
              <div class="empty-state">
                <span class="material-icons">{{ innerViewMode() === 'archived' ? 'archive' : 'confirmation_number' }}</span>
                <p>
                  @if (innerViewMode() === 'archived') {
                    No se encontraron tickets archivados.
                  } @else {
                    {{ currentUserRole() === 'user' ? 'Aún no tenés tickets enviados.' : 'No se encontraron tickets de soporte.' }}
                  }
                </p>
              </div>
            } @else {
              @for (ticket of ticketsList(); track ticket.id) {
                <div class="ticket-item" (click)="onSelectTicket(ticket)">
                  <div class="item-avatar">
                    {{ getTicketUserInitials(ticket.user_id) }}
                  </div>
                  
                  <div class="item-content">
                    <div class="item-top-row" style="display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%;">
                      <!-- Left elements: Person Info (or Title if User) -> Institution -> Priority -> Date -->
                      <div class="top-row-left" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; color: var(--color-text-muted); font-size: 12px;">
                        <span class="user-display-name" style="font-weight: 700; font-size: 15px; color: var(--color-text-primary); margin-right: 4px;">
                          {{ currentUserRole() === 'user' ? ticket.title : getTicketUserFirstName(ticket.user_id) }}
                        </span>
                        <span class="institution-name-card" style="font-weight: 500;">{{ ticket.institution }}</span>
                        <span class="separator-dot" style="color: var(--color-border); margin: 0 2px;">•</span>
                        <!-- Priority Badge -->
                        <span class="card-priority-dot-indicator" [ngClass]="getPriorityClass(ticket.priority)">
                          <span class="priority-bullet">•</span>
                          <span>{{ ticket.priority }}</span>
                        </span>
                        <span class="separator-dot" style="color: var(--color-border); margin: 0 2px;">•</span>
                        <span class="card-date-timestamp" style="font-weight: 500;">{{ ticket.created_at | date:'dd/MM/yyyy HH:mm' }}</span>
                      </div>

                      <!-- Right elements: State Badges -> Nuevo Badge -> Time Elapsed -->
                      <div class="top-row-right" style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                        <!-- Unread Response Badge -->
                        @if (hasUnreadResponse(ticket)) {
                          <span class="status-badge unread-response-badge" title="Nueva respuesta">
                            <span class="material-icons" style="font-size: 12px; vertical-align: middle;">chat</span>
                          </span>
                        }

                        <!-- Status Badges -->
                        <span class="status-badge" [ngClass]="ticket.status">
                          {{ getStatusLabel(ticket.status) }}
                        </span>
                        @if (ticket.status === 'transferido' || ticket.status === 'reabierto') {
                          <span class="status-badge en_progreso">
                            En progreso
                          </span>
                        }

                        <!-- Nuevo Badge -->
                        @if (currentUserRole() !== 'user' && isTicketNew(ticket)) {
                          <span class="new-ticket-badge">Nuevo</span>
                        }

                        <!-- Elapsed Time Pill -->
                        <span class="time-elapsed-pill">{{ getElapsedText(ticket.created_at) }}</span>

                        <!-- Archive/Unarchive Action Button -->
                        @if (ticket.status === 'resuelto' && (currentUserRole() === 'user' || ticket.assigned_to === currentUserId())) {
                          @if (isTicketArchived(ticket.id)) {
                            <button 
                              class="archive-action-btn"
                              (click)="unarchiveTicket(ticket.id); $event.stopPropagation();"
                              title="Desarchivar ticket"
                              style="background: transparent; border: none; cursor: pointer; color: #78909C; display: inline-flex; align-items: center; justify-content: center; padding: 4px; border-radius: 4px; transition: color 0.2s;"
                              onmouseover="this.style.color='#00796B'"
                              onmouseout="this.style.color='#78909C'"
                            >
                              <span class="material-icons" style="font-size: 20px;">unarchive</span>
                            </button>
                          } @else {
                            <button 
                              class="archive-action-btn"
                              (click)="archiveTicket(ticket.id); $event.stopPropagation();"
                              title="Archivar ticket"
                              style="background: transparent; border: none; cursor: pointer; color: #78909C; display: inline-flex; align-items: center; justify-content: center; padding: 4px; border-radius: 4px; transition: color 0.2s;"
                              onmouseover="this.style.color='#00796B'"
                              onmouseout="this.style.color='#78909C'"
                            >
                              <span class="material-icons" style="font-size: 20px;">archive</span>
                            </button>
                          }
                        }
                      </div>
                    </div>

                    <!-- Body Preview (Description) -->
                    @if (currentUserRole() === 'user') {
                      <p class="body-preview" style="margin-top: 6px; margin-bottom: 6px; line-height: 1.4; color: var(--color-text-secondary); font-size: 13px;">
                        {{ ticket.description }}
                      </p>
                    } @else {
                      <p class="body-preview" style="margin-top: 6px; margin-bottom: 6px; line-height: 1.4; color: var(--color-text-secondary); font-size: 13px;">
                        <strong style="color: var(--color-text-primary); font-weight: 600;">{{ ticket.title }}</strong> - {{ ticket.description }}
                      </p>
                    }

                    <!-- Assigned to Name (visible in "Todos" list if assigned to someone else) -->
                    @if (currentUserRole() !== 'user' && ticket.assigned_to) {
                      <div class="card-timestamp-info-row" style="color: var(--bot-blue); font-weight: 600; margin-bottom: 6px; padding: 2px 0; font-size: 12px; display: flex; align-items: center; gap: 4px;">
                        <span class="material-icons" style="font-size: 14px; vertical-align: middle;">assignment_ind</span>
                        <span>Asignado a: {{ getAgentName(ticket.assigned_to) }}</span>
                      </div>
                    }

                    <!-- Reopened/Closed/Edited Timestamps for Admin -->
                    @if (currentUserRole() !== 'user') {
                      <div class="agent-card-timestamps" style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 6px;">
                        @if (ticket.status === 'reabierto' && ticket.reopened_at) {
                          <div class="card-timestamp-info-row reopened" style="font-size: 12px; display: flex; align-items: center; gap: 4px;">
                            <span class="material-icons" style="font-size: 14px; vertical-align: middle;">history</span>
                            <span>Reabierto el {{ ticket.reopened_at | date:'dd/MM/yyyy HH:mm' }}</span>
                          </div>
                        }
                        @if (ticket.status === 'resuelto' && ticket.resolved_at) {
                          <div class="card-timestamp-info-row closed" style="font-size: 12px; display: flex; align-items: center; gap: 4px;">
                            <span class="material-icons" style="font-size: 14px; vertical-align: middle;">check_circle</span>
                            <span>Resuelto el {{ ticket.resolved_at | date:'dd/MM/yyyy HH:mm' }}</span>
                          </div>
                        }
                        @if (ticket.editCount && ticket.editCount >= 1) {
                          <div class="card-timestamp-info-row edited" style="font-size: 12px; display: flex; align-items: center; gap: 4px;">
                            <span class="material-icons" style="font-size: 14px; vertical-align: middle;">edit_note</span>
                            <span>Modificado el {{ (ticket.updated_at || ticket.created_at) | date:'dd/MM/yyyy HH:mm' }}</span>
                          </div>
                        }
                      </div>
                    }

                    <!-- Bottom Tags row -->
                    <div class="item-tags-row" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 6px;">
                      @for (t of ticket.tags; track t) {
                        <span class="item-tag-chip">{{ t }}</span>
                      }
                      @if (ticket.attachments.length > 0) {
                        <span class="attachment-indicator">
                          Archivo adjunto
                        </span>
                      }
                    </div>

                    <!-- Specialist Reassigned Badge for Agent -->
                    @if (currentUserRole() !== 'user' && ticket.status === 'transferido' && ticket.assigned_to === currentUserId()) {
                      <div class="agent-specialist-badge-row" style="margin-top: 8px; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #E65100; background-color: #FFF3E0; border: 1px solid #FFE0B2; padding: 4px 10px; border-radius: 8px; width: fit-content;">
                        <span class="material-icons" style="font-size: 14px; color: #E65100; vertical-align: middle;">star</span>
                        <span>Te han reasignado este ticket por ser agente especializado</span>
                      </div>
                    }

                    <!-- Specialist Reassigned Badge for User -->
                    @if (currentUserRole() === 'user' && ticket.status === 'transferido' && ticket.assigned_to) {
                      <div class="user-specialist-badge-row" style="margin-top: 8px; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #0288D1; background-color: #E1F5FE; border: 1px solid #B3E5FC; padding: 4px 10px; border-radius: 8px; width: fit-content;">
                        <span class="material-icons" style="font-size: 14px; color: #0288D1; vertical-align: middle;">support_agent</span>
                        <span>Este ticket ha sido reasignado a un agente especializado -> {{ getAgentName(ticket.assigned_to) }}</span>
                      </div>
                    }
                  </div>
                </div>
              }
            }
          </div>
        </div>
      } @else if (innerViewMode() === 'detail') {
        <!-- Detail View -->
        <div class="ticket-detail-card">
          <div class="detail-header">
            <button class="back-btn" (click)="setViewMode(previousListMode())">
              <span class="material-icons">arrow_back</span> Volver
            </button>
            <div class="detail-actions">
              @if (!isEditing()) {
                @if (selectedTicket(); as ticket) {
                  @if (canEditTicket(ticket)) {
                    <button class="edit-btn" (click)="onEditStart()">
                      <span class="material-icons">edit</span> Editar
                    </button>
                  } @else if (currentUserRole() === 'user') {
                    @if (ticket.editCount && ticket.editCount >= 1) {
                      <div class="edit-limit-badge">
                        <span class="material-icons info-icon">info</span> Límite de 1 edición alcanzado
                      </div>
                    } @else if (ticket.status !== 'abierto' || hasAgentResponse(ticket)) {
                      <div class="edit-limit-badge">
                        <span class="material-icons info-icon">info</span> No es posible editar el ticket después de la respuesta de un agente
                      </div>
                    }
                  }
                }
              }
            </div>
          </div>

          <div class="separator"></div>

          @if (selectedTicket(); as ticket) {
            <div class="detail-body">
              <div class="detail-title-section" style="margin-bottom: 12px;">
                <h2 style="font-size: 22px; font-weight: 700; color: var(--color-text-primary); margin: 0; line-height: 1.3;">
                  {{ ticket.title }}
                </h2>
              </div>
              @if (!isEditing()) {
                <!-- Display Mode -->
                <div class="detail-info-row">
                  <div class="info-block">
                    <span class="info-label">Institución</span>
                    <span class="info-value">{{ ticket.institution }}</span>
                  </div>
                  <div class="info-block">
                    <span class="info-label">Prioridad</span>
                    <span class="priority-badge" [ngClass]="getPriorityClass(ticket.priority)">
                      {{ ticket.priority }}
                    </span>
                  </div>
                  <div class="info-block">
                    <span class="info-label">Estado</span>
                    <div style="display: inline-flex; gap: 4px; align-items: center;">
                      <span class="status-badge" [ngClass]="ticket.status">
                        {{ getStatusLabel(ticket.status) }}
                      </span>
                      @if (ticket.status === 'transferido' || ticket.status === 'reabierto') {
                        <span class="status-badge en_progreso">
                          En progreso
                        </span>
                      }

                    </div>
                  </div>
                  <div class="info-block">
                    <span class="info-label">Creado</span>
                    <span class="info-value">{{ ticket.created_at | date:'dd/MM/yyyy HH:mm' }}</span>
                  </div>
                  @if (ticket.assigned_to) {
                    <div class="info-block">
                      <span class="info-label">Asignado a</span>
                      <span class="info-value" style="color: var(--bot-blue);">{{ getAgentName(ticket.assigned_to) }}</span>
                    </div>
                  }
                  @if (ticket.status === 'reabierto' && ticket.reopened_at) {
                    <div class="info-block">
                      <span class="info-label">Reabierto</span>
                      <span class="info-value" style="color: #C71585; font-weight: 600;">{{ ticket.reopened_at | date:'dd/MM/yyyy HH:mm' }}</span>
                    </div>
                  }
                  @if (ticket.status === 'resuelto' && ticket.resolved_at) {
                    <div class="info-block">
                      <span class="info-label">Resuelto</span>
                      <span class="info-value" style="color: #2E7D32; font-weight: 600;">{{ ticket.resolved_at | date:'dd/MM/yyyy HH:mm' }}</span>
                    </div>
                  }
                  @if (ticket.editCount && ticket.editCount >= 1) {
                    <div class="info-block">
                      <span class="info-label">Última Edición</span>
                      <span class="info-value" style="color: #455A64; font-weight: 600;">{{ (ticket.updated_at || ticket.created_at) | date:'dd/MM/yyyy HH:mm' }}</span>
                    </div>
                  }
                </div>

                <!-- Specialist Reassigned Badge for Agent in Detail -->
                @if (currentUserRole() !== 'user' && ticket.status === 'transferido' && ticket.assigned_to === currentUserId()) {
                  <div class="detail-specialist-badge" style="background: #FFF3E0; border: 1px solid #FFE0B2; padding: 12px 16px; border-radius: 8px; color: #E65100; font-family: var(--font-body); font-size: 13px; display: flex; align-items: center; gap: 8px; font-weight: 600; margin-top: 16px; margin-bottom: 8px; width: fit-content;">
                    <span class="material-icons" style="font-size: 18px; color: #E65100; vertical-align: middle;">star</span>
                    <span>Te han reasignado este ticket por ser agente especializado</span>
                  </div>
                }

                <!-- Specialist Reassigned Badge for User in Detail -->
                @if (currentUserRole() === 'user' && ticket.status === 'transferido' && ticket.assigned_to) {
                  <div class="detail-specialist-badge" style="background: #E1F5FE; border: 1px solid #B3E5FC; padding: 12px 16px; border-radius: 8px; color: #0288D1; font-family: var(--font-body); font-size: 13px; display: flex; align-items: center; gap: 8px; font-weight: 600; margin-top: 16px; margin-bottom: 8px; width: fit-content;">
                    <span class="material-icons" style="font-size: 18px; color: #0288D1; vertical-align: middle;">support_agent</span>
                    <span>Se ha asignado a un agente especializado para tu consulta -> {{ getAgentName(ticket.assigned_to) }}</span>
                  </div>
                }

                <div class="detail-description-section">
                  <h4>Descripción del incidente</h4>
                  <p class="description-text">{{ ticket.description }}</p>
                </div>

                @if (currentUserRole() !== 'user' && ticket.transfer_reason) {
                  <div class="transfer-reason-card" style="background: #FFF9C4; border: 1px solid #FFF59D; padding: 15px; border-radius: 8px; color: #5D4037; font-family: var(--font-body); font-size: 13px; display: flex; flex-direction: column; gap: 6px; margin-top: 16px; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 6px; font-weight: 700;">
                      <span class="material-icons" style="font-size: 18px; color: #F57F17; vertical-align: middle;">swap_horiz</span>
                      <span>Motivo de la transferencia</span>
                    </div>
                    <p style="margin: 0; line-height: 1.5; font-style: italic;">"{{ ticket.transfer_reason }}"</p>
                  </div>
                }

                @if (currentUserRole() !== 'user') {
                  @if (!ticket.assigned_to || ticket.assigned_to === currentUserId()) {
                    <div class="admin-controls-card">
                      <h4>Acciones de Soporte Técnico</h4>
                      <div class="admin-actions-toolbar">
                        <!-- Resolve Action Button -->
                        <div class="status-buttons-group">
                          @if (ticket.status !== 'resuelto') {
                            <button 
                              type="button" 
                              class="resolve-action-btn"
                              (click)="openResolveConfirmation(ticket.id)"
                            >
                              <span class="material-icons" style="font-size: 16px; vertical-align: middle;">task_alt</span>
                              Resolver Ticket
                            </button>
                          } @else {
                            <div class="ticket-resolved-badge-large">
                              <span class="material-icons" style="font-size: 18px; vertical-align: middle;">check_circle</span>
                              Ticket Resuelto
                            </div>
                          }
                        </div>

                        <div class="separator-v"></div>

                        <!-- Assignment Modal Trigger Button -->
                        <div class="status-buttons-group">
                          <button 
                            type="button" 
                            class="transfer-action-btn"
                            (click)="openTransferModal(ticket)"
                          >
                            <span class="material-icons" style="font-size: 16px; vertical-align: middle;">swap_horiz</span>
                            Transferir Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  } @else {
                    <div class="admin-controls-card info-only" style="background: #E3F2FD; border: 1px solid #BBDEFB; padding: 15px; border-radius: 8px; color: #0D47A1; font-weight: 500; display: flex; align-items: center; gap: 8px;">
                      <span class="material-icons">info</span>
                      <span>Este ticket está asignado a <strong>{{ getAgentName(ticket.assigned_to) }}</strong>. Solo el agente asignado puede responder o resolver este ticket.</span>
                    </div>
                  }
                }

                @if (ticket.attachments.length > 0) {
                  <div class="detail-attachments-section">
                    <h4>Archivos Adjuntos</h4>
                    <div class="attachments-grid">
                      @for (file of ticket.attachments; track file) {
                        <div class="attachment-file-card">
                          <span class="material-icons">insert_drive_file</span>
                          <span class="file-name" [title]="file">{{ file }}</span>
                        </div>
                      }
                    </div>
                  </div>
                }
              } @else {
                <!-- Editing Mode -->
                <div class="edit-form">
                  <div class="form-group">
                    <label>Prioridad</label>
                    <div class="priority-chips-row">
                      @for (prio of priorities(); track prio.id) {
                        <button 
                          type="button" 
                          class="priority-chip"
                          [ngClass]="getPriorityChipClass(prio.name)"
                          [class.active]="editPriority === prio.name"
                          (click)="editPriority = prio.name"
                        >
                          {{ getPriorityEmoji(prio.name) }} {{ prio.name }}
                        </button>
                      }
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Descripción del error o solicitud</label>
                    <textarea [(ngModel)]="editDescription" class="edit-textarea"></textarea>
                  </div>

                  <div class="edit-actions">
                    <button class="cancel-btn-edit" (click)="onEditCancel()">Cancelar</button>
                    <button class="save-btn" (click)="onEditSave()" [disabled]="!editDescription.trim()">Guardar Cambios</button>
                  </div>
                </div>
              }

              <!-- Comments / Message History Thread Section -->
              <div class="comments-section">
                <h3>Historial de Mensajes y Respuestas</h3>

                <div class="comments-list" #commentsList>
                  <!-- Render custom messages/comments -->
                  @for (comment of ticketComments(); track comment.id) {
                    @if (comment.role === 'system') {
                      <div class="system-comment-notice">
                        <span class="material-icons">info</span>
                        <span>{{ comment.content }}</span>
                        <span class="comment-time-system">{{ comment.created_at | date:'dd/MM/yyyy HH:mm' }}</span>
                      </div>
                    } @else {
                      <div class="comment-item" [ngClass]="comment.role">
                        <div class="comment-header">
                          <span class="comment-sender">
                            {{ getCommentSender(comment) }}
                          </span>
                          <span class="comment-time">{{ comment.created_at | date:'dd/MM/yyyy HH:mm' }}</span>
                        </div>
                        <p class="comment-body">{{ comment.content }}</p>
                      </div>
                    }
                  }
                </div>

                <!-- Add comment Form -->
                @if (currentUserRole() === 'user' || !ticket.assigned_to || ticket.assigned_to === currentUserId()) {
                  <form class="add-comment-form" (submit)="onSubmitComment($event)">
                    <textarea 
                      [(ngModel)]="newCommentText" 
                      name="newCommentText"
                      [placeholder]="currentUserRole() === 'user' ? 'Escribí un comentario o respuesta para el equipo de soporte...' : 'Escribí una respuesta o comentario para el usuario...'"
                      required
                    ></textarea>
                    <div class="comment-actions-row">
                      <div class="comment-actions-left">
                        @if (currentUserRole() !== 'user') {
                          <button type="button" class="kb-shortcut-btn" (click)="openKbPopup()" title="Respuestas Rápidas">
                            <span class="material-icons">menu_book</span>
                            <span>Respuestas Rápidas</span>
                          </button>
                        }
                      </div>
                      <button type="submit" class="comment-submit-btn" [disabled]="!newCommentText.trim() || isSendingComment()">
                        Enviar Comentario
                      </button>
                    </div>
                  </form>
                } @else {
                  <div class="comment-blocked-message" style="margin-top: 15px; padding: 15px; background: #FFF9C4; border-radius: 8px; color: #5D4037; font-weight: 500; text-align: center; border: 1px solid #FFF59D; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span class="material-icons" style="vertical-align: middle;">lock</span>
                    <span>Solo el agente asignado puede responder a este ticket.</span>
                  </div>
                }
              </div>

            </div>
          }
        </div>
      }

      <!-- Transfer Ticket Modal -->
      @if (showTransferModal()) {
        <div class="transfer-modal-overlay">
          <div class="transfer-modal-container">
            <div class="transfer-modal-header">
              <h3>Transferir ticket</h3>
              <button type="button" class="close-modal-btn" (click)="closeTransferModal()">
                <span class="material-icons">close</span>
              </button>
            </div>
            
            <p class="transfer-modal-subtitle">Seleccioná el agente destino y el motivo</p>
            
            <!-- Search bar -->
            <div class="transfer-search-container">
              <span class="material-icons search-icon">search</span>
              <input 
                type="text" 
                placeholder="Buscar agente o especialización..." 
                [ngModel]="transferSearchQuery()"
                (ngModelChange)="transferSearchQuery.set($event)"
              />
            </div>
            
            <!-- Tags (Specializations) -->
            <div class="transfer-tags-container">
              <button 
                type="button" 
                class="tag-chip-btn" 
                [class.active]="selectedSpecializationFilter() === 'Todos'"
                (click)="selectedSpecializationFilter.set('Todos')"
              >
                Todos
              </button>
              @for (spec of availableSpecializations(); track spec) {
                <button 
                  type="button" 
                  class="tag-chip-btn" 
                  [class.active]="selectedSpecializationFilter() === spec"
                  (click)="selectedSpecializationFilter.set(spec)"
                >
                  {{ spec }}
                </button>
              }
            </div>
            
            <!-- Online / Offline status toggle -->
            <div class="status-filters-container">
              <button 
                type="button" 
                class="status-filter-btn" 
                [class.active]="onlineStatusFilter() === 'online'"
                (click)="onlineStatusFilter.set('online')"
              >
                <span class="status-dot green"></span>
                En línea
              </button>
              <button 
                type="button" 
                class="status-filter-btn" 
                [class.active]="onlineStatusFilter() === 'offline'"
                (click)="onlineStatusFilter.set('offline')"
              >
                <span class="status-dot gray"></span>
                Fuera de línea
              </button>
            </div>
            
            <!-- Agents List -->
            <div class="transfer-agents-list">
              @for (agent of filteredAgentsForTransfer(); track agent.id) {
                <div 
                  class="agent-transfer-row"
                  [class.selected]="selectedTransferAgentId() === agent.id"
                  [class.disabled]="!agent.is_active"
                  (click)="selectAgentForTransfer(agent)"
                >
                  <div class="agent-avatar-circle">
                    {{ getAgentInitials(agent) }}
                    <span class="avatar-status-dot" [class.online]="agent.is_active"></span>
                  </div>
                  
                  <div class="agent-info-col">
                    <span class="agent-name-text">{{ agent.first_name }} {{ agent.last_name }}</span>
                    <span class="agent-spec-text">{{ agent.specialization }}</span>
                  </div>
                  
                  <div class="agent-chats-col">
                    @if (agent.is_active) {
                      <div class="active-chats-badge">
                        <span class="material-icons chat-icon">chat_bubble_outline</span>
                        <span>{{ agent.active_chats }} {{ agent.active_chats === 1 ? 'chat' : 'chats' }}</span>
                      </div>
                    } @else {
                      <span class="no-available-text">No disponible</span>
                    }
                  </div>
                </div>
              } @empty {
                <div class="empty-agents-message">
                  No se encontraron agentes que coincidan con los filtros.
                </div>
              }
            </div>
            
            <!-- Reason Textarea -->
            <div class="transfer-reason-container">
              <label class="reason-label">Motivo de la transferencia (Obligatorio)</label>
              <textarea 
                placeholder="Escribe el motivo detallado de la transferencia aquí..."
                [ngModel]="transferReason()"
                (ngModelChange)="transferReason.set($event)"
                rows="3"
                required
              ></textarea>
            </div>
            
            <!-- Modal Actions -->
            <div class="transfer-modal-actions">
              <span class="selected-agent-indicator">
                @if (selectedTransferAgentId()) {
                  Transferir a: <strong>{{ getSelectedAgentName() }}</strong>
                } @else {
                  Selecciona un agente disponible
                }
              </span>
              
              <div class="modal-buttons-group">
                <button type="button" class="cancel-modal-btn" (click)="closeTransferModal()">
                  Cancelar
                </button>
                <button 
                  type="button" 
                  class="confirm-transfer-btn" 
                  [disabled]="isTransferDisabled()"
                  (click)="confirmTransfer()"
                >
                  <span class="material-icons">trending_flat</span>
                  Transferir
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Resolve Confirmation Modal -->
      @if (showResolveConfirmModal()) {
        <div class="confirm-modal-overlay">
          <div class="confirm-modal-container">
            <div class="confirm-modal-content">
              <span class="material-icons confirm-modal-icon">task_alt</span>
              <h3>¿Todo Listo?</h3>
              <p>Al confirmar, el estado de este ticket cambiará a "Resuelto".</p>
            </div>
            
            <div class="confirm-modal-actions">
              <button type="button" class="cancel-confirm-btn" (click)="closeResolveConfirmation()">
                Cancelar
              </button>
              <button 
                type="button" 
                class="accept-confirm-btn" 
                (click)="confirmResolve()"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Popups section -->
      @if (showCreateSuccess()) {
        <div class="success-overlay">
          <div class="success-dialog">
            <span class="material-icons success-icon">check_circle</span>
            <h4>Ticket creado correctamente</h4>
            <p class="clarification-text">
              Es posible editar un ticket solo una vez, antes de que un agente responda. Luego de que se inicie la conversación con el agente, el contenido del mismo no podrá ser modificado.
            </p>
            <div class="success-actions">
              <button class="accept-btn" (click)="showCreateSuccess.set(false)">Entendido</button>
            </div>
          </div>
        </div>
      }

      @if (showTransferSuccess()) {
        <div class="success-overlay">
          <div class="success-dialog">
            <span class="material-icons success-icon" style="color: var(--color-success);">check_circle</span>
            <h4>Ticket transferido correctamente</h4>
            <p class="clarification-text">
              El ticket ha sido asignado al nuevo agente y se ha registrado el motivo en el historial del ticket.
            </p>
            <div class="success-actions">
              <button class="accept-btn" (click)="showTransferSuccess.set(false)">Entendido</button>
            </div>
          </div>
        </div>
      }

      @if (showReopenInfo()) {
        <div class="success-overlay">
          <div class="success-dialog">
            <span class="material-icons" style="font-size: 54px; color: var(--bot-blue);">info</span>
            <h4>Ticket Resuelto</h4>
            <p class="clarification-text">
              Este ticket ha sido marcado como resuelto por el equipo de soporte. Si considerás que el problema aún no fue solucionado, podés reabrirlo automáticamente enviando un nuevo comentario en el historial de mensajes de abajo.
            </p>
            <div class="success-actions">
              <button class="accept-btn" (click)="showReopenInfo.set(false)" style="background-color: var(--bot-blue);">Entendido</button>
            </div>
          </div>
        </div>
      }

      <!-- Knowledge Base Shortcut Modal -->
      @if (showKbPopup()) {
        <div class="kb-popup-overlay" (click)="closeKbPopup()">
          <div class="kb-popup-container" (click)="$event.stopPropagation()">
            <div class="kb-popup-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="material-icons" style="color: var(--color-accent-teal);">menu_book</span>
                <h3>Base de Conocimiento</h3>
              </div>
              <button type="button" class="close-modal-btn" (click)="closeKbPopup()">
                <span class="material-icons">close</span>
              </button>
            </div>
            
            <div class="kb-popup-body-split">
              <!-- Left panel: Search & Categories -->
              <div class="kb-popup-left-panel">
                <div class="kb-popup-search-wrapper">
                  <span class="material-icons search-icon">search</span>
                  <input 
                    type="text" 
                    [ngModel]="kbSearchQuery()" 
                    (ngModelChange)="kbSearchQuery.set($event)"
                    placeholder="Buscar por pregunta, respuesta o etiqueta..."
                  />
                </div>

                <div class="kb-popup-navigation-content">
                  @if (kbSearchQuery()) {
                    <div class="search-results-header">
                      <span class="results-title">Resultados de búsqueda</span>
                      <span class="results-count">({{ kbFilteredFaqs().length }} encontrados)</span>
                    </div>
                    
                    <div class="search-results-list">
                      @for (faq of kbFilteredFaqs(); track faq.id) {
                        <div 
                          class="search-faq-item" 
                          [class.active]="kbSelectedFaq()?.id === faq.id"
                          (click)="selectKbFaq(faq)"
                        >
                          <span class="material-icons doc-icon">description</span>
                          <div class="search-faq-info">
                            <span class="search-faq-title">{{ faq.questions }}</span>
                            <span class="search-faq-path">{{ faq.label }}</span>
                          </div>
                        </div>
                      } @empty {
                        <div class="empty-search-state">
                          <span class="material-icons">search_off</span>
                          <p>No se encontraron artículos.</p>
                        </div>
                      }
                    </div>
                  } @else {
                    <span class="panel-section-title">CATEGORÍAS</span>
                    <div class="categories-tree-container">
                      <ng-container *ngTemplateOutlet="kbCategoryTemplate; context: { nodes: kbCategoryTree(), depth: 0 }"></ng-container>
                    </div>
                  }
                </div>
              </div>

              <!-- Right panel: Preview & insert -->
              <div class="kb-popup-right-panel">
                @if (kbSelectedFaq(); as faq) {
                  <div class="kb-faq-preview-card">
                    <div class="preview-header">
                      <h4>{{ faq.questions }}</h4>
                      <span class="preview-category-path">{{ faq.label }}</span>
                    </div>

                    @if (faq.tags && faq.tags.length > 0) {
                      <div class="preview-tags-row">
                        @for (tag of faq.tags; track tag) {
                          <span class="tag-pill">{{ tag }}</span>
                        }
                      </div>
                    }

                    <div class="preview-divider"></div>

                    <div class="preview-content-scroll">
                      <p class="preview-answer-text">{{ faq.answers }}</p>
                    </div>

                    <div class="preview-footer-actions">
                      <button type="button" class="insert-response-btn" (click)="insertKbAnswer(faq)">
                        <span class="material-icons">drive_file_rename_outline</span>
                        Insertar respuesta
                      </button>
                    </div>
                  </div>
                } @else {
                  <div class="kb-faq-preview-empty">
                    <span class="material-icons empty-icon">menu_book</span>
                    <p>Seleccioná una pregunta para previsualizar y pegar como respuesta.</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Recursive category tree template for KB shortcut popup -->
      <ng-template #kbCategoryTemplate let-nodes="nodes" let-depth="depth">
        @for (node of nodes; track node.fullName) {
          <div class="category-node" [style.padding-left.px]="depth * 12">
            <div class="category-item-row" (click)="toggleKbNode(node)">
              <span class="material-icons expand-arrow" [class.rotated]="node.isExpanded">
                chevron_right
              </span>
              <span class="material-icons folder-icon" [class.open]="node.isExpanded">
                {{ node.isExpanded ? 'folder_open' : 'folder' }}
              </span>
              <span class="category-name-text">{{ node.name }}</span>
              <span class="category-count-badge">{{ node.totalCount }}</span>
            </div>
            
            @if (node.isExpanded) {
              <!-- Render Nested Subcategories -->
              @if (node.subcategories.length > 0) {
                <ng-container *ngTemplateOutlet="kbCategoryTemplate; context: { nodes: node.subcategories, depth: depth + 1 }"></ng-container>
              }
              
              <!-- Render FAQs under this specific node -->
              @for (faq of node.faqs; track faq.id) {
                <div 
                  class="faq-leaf-row" 
                  [class.active]="kbSelectedFaq()?.id === faq.id"
                  [style.padding-left.px]="(depth + 1) * 12 + 16"
                  (click)="selectKbFaq(faq)"
                >
                  <span class="material-icons leaf-doc-icon">description</span>
                  <span class="faq-leaf-title">{{ faq.questions }}</span>
                </div>
              }
            }
          </div>
        }
      </ng-template>

      <!-- Floating Toast Notification -->
      @if (toastMessage(); as message) {
        <div class="toast-notification" [class.chatbot-open]="isChatOpen()" (click)="goToTicketFromToast()">
          <span class="material-icons toast-icon">notifications_active</span>
          <div class="toast-content">
            <span class="toast-title">Nueva respuesta</span>
            <span class="toast-text">{{ message }}</span>
          </div>
          <button class="toast-close" (click)="closeToast($event)">
            <span class="material-icons">close</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
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

    .tickets-container {
      width: 100%;
      height: 100%;
    }

    .ticket-form-card, .ticket-history-card, .ticket-detail-card {
      padding: 40px;
    }

    h2 {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    .subtitle {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-muted);
    }

    .separator {
      height: 1px;
      background-color: var(--color-border);
      margin: 20px 0;
    }

    .form-columns {
      display: flex;
      gap: 32px;
    }

    .form-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .label-with-tooltip {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .info-icon {
      font-size: 14px;
      color: var(--color-text-muted);
      cursor: help;
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
      font-size: 18px;
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
      outline: none;
      transition: border-color 0.2s ease;
      background: var(--color-bg-primary);
    }

    .input-container input:focus {
      border-color: var(--color-accent-teal);
    }

    textarea {
      width: 100%;
      height: 160px;
      padding: 12px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-input);
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--color-text-primary);
      outline: none;
      resize: vertical;
      transition: border-color 0.2s ease;
      background: var(--color-bg-primary);
    }

    textarea:focus {
      border-color: var(--color-accent-teal);
    }

    /* Custom Priority Chips */
    .priority-chips-row {
      display: flex;
      gap: 12px;
    }

    .priority-chip {
      flex: 1;
      height: 38px;
      border: 1px solid var(--color-border);
      background-color: var(--color-bg-secondary);
      border-radius: 20px;
      font-family: var(--font-body);
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      color: var(--color-text-primary);
    }

    .priority-chip.active {
      font-weight: bold;
    }

    .priority-chip.low.active {
      background-color: #EDF8F6;
      border-color: var(--color-success);
      color: #2E9E7A;
    }

    .priority-chip.medium.active {
      background-color: #FFF8E6;
      border-color: var(--bot-yellow);
      color: #9A7A00;
    }

    .priority-chip.high.active {
      background-color: #FFF3E0;
      border-color: #FB8C00;
      color: #E65100;
    }

    .priority-chip.critica.active {
      background-color: #FDF2F2;
      border-color: var(--color-error);
      color: var(--color-error);
    }

    /* Tags custom CSS */
    .tags-chip-list {
      margin-top: 4px;
    }

    ::ng-deep .mdc-evolution-chip-set__chips {
      gap: 8px !important;
    }

    ::ng-deep .mat-mdc-standard-chip {
      background-color: var(--color-bg-secondary) !important;
      border: 1px solid var(--color-border) !important;
      border-radius: 16px !important;
      font-family: var(--font-body) !important;
      font-size: 13px !important;
      color: var(--color-text-muted) !important;
      padding: 6px 12px !important;
      min-height: 32px !important;
    }

    ::ng-deep .mat-mdc-standard-chip.mdc-evolution-chip--selected {
      background-color: var(--color-accent-mint) !important;
      border-color: var(--color-accent-teal) !important;
      color: var(--color-text-primary) !important;
    }

    /* Drag & Drop */
    .drag-drop-zone {
      border: 2px dashed var(--color-accent-mint);
      background-color: var(--color-bg-secondary);
      border-radius: 12px;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      text-align: center;
      padding: 8px;
    }

    .drag-drop-zone:hover, .drag-drop-zone.drag-over {
      background-color: #EEFBF9;
      border-color: var(--color-accent-teal);
    }

    .clip-icon {
      color: var(--color-accent-teal);
      font-size: 20px;
    }

    .drag-drop-zone p {
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-muted);
    }

    .attachments-list {
      color: var(--color-text-primary) !important;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
    }

    .full-width {
      grid-column: span 2;
      margin-top: 16px;
    }

    /* Form Actions */
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }

    .cancel-btn {
      height: 48px;
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-button);
      color: var(--color-text-muted);
      font-family: var(--font-body);
      font-size: 14px;
      padding: 0 24px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .cancel-btn:hover {
      background-color: var(--color-bg-secondary);
    }

    .send-btn {
      height: 48px;
      background-color: var(--color-accent-teal);
      color: white;
      border: none;
      border-radius: var(--radius-button);
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 600;
      padding: 0 32px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .send-btn:hover:not(:disabled) {
      background-color: var(--color-accent-teal-hover);
    }

    .send-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-text {
      color: var(--color-error);
      font-size: 11px;
      margin-top: -4px;
    }

    /* History Layout */
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .new-ticket-btn {
      height: 38px;
      background: transparent;
      border: 1.5px solid var(--color-accent-teal);
      border-radius: var(--radius-button);
      color: var(--color-accent-teal);
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 13px;
      padding: 0 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .new-ticket-btn:hover {
      background-color: var(--color-accent-mint);
      border-color: var(--color-accent-teal);
      color: var(--color-text-primary);
    }

    .tickets-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: calc(100vh - 310px);
      overflow-y: auto;
      padding-right: 4px;
    }

    .tickets-list.agent-list {
      max-height: calc(100vh - 380px);
    }

    .ticket-item {
      background-color: var(--color-bg-secondary);
      border-radius: 10px;
      padding: 16px;
      display: flex;
      gap: 16px;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      border: 1px solid transparent;
    }

    .ticket-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(51,49,67,0.05);
      border-color: var(--color-border);
    }

    .item-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--color-accent-mint);
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-heading);
      font-weight: bold;
      font-size: 15px;
      flex-shrink: 0;
    }

    .item-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user-display-name {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .status-badge {
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 12px;
      text-transform: capitalize;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
    }

    .status-badge.abierto {
      background-color: #EDF8F6;
      color: #2E9E7A;
      border-color: #C2EDE0;
    }

    .status-badge.en_progreso {
      background-color: #FFF3E0;
      color: #E07B00;
      border-color: #FFE0B2;
    }

    .status-badge.transferido {
      background-color: #E3F2FD;
      color: #1565C0;
      border-color: #BBDEFB;
    }

    .status-badge.reabierto {
      background-color: #FCE4EC;
      color: #C2185B;
      border-color: #F8BBD0;
    }

    .status-badge.resuelto {
      background-color: #F5F5F5;
      color: #616161;
      border-color: #E0E0E0;
    }

    .status-badge.cerrado {
      background-color: #ECEFF1;
      color: #37474F;
      border-color: #CFD8DC;
    }

    .card-priority-dot-indicator {
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .card-priority-dot-indicator.baja {
      background-color: #F1F8E9;
      color: #558B2F;
      border: 1px solid #DCEDC8;
    }
    .card-priority-dot-indicator.baja .priority-bullet {
      color: #7CB342;
      font-size: 14px;
      line-height: 1;
    }
    .card-priority-dot-indicator.media {
      background-color: #FFFDE7;
      color: #F57F17;
      border: 1px solid #FFF9C4;
    }
    .card-priority-dot-indicator.media .priority-bullet {
      color: #FBC02D;
      font-size: 14px;
      line-height: 1;
    }
    .card-priority-dot-indicator.alta {
      background-color: #FFF3E0;
      color: #E65100;
      border: 1px solid #FFE0B2;
    }
    .card-priority-dot-indicator.alta .priority-bullet {
      color: #FB8C00;
      font-size: 14px;
      line-height: 1;
    }
    .card-priority-dot-indicator.critica {
      background-color: #FFEBEE;
      color: #C62828;
      border: 1px solid #FFCDD2;
    }
    .card-priority-dot-indicator.critica .priority-bullet {
      color: #E53935;
      font-size: 14px;
      line-height: 1;
    }

    .item-meta-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: -2px;
    }

    .date-text {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-muted);
    }

    .time-elapsed-pill {
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 600;
      background-color: var(--color-accent-teal);
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
    }

    .body-preview {
      font-family: var(--font-body);
      font-size: 13px;
      line-height: 1.5;
      color: var(--color-text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 4px 0;
    }

    .item-tags-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .item-tag-chip {
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 2px 8px;
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
    }

    .attachment-indicator {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 600;
      color: #0288D1;
      background-color: #E1F5FE;
      border: 1px solid #B3E5FC;
      padding: 2px 10px;
      border-radius: 12px;
    }

    .empty-state {
      padding: 48px;
      text-align: center;
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .empty-state .material-icons {
      font-size: 48px;
      color: var(--color-border);
    }

    .empty-state p {
      font-family: var(--font-body);
      font-size: 14px;
    }

    /* Ticket Detail Styles */
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-button);
      padding: 8px 16px;
      font-family: var(--font-heading);
      font-weight: 600;
      color: var(--color-text-primary);
      cursor: pointer;
      transition: background-color 0.2s ease;
      outline: none;
    }

    .back-btn:hover {
      background-color: var(--color-bg-secondary);
    }

    .detail-actions {
      display: flex;
      gap: 12px;
    }

    .edit-btn {
      background: transparent;
      border: 1px solid var(--color-accent-teal);
      color: var(--color-accent-teal);
      border-radius: var(--radius-button);
      padding: 8px 16px;
      font-family: var(--font-heading);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
      outline: none;
    }

    .edit-btn:hover {
      background-color: var(--color-accent-mint);
    }

    .edit-limit-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background-color: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
      padding: 8px 16px;
      border-radius: var(--radius-button);
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 13px;
    }

    .edit-limit-badge .info-icon {
      font-size: 18px;
      color: var(--color-accent-teal);
    }

    .detail-body {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .detail-info-row {
      display: flex;
      gap: 32px;
      flex-wrap: wrap;
    }

    .info-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .info-label {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .info-value {
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: bold;
      color: var(--color-text-primary);
    }

    .priority-badge {
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: bold;
      padding: 4px 12px;
      border-radius: 12px;
      width: fit-content;
      text-transform: capitalize;
    }

    .priority-badge.baja { background-color: #EDF8F6; color: #2E9E7A; }
    .priority-badge.media { background-color: #FFF8E6; color: #9A7A00; }
    .priority-badge.alta { background-color: #FFF3E0; color: #E65100; }
    .priority-badge.critica { background-color: #FDF2F2; color: var(--color-error); }

    .detail-description-section h4, .detail-attachments-section h4 {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 8px;
    }

    .description-text {
      font-family: var(--font-body);
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-primary);
      background-color: var(--color-bg-secondary);
      padding: 16px;
      border-radius: var(--radius-input);
      border: 1px solid var(--color-border);
      white-space: pre-wrap;
    }

    .attachments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
    }

    .attachment-file-card {
      background-color: var(--color-bg-primary);
      border: 1.5px solid var(--color-border);
      border-radius: 8px;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .attachment-file-card span.material-icons {
      color: var(--color-accent-teal);
    }

    .attachment-file-card span.file-name {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Inline Editing Styling */
    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: var(--color-bg-secondary);
      padding: 24px;
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border);
    }

    .edit-textarea {
      height: 140px;
      background: white;
    }

    .edit-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .cancel-btn-edit {
      height: 40px;
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-button);
      color: var(--color-text-muted);
      font-family: var(--font-body);
      padding: 0 20px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .cancel-btn-edit:hover {
      background-color: rgba(0,0,0,0.03);
    }

    .save-btn {
      height: 40px;
      background-color: var(--color-success);
      color: white;
      border: none;
      border-radius: var(--radius-button);
      font-family: var(--font-heading);
      font-weight: 600;
      padding: 0 24px;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .save-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Messages / Message History Thread Section */
    .comments-section {
      margin-top: 32px;
      border-top: 1px solid var(--color-border);
      padding-top: 24px;
    }

    .comments-section h3 {
      font-family: var(--font-heading);
      font-size: 16px;
      color: var(--color-text-primary);
      margin-bottom: 16px;
    }

    .comments-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 24px;
      padding-right: 8px;
    }

    .comment-item {
      background-color: var(--color-bg-secondary);
      border-radius: var(--radius-input);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid var(--color-border);
      max-width: 85%;
    }

    .comment-item.user {
      align-self: flex-start;
      border-left: 3px solid var(--color-accent-teal);
    }

    .comment-item.agent {
      align-self: flex-end;
      background-color: #EBF4FD;
      border-color: #B2D4FC;
      border-right: 3px solid var(--bot-blue);
    }

    .comment-header {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--color-text-muted);
      gap: 16px;
    }

    .comment-sender {
      font-weight: bold;
      font-family: var(--font-heading);
    }

    .comment-body {
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-primary);
      line-height: 1.5;
      white-space: pre-wrap;
    }

    .add-comment-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .add-comment-form textarea {
      height: 120px;
      padding: 10px;
    }

    .comment-submit-btn {
      align-self: flex-end;
      height: 38px;
      background-color: var(--color-accent-teal);
      color: white;
      border: none;
      border-radius: var(--radius-button);
      padding: 0 20px;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .comment-submit-btn:hover:not(:disabled) {
      background-color: var(--color-accent-teal-hover);
    }

    .comment-submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .admin-controls-card {
      background-color: var(--color-bg-secondary);
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-card);
      padding: 20px;
      margin-top: 10px;
    }

    .admin-controls-card h4 {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 12px;
      margin-top: 0;
    }

    .admin-controls-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .admin-control-group {
      flex: 1;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .admin-control-group label {
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .admin-control-group select {
      height: 40px;
      padding: 0 12px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-input);
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--color-text-primary);
      outline: none;
      background-color: white;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .admin-control-group select:focus {
      border-color: var(--color-accent-teal);
    }

    .admin-actions-toolbar {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .status-buttons-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .control-label {
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .btn-group {
      display: flex;
      gap: 8px;
    }

    .status-btn {
      height: 36px;
      padding: 0 16px;
      border: 1px solid var(--color-border);
      border-radius: 18px;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      background-color: white;
      transition: all 0.2s ease;
      color: var(--color-text-primary);
      outline: none;
    }

    .status-btn:hover {
      background-color: var(--color-bg-secondary);
      border-color: var(--color-accent-teal);
    }

    .status-btn.active {
      color: white;
      border-color: transparent;
      font-weight: 600;
    }

    .status-btn.btn-abierto.active {
      background-color: #2196F3;
    }

    .status-btn.btn-progreso.active {
      background-color: #FF9800;
    }

    .status-btn.btn-resuelto.active {
      background-color: #4CAF50;
    }

    .status-btn.btn-cerrado.active {
      background-color: #9E9E9E;
    }

    .status-btn.btn-reabierto.active {
      background-color: #E91E63;
    }

    .separator-v {
      width: 1px;
      height: 40px;
      background-color: var(--color-border);
      align-self: center;
    }

    .agent-stats-row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;
      margin-bottom: 24px;
      margin-top: 12px;
    }

    .stat-card {
      background: white;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
    }

    .stat-card .stat-label {
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-muted);
      font-weight: 500;
    }

    .stat-card .stat-value {
      font-family: var(--font-heading);
      font-size: 28px;
      font-weight: 700;
      line-height: 1;
    }

    /* Colors for values */
    .stat-card.total .stat-value { color: #37474F; }
    .stat-card.abiertos .stat-value { color: #2E9E7A; }
    .stat-card.progreso .stat-value { color: #E07B00; }
    .stat-card.reabiertos .stat-value { color: #C2185B; }
    .stat-card.transferidos .stat-value { color: #1565C0; }
    .stat-card.resueltos .stat-value { color: #455A64; }

    .agent-tabs-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      padding: 0 4px;
      width: 100%;
    }

    .agent-tabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      border: none;
      padding-bottom: 0;
      align-items: center;
    }

    .agent-tab-btn {
      padding: 6px 16px;
      border: 1px solid #E0E0E0;
      background: white;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      color: #546E7A;
      cursor: pointer;
      border-radius: 20px; /* Rounded pill style */
      transition: all 0.2s ease;
      outline: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .agent-tab-btn:hover {
      border-color: #B0BEC5;
      color: #37474F;
      background-color: #F5F7F8;
    }
    .agent-tab-btn.active {
      background-color: #2C2A38; /* Dark background matching screenshot */
      color: white;
      border-color: #2C2A38;
      font-weight: 600;
    }

    /* User Filters & Search Styles */
    .user-filters-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
      margin-bottom: 16px;
      background-color: var(--color-bg-secondary);
      padding: 10px 14px;
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border);
      animation: userFiltersFadeIn 0.3s ease-out;
    }

    @keyframes userFiltersFadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .user-search-bar {
      display: flex;
      align-items: center;
      background-color: var(--color-bg-primary);
      border: 1.5px solid var(--color-border);
      border-radius: 20px;
      padding: 0 12px;
      height: 34px;
      gap: 6px;
      transition: all 0.25s ease;
      position: relative;
      flex: 2;
      min-width: 250px;
    }

    .user-search-bar:focus-within {
      border-color: var(--color-accent-teal);
      box-shadow: 0 0 0 3px rgba(119, 194, 216, 0.1);
    }

    .user-search-bar input {
      border: none;
      background: transparent;
      outline: none;
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-primary);
      width: 100%;
    }

    .user-search-bar .search-icon {
      color: var(--color-text-muted);
      font-size: 18px;
    }

    .user-search-bar .clear-search-btn {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      border-radius: 50%;
      transition: background-color 0.2s;
    }

    .user-search-bar .clear-search-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: var(--color-text-primary);
    }

    .user-filter-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 3;
      flex-wrap: wrap;
    }

    .user-filter-controls .filter-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
      flex: 1;
      min-width: 160px;
    }

    .user-filter-controls label {
      font-size: 10px;
      font-weight: 700;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .user-filter-controls .select-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--color-bg-primary);
      border: 1.5px solid var(--color-border);
      border-radius: 6px;
      height: 32px;
      padding: 0 8px;
      transition: all 0.2s ease;
      flex: 1;
    }

    .user-filter-controls .select-wrapper:focus-within,
    .user-filter-controls .select-wrapper:hover {
      border-color: var(--color-accent-teal);
    }

    .user-filter-controls .select-icon {
      color: var(--color-text-muted);
      font-size: 16px;
      margin-right: 4px;
      pointer-events: none;
    }

    .user-filter-controls select {
      border: none;
      background: transparent;
      outline: none;
      font-family: var(--font-body);
      font-size: 12.5px;
      color: var(--color-text-primary);
      width: 100%;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      padding-right: 20px;
    }

    .user-filter-controls select option {
      background-color: var(--color-bg-primary);
      color: var(--color-text-primary);
      font-family: var(--font-body);
      font-size: 13px;
      padding: 8px;
    }

    .user-filter-controls .select-wrapper::after {
      content: 'expand_more';
      font-family: 'Material Icons';
      position: absolute;
      right: 8px;
      color: var(--color-text-muted);
      font-size: 16px;
      pointer-events: none;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.25s ease;
    }

    .user-filter-controls .select-wrapper:focus-within::after {
      transform: rotate(180deg);
      color: var(--color-accent-teal);
    }

    .user-filter-controls .clear-filters-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background-color: transparent;
      border: 1.5px solid var(--color-error);
      color: var(--color-error);
      padding: 0 12px;
      height: 32px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .user-filter-controls .clear-filters-btn:hover {
      background-color: var(--color-error);
      color: white;
    }

    .agent-search-bar {
      display: flex;
      align-items: center;
      background-color: #FAFAFA;
      border: 1.5px solid var(--color-border);
      border-radius: 20px; /* Fully rounded search input */
      padding: 0 16px;
      height: 40px;
      gap: 8px;
      transition: border-color 0.2s ease;
      width: 320px; /* Reasonable fixed width for the search bar */
      flex-shrink: 0;
    }
    .agent-search-bar:focus-within {
      border-color: var(--color-accent-teal);
    }
    .agent-search-bar input {
      border: none;
      background: transparent;
      outline: none;
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--color-text-primary);
      width: 100%;
    }
    .agent-search-bar .search-icon {
      color: var(--color-text-secondary);
      font-size: 20px;
    }

    .new-ticket-badge {
      background-color: var(--bot-orange);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-timestamp-info-row {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: var(--font-body);
    }
    .card-timestamp-info-row.reopened {
      background-color: #FFF0F5;
      color: #C71585;
    }
    .card-timestamp-info-row.closed {
      background-color: #E8F5E9;
      color: #2E7D32;
    }
    .card-timestamp-info-row.edited {
      background-color: #ECEFF1;
      color: #455A64;
    }

    .resolve-action-btn {
      background-color: var(--color-success);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background-color 0.2s, transform 0.1s;
      outline: none;
    }
    .resolve-action-btn:hover {
      background-color: #2E7D32;
    }
    .resolve-action-btn:active {
      transform: scale(0.97);
    }
    .ticket-resolved-badge-large {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--color-success);
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 600;
    }

    /* Modal Overlay Styles */
    .transfer-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(4px);
    }
    
    .transfer-modal-container {
      background-color: #ffffff;
      width: 600px;
      max-width: 95%;
      max-height: 95vh;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      padding: 20px;
      display: flex;
      flex-direction: column;
      font-family: 'DM Sans', sans-serif;
      box-sizing: border-box;
    }
    
    .transfer-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .transfer-modal-header h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1a202c;
      margin: 0;
    }
    
    .close-modal-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #718096;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border-radius: 50%;
      transition: background-color 0.2s;
    }
    
    .close-modal-btn:hover {
      background-color: #f7fafc;
      color: #2d3748;
    }
    
    .transfer-modal-subtitle {
      color: #718096;
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 12px;
      text-align: left;
    }
    
    .transfer-search-container {
      position: relative;
      margin-bottom: 12px;
    }
    
    .transfer-search-container .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #a0aec0;
      font-size: 18px;
    }
    
    .transfer-search-container input {
      width: 100%;
      padding: 8px 12px 8px 36px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }
    
    .transfer-search-container input:focus {
      border-color: #3182ce;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
    }
    
    .transfer-tags-container {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    
    .tag-chip-btn {
      background-color: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 5px 12px;
      font-size: 12px;
      font-weight: 500;
      color: #4a5568;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .tag-chip-btn:hover {
      background-color: #edf2f7;
      color: #2d3748;
    }
    
    .tag-chip-btn.active {
      background-color: #1a202c;
      color: #ffffff;
      border-color: #1a202c;
    }
    
    .status-filters-container {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 13px;
    }
    
    .status-filter-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 6px;
      color: #718096;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    
    .status-filter-btn:hover {
      background-color: #f7fafc;
    }
    
    .status-filter-btn.active {
      background-color: #edf2f7;
      color: #2d3748;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    
    .status-dot.green {
      background-color: #48bb78;
    }
    
    .status-dot.gray {
      background-color: #a0aec0;
    }
    
    .transfer-agents-list {
      flex: 1;
      overflow-y: auto;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      margin-bottom: 12px;
      max-height: 120px;
      min-height: 90px;
    }
    
    .agent-transfer-row {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      border-bottom: 1px solid #f7fafc;
      transition: background-color 0.2s;
    }
    
    .agent-transfer-row:last-child {
      border-bottom: none;
    }
    
    .agent-transfer-row:hover {
      background-color: #f7fafc;
    }
    
    .agent-transfer-row.selected {
      background-color: #ebf8ff;
    }
    
    .agent-transfer-row.disabled {
      cursor: not-allowed;
      opacity: 0.65;
    }
    
    .agent-avatar-circle {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: #2d3748;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      position: relative;
      margin-right: 12px;
    }
    
    .avatar-status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      position: absolute;
      bottom: 0px;
      right: 0px;
      background-color: #a0aec0;
    }
    
    .avatar-status-dot.online {
      background-color: #48bb78;
    }
    
    .agent-info-col {
      display: flex;
      flex-direction: column;
      flex: 1;
      text-align: left;
    }
    
    .agent-name-text {
      font-size: 15px;
      font-weight: 600;
      color: #2d3748;
    }
    
    .agent-spec-text {
      font-size: 13px;
      color: #718096;
      margin-top: 2px;
    }
    
    .agent-chats-col {
      display: flex;
      align-items: center;
    }
    
    .active-chats-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #718096;
      font-size: 14px;
    }
    
    .active-chats-badge .chat-icon {
      font-size: 18px;
    }
    
    .no-available-text {
      color: #a0aec0;
      font-size: 14px;
      font-style: italic;
    }
    
    .empty-agents-message {
      padding: 30px;
      text-align: center;
      color: #718096;
      font-size: 15px;
    }
    
    .transfer-reason-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 24px;
      text-align: left;
    }
    
    .reason-label {
      font-size: 14px;
      font-weight: 600;
      color: #4a5568;
    }
    
    .transfer-reason-container textarea {
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      font-family: inherit;
      font-size: 14px;
      outline: none;
      resize: none;
      height: 65px;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    
    .transfer-reason-container textarea:focus {
      border-color: #3182ce;
    }
    
    .transfer-modal-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #edf2f7;
    }
    
    .selected-agent-indicator {
      font-size: 14px;
      color: #718096;
    }
    
    .modal-buttons-group {
      display: flex;
      gap: 12px;
    }
    
    .cancel-modal-btn {
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      color: #4a5568;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .cancel-modal-btn:hover {
      background-color: #f7fafc;
    }
    
    .confirm-transfer-btn {
      background-color: #3182ce;
      border: none;
      border-radius: 12px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background-color 0.2s;
    }
    
    .confirm-transfer-btn:hover {
      background-color: #2b6cb0;
    }
    
    .confirm-transfer-btn:disabled {
      background-color: #cbd5e0;
      cursor: not-allowed;
    }
    
    .transfer-modal-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 500;
      color: #4a5568;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .transfer-action-btn {
      background-color: #0288D1;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background-color 0.2s, transform 0.1s;
      outline: none;
    }
    .transfer-action-btn:hover {
      background-color: #0277BD;
    }
    .transfer-action-btn:active {
      transform: scale(0.97);
    }
    
    .transfer-modal-btn:hover {
      background-color: #f7fafc;
      border-color: #cbd5e0;
    }
    
    .transfer-modal-btn .material-icons {
      font-size: 18px;
    }

    /* Popups and distinct alerts styles */
    .success-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(51, 49, 67, 0.6);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.25s ease-out;
    }

    .success-dialog {
      background-color: var(--color-bg-primary, #fff);
      padding: 32px;
      border-radius: 16px;
      width: 90%;
      max-width: 450px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .success-icon {
      font-size: 54px;
      color: var(--color-success, #2E9E7A);
    }

    .success-dialog h4 {
      margin: 0;
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .clarification-text {
      margin: 0;
      font-family: var(--font-body);
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }

    .success-actions {
      margin-top: 8px;
      width: 100%;
    }

    .success-actions .accept-btn {
      width: 100%;
      height: 44px;
      background-color: var(--color-accent-teal);
      color: white;
      border: none;
      border-radius: var(--radius-button, 8px);
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .success-actions .accept-btn:hover {
      background-color: var(--color-accent-teal-hover);
    }

    /* System notifications in message history thread */
    .system-comment-notice {
      align-self: center;
      background-color: #E3F2FD;
      border: 1px solid #BBDEFB;
      border-radius: 8px;
      padding: 10px 16px;
      color: #0D47A1;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      max-width: 90%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      box-sizing: border-box;
    }

    .comment-time-system {
      font-size: 10px;
      color: #1565C0;
      margin-left: auto;
      flex-shrink: 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .status-badge.unread-response-badge {
      background-color: rgba(64, 141, 243, 0.15) !important;
      color: var(--bot-blue) !important;
      border: 1.5px solid rgba(64, 141, 243, 0.3) !important;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 !important;
      width: 22px;
      height: 22px;
      border-radius: 50% !important;
      animation: heartbeat 1.5s infinite ease-in-out;
    }

    @keyframes heartbeat {
      0% {
        transform: scale(1);
      }
      14% {
        transform: scale(1.2);
      }
      28% {
        transform: scale(1);
      }
      42% {
        transform: scale(1.2);
      }
      70% {
        transform: scale(1);
      }
    }

    .toast-notification {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--bot-blue);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--shadow-bot-chat);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      max-width: 380px;
      transition: all 0.2s ease;
    }

    .toast-notification.chatbot-open {
      bottom: 600px;
    }

    .toast-notification:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(51, 49, 67, 0.25);
    }

    .toast-icon {
      color: var(--bot-blue);
      font-size: 24px;
      background-color: rgba(64, 141, 243, 0.1);
      padding: 8px;
      border-radius: 50%;
    }

    .toast-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-right: 8px;
    }

    .toast-title {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 13px;
      color: var(--color-text-primary);
    }

    .toast-text {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--color-text-muted);
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-muted);
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;
      margin-left: auto;
      flex-shrink: 0;
    }

    .toast-close:hover {
      background-color: var(--color-bg-secondary);
      color: var(--color-text-primary);
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    /* Resolve Confirmation Modal Styles */
    .confirm-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(51, 49, 67, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1001;
      backdrop-filter: blur(4px);
      animation: modalFadeIn 0.2s ease-out;
    }
    
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .confirm-modal-container {
      background-color: #ffffff;
      width: 380px;
      max-width: 90%;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(51, 49, 67, 0.15);
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      animation: modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid var(--color-border);
    }
    
    @keyframes modalScaleIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .confirm-modal-content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    
    .confirm-modal-icon {
      font-size: 48px;
      color: var(--color-success);
      background-color: rgba(76, 175, 130, 0.1);
      padding: 12px;
      border-radius: 50%;
    }
    
    .confirm-modal-content h3 {
      font-size: 20px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0;
      font-family: var(--font-heading);
    }
    
    .confirm-modal-content p {
      font-size: 13.5px;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin: 0;
      font-family: var(--font-body);
    }
    
    .confirm-modal-actions {
      display: flex;
      gap: 12px;
      width: 100%;
      margin-top: 8px;
    }
    
    .confirm-modal-actions button {
      flex: 1;
      height: 40px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 13.5px;
      font-family: var(--font-heading);
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      outline: none;
    }
    
    .confirm-modal-actions .cancel-confirm-btn {
      background-color: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
    }
    
    .confirm-modal-actions .cancel-confirm-btn:hover {
      background-color: var(--color-border);
    }
    
    .confirm-modal-actions .accept-confirm-btn {
      background-color: var(--color-success);
      color: white;
      box-shadow: 0 4px 12px rgba(76, 175, 130, 0.25);
    }
    
    .confirm-modal-actions .accept-confirm-btn:hover {
      background-color: #3e966e;
      box-shadow: 0 6px 16px rgba(76, 175, 130, 0.35);
      transform: translateY(-1px);
    }
    
    .confirm-modal-actions .accept-confirm-btn:active {
      transform: translateY(0);
    }

    /* KB Shortcut button and action row */
    .comment-actions-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 8px;
    }

    .kb-shortcut-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 36px;
      padding: 0 16px;
      border-radius: 18px;
      border: 1px solid var(--color-border);
      background-color: var(--color-bg-primary);
      color: var(--color-text-muted);
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
    }

    .kb-shortcut-btn:hover {
      background-color: var(--color-bg-secondary);
      border-color: var(--color-accent-teal);
      color: var(--color-accent-teal);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    }

    .kb-shortcut-btn:active {
      transform: translateY(0);
    }

    /* KB Popup Styles */
    .kb-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(51, 49, 67, 0.45);
      backdrop-filter: blur(6px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: modalFadeIn 0.2s ease-out;
    }

    .kb-popup-container {
      background-color: var(--color-bg-primary);
      border-radius: var(--radius-card);
      width: 850px;
      max-width: 95%;
      height: 550px;
      max-height: 90vh;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .kb-popup-header {
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-border);
    }

    .kb-popup-header h3 {
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0;
    }

    .kb-popup-body-split {
      display: grid;
      grid-template-columns: 350px 1fr;
      flex: 1;
      overflow: hidden;
    }

    .kb-popup-left-panel {
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      background-color: var(--color-bg-secondary);
      overflow: hidden;
    }

    .kb-popup-search-wrapper {
      padding: 16px;
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--color-bg-primary);
      border-bottom: 1px solid var(--color-border);
    }

    .kb-popup-search-wrapper .search-icon {
      position: absolute;
      left: 28px;
      color: var(--color-text-muted);
      font-size: 18px;
    }

    .kb-popup-search-wrapper input {
      width: 100%;
      height: 38px;
      padding: 0 12px 0 36px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-input);
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-primary);
      background-color: var(--color-bg-secondary);
      outline: none;
      transition: all 0.2s ease;
    }

    .kb-popup-search-wrapper input:focus {
      border-color: var(--color-accent-teal);
      background-color: var(--color-bg-primary);
      box-shadow: 0 0 0 3px rgba(119, 194, 216, 0.1);
    }

    .kb-popup-navigation-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .kb-popup-right-panel {
      display: flex;
      flex-direction: column;
      background-color: var(--color-bg-primary);
      overflow: hidden;
    }

    /* FAQ Preview Card inside popup */
    .kb-faq-preview-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    }

    .kb-faq-preview-card .preview-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
      text-align: left;
    }

    .kb-faq-preview-card .preview-header h4 {
      font-family: var(--font-heading);
      font-size: 17px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0;
      line-height: 1.4;
      text-align: left;
    }

    .kb-faq-preview-card .preview-category-path {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
      text-align: left;
    }

    .kb-faq-preview-card .preview-tags-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .kb-faq-preview-card .preview-divider {
      height: 1px;
      background-color: var(--color-border);
      margin-bottom: 16px;
    }

    .kb-faq-preview-card .preview-content-scroll {
      flex: 1;
      overflow-y: auto;
      margin-bottom: 20px;
      padding-right: 8px;
    }

    .kb-faq-preview-card .preview-answer-text {
      font-family: var(--font-body);
      font-size: 13.5px;
      line-height: 1.6;
      color: var(--color-text-primary);
      white-space: pre-wrap;
      margin: 0;
      text-align: left;
    }

    .kb-faq-preview-card .preview-footer-actions {
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid var(--color-border);
      padding-top: 16px;
    }

    .insert-response-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
      padding: 0 20px;
      background-color: var(--color-accent-teal);
      color: white;
      border: none;
      border-radius: 20px;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(119, 194, 216, 0.25);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .insert-response-btn:hover {
      background-color: var(--color-accent-teal-hover);
      box-shadow: 0 6px 16px rgba(119, 194, 216, 0.35);
      transform: translateY(-1px);
    }

    .insert-response-btn:active {
      transform: translateY(0);
    }

    .kb-faq-preview-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      gap: 12px;
      color: var(--color-text-muted);
      padding: 40px;
      text-align: center;
    }

    .kb-faq-preview-empty .empty-icon {
      font-size: 44px;
      color: var(--color-accent-teal);
      opacity: 0.5;
    }

    .kb-faq-preview-empty p {
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 500;
      margin: 0;
    }

    /* KB tree styles inside popup */
    .kb-popup-left-panel .category-node {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .kb-popup-left-panel .category-item-row {
      display: flex;
      align-items: center;
      height: 34px;
      padding: 0 8px;
      border-radius: var(--radius-input);
      cursor: pointer;
      transition: background-color 0.15s ease;
      user-select: none;
    }

    .kb-popup-left-panel .category-item-row:hover {
      background-color: var(--color-bg-primary);
    }

    .kb-popup-left-panel .expand-arrow {
      font-size: 18px;
      color: var(--color-text-muted);
      transition: transform 0.2s ease;
      margin-right: 4px;
    }

    .kb-popup-left-panel .expand-arrow.rotated {
      transform: rotate(90deg);
    }

    .kb-popup-left-panel .folder-icon {
      font-size: 18px;
      color: var(--color-accent-teal);
      margin-right: 8px;
    }

    .kb-popup-left-panel .category-name-text {
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text-primary);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }

    .kb-popup-left-panel .category-count-badge {
      font-family: var(--font-heading);
      font-size: 10px;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-left: 8px;
    }

    .kb-popup-left-panel .faq-leaf-row {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 10px;
      border-radius: var(--radius-input);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .kb-popup-left-panel .faq-leaf-row:hover {
      background-color: var(--color-bg-primary);
    }

    .kb-popup-left-panel .faq-leaf-row.active {
      background-color: rgba(119, 194, 216, 0.12);
    }

    .kb-popup-left-panel .leaf-doc-icon {
      font-size: 16px;
      color: var(--color-text-muted);
      opacity: 0.6;
      margin-right: 8px;
    }

    .kb-popup-left-panel .faq-leaf-row.active .leaf-doc-icon {
      color: var(--color-accent-teal-hover);
      opacity: 1;
    }

    .kb-popup-left-panel .faq-leaf-title {
      font-family: var(--font-body);
      font-size: 12.5px;
      color: var(--color-text-muted);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }

    .kb-popup-left-panel .faq-leaf-row.active .faq-leaf-title {
      color: var(--color-text-primary);
      font-weight: 500;
    }

    /* Flat Search Results List styling in popup */
    .kb-popup-left-panel .search-results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--color-border);
    }

    .kb-popup-left-panel .results-title {
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .kb-popup-left-panel .results-count {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
    }

    .kb-popup-left-panel .search-results-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
    }

    .kb-popup-left-panel .search-faq-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 10px;
      border-radius: var(--radius-input);
      cursor: pointer;
      transition: all 0.15s ease;
      background-color: var(--color-bg-primary);
    }

    .kb-popup-left-panel .search-faq-item:hover {
      background-color: rgba(119, 194, 216, 0.05);
    }

    .kb-popup-left-panel .search-faq-item.active {
      background-color: rgba(119, 194, 216, 0.12);
    }

    .kb-popup-left-panel .doc-icon {
      font-size: 18px;
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    .kb-popup-left-panel .search-faq-item.active .doc-icon {
      color: var(--color-accent-teal);
    }

    .kb-popup-left-panel .search-faq-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
      text-align: left;
    }

    .kb-popup-left-panel .search-faq-title {
      font-family: var(--font-body);
      font-size: 12.5px;
      font-weight: 500;
      color: var(--color-text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kb-popup-left-panel .search-faq-path {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kb-popup-left-panel .empty-search-state {
      padding: 30px 10px;
      text-align: center;
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .kb-popup-left-panel .empty-search-state .material-icons {
      font-size: 28px;
      opacity: 0.5;
    }

    .kb-popup-left-panel .empty-search-state p {
      font-size: 12px;
      margin: 0;
    }
  `]
})

export class TicketsTabComponent implements OnInit {
  private ticketService = inject(TicketService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);
  private pollingSub?: Subscription;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private initialViewDecided = signal(false);

  @ViewChild('commentsList') commentsList?: ElementRef<HTMLDivElement>;

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.commentsList) {
        try {
          const element = this.commentsList.nativeElement;
          element.scrollTop = element.scrollHeight;
        } catch (err) {
          console.error('Error scrolling to bottom:', err);
        }
      }
    }, 100);
  }

  previousListMode = signal<'list' | 'archived'>('list');
  isChatOpen = computed(() => this.ticketService.isChatOpen());

  // KB shortcut popup state & methods
  showKbPopup = signal<boolean>(false);
  kbFaqs = signal<Faq[]>([]);
  kbSearchQuery = signal<string>('');
  kbSelectedFaq = signal<Faq | null>(null);

  kbCategoryTree = computed<any[]>(() => {
    return this.buildKbCategoryTree(this.kbFaqs());
  });

  kbFilteredFaqs = computed<Faq[]>(() => {
    const query = this.kbSearchQuery().toLowerCase().trim();
    const all = this.kbFaqs();
    if (!query) return [];

    return all.filter(faq => {
      const matchQuestion = faq.questions.toLowerCase().includes(query);
      const matchAnswer = faq.answers.toLowerCase().includes(query);
      const matchLabel = faq.label.toLowerCase().includes(query);
      const matchTags = faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(query));
      return matchQuestion || matchAnswer || matchLabel || matchTags;
    });
  });

  openKbPopup(): void {
    const token = sessionStorage.getItem('hsi_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Faq[]>('/api/faqs', { headers }).subscribe({
      next: (data) => {
        this.kbFaqs.set(data);
        this.kbSearchQuery.set('');
        this.kbSelectedFaq.set(null);
        this.showKbPopup.set(true);
      },
      error: (err) => {
        console.error('Error loading FAQs for ticket reply shortcut:', err);
      }
    });
  }

  closeKbPopup(): void {
    this.showKbPopup.set(false);
    this.kbSelectedFaq.set(null);
    this.kbSearchQuery.set('');
  }

  selectKbFaq(faq: Faq): void {
    this.kbSelectedFaq.set(faq);
  }

  insertKbAnswer(faq: Faq): void {
    const textToInsert = faq.questions + '\n' + faq.answers;
    if (this.newCommentText.trim()) {
      this.newCommentText += '\n\n' + textToInsert;
    } else {
      this.newCommentText = textToInsert;
    }
    this.closeKbPopup();
  }

  toggleKbNode(node: any): void {
    node.isExpanded = !node.isExpanded;
  }

  private buildKbCategoryTree(faqs: Faq[]): any[] {
    const root: any[] = [];

    faqs.forEach(faq => {
      const parts = faq.label.split('/').map(s => s.trim()).filter(Boolean);
      if (parts.length === 0) return;

      let currentLevel = root;
      let pathAccumulator = '';

      parts.forEach((part, index) => {
        pathAccumulator = pathAccumulator ? `${pathAccumulator} / ${part}` : part;
        const isLast = index === parts.length - 1;

        let node = currentLevel.find(n => n.name === part);
        if (!node) {
          node = {
            name: part,
            fullName: pathAccumulator,
            subcategories: [],
            faqs: [],
            isExpanded: false,
            totalCount: 0
          };
          currentLevel.push(node);
        }

        if (isLast) {
          node.faqs.push(faq);
        }

        currentLevel = node.subcategories;
      });
    });

    const calculateCounts = (nodes: any[]): number => {
      let count = 0;
      nodes.forEach(node => {
        const subCount = calculateCounts(node.subcategories);
        node.totalCount = node.faqs.length + subCount;
        count += node.totalCount;
      });
      return count;
    };

    calculateCounts(root);
    return root;
  }
  archivedTicketIds = signal<string[]>([]);
  showResolveConfirmModal = signal(false);
  ticketToResolveId = signal('');

  activeTickets = computed(() => {
    const all = this.ticketService.tickets();
    const archivedIds = this.archivedTicketIds();
    const role = this.currentUserRole();
    const currentUserId = this.currentUserId();
    return all.filter(t => {
      if (t.status === 'resuelto' && archivedIds.includes(t.id)) {
        if (role !== 'user') {
          return t.assigned_to !== currentUserId;
        }
        return false;
      }
      return true;
    });
  });

  readTicketIds = signal<string[]>([]);
  selectedStatusFilter = signal<'todos' | 'abierto' | 'en_progreso' | 'reabierto' | 'transferido' | 'resuelto'>('todos');
  searchQuery = signal<string>('');

  // User filter signals
  userSort = signal<'recent' | 'oldest' | 'priority' | 'alphabetical'>('recent');
  userStatusFilter = signal<'all' | 'no_response' | 'in_progress' | 'open' | 'resolved'>('all');
  userTagFilter = signal<string>('all');

  userTags = computed(() => {
    const role = this.currentUserRole();
    if (role !== 'user') return [];

    const all = this.ticketService.tickets();
    const archivedIds = this.archivedTicketIds();
    const isArchivedMode = this.innerViewMode() === 'archived';

    // Collect tags from tickets that belong to the current list view (active vs archived)
    const relevantTickets = all.filter(t => {
      const isArchived = t.status === 'resuelto' && archivedIds.includes(t.id);
      return isArchivedMode ? isArchived : !isArchived;
    });

    const tagsSet = new Set<string>();
    for (const t of relevantTickets) {
      if (t.tags) {
        for (const tag of t.tags) {
          tagsSet.add(tag);
        }
      }
    }

    const uniqueTags: string[] = [];
    const seen = new Set<string>();
    for (const tag of tagsSet) {
      const cleaned = this.cleanTagName(tag);
      if (!seen.has(cleaned)) {
        seen.add(cleaned);
        uniqueTags.push(tag);
      } else {
        const index = uniqueTags.findIndex(t => this.cleanTagName(t) === cleaned);
        if (index !== -1 && tag.includes('ó') && !uniqueTags[index].includes('ó')) {
          uniqueTags[index] = tag;
        }
      }
    }
    return uniqueTags.sort((a, b) => a.localeCompare(b));
  });

  hasActiveUserFilters = computed(() => {
    const isArchived = this.innerViewMode() === 'archived';
    return this.searchQuery() !== '' ||
      this.userSort() !== 'recent' ||
      (!isArchived && this.userStatusFilter() !== 'all') ||
      this.userTagFilter() !== 'all';
  });

  clearUserFilters(): void {
    this.searchQuery.set('');
    this.userSort.set('recent');
    this.userStatusFilter.set('all');
    this.userTagFilter.set('all');
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  lastSeenMessageTimes = signal<{ [ticketId: string]: string }>({});
  get toastMessage() { return this.ticketService.toastMessage; }
  get toastTicketId() { return this.ticketService.toastTicketId; }
  notifiedMessageIds = new Set<string>();

  systemTags = signal<any[]>([]);

  // Transfer modal signals
  showTransferModal = signal(false);
  ticketToTransfer = signal<Ticket | null>(null);
  transferSearchQuery = signal('');
  selectedSpecializationFilter = signal('Todos');
  onlineStatusFilter = signal<'todos' | 'online' | 'offline'>('todos');
  selectedTransferAgentId = signal('');
  transferReason = signal('');

  availableSpecializations = computed(() => {
    const list = this.systemTags().map(t => t.name);
    // Combine 'Acceso' and 'Autenticación' if both are in list to match screenshot
    const hasAcceso = list.some(t => t.toLowerCase() === 'acceso');
    const hasAutenticacion = list.some(t => t.toLowerCase() === 'autenticación' || t.toLowerCase() === 'autenticacion');
    let filtered = list.filter(t => t.toLowerCase() !== 'acceso' && t.toLowerCase() !== 'autenticación' && t.toLowerCase() !== 'autenticacion');
    if (hasAcceso || hasAutenticacion) {
      filtered = ['Acceso y Autenticación', ...filtered];
    }
    return filtered;
  });

  filteredAgentsForTransfer = computed(() => {
    const query = this.transferSearchQuery().toLowerCase().trim();
    const specFilter = this.selectedSpecializationFilter();
    const statusFilter = this.onlineStatusFilter();

    return this.agentsList().filter(agent => {
      // 1. Text Search Filter
      const name = `${agent.first_name} ${agent.last_name}`.toLowerCase();
      const spec = (agent.specialization || '').toLowerCase();
      const matchesSearch = !query || name.includes(query) || spec.includes(query);

      // 2. Specialization Chip Filter
      let matchesSpec = true;
      if (specFilter !== 'Todos') {
        if (specFilter === 'Acceso y Autenticación') {
          matchesSpec = agent.specialization === 'Acceso' || agent.specialization === 'Autenticación' || agent.specialization === 'Acceso y Autenticación';
        } else {
          matchesSpec = agent.specialization === specFilter;
        }
      }

      // 3. Online/Offline Status Filter
      let matchesStatus = true;
      if (statusFilter === 'online') {
        matchesStatus = agent.is_active === true;
      } else if (statusFilter === 'offline') {
        matchesStatus = agent.is_active === false;
      }

      return matchesSearch && matchesSpec && matchesStatus;
    });
  });

  isTransferDisabled = computed(() => {
    const agentId = this.selectedTransferAgentId();
    const reason = this.transferReason().trim();

    // Disabled if no agent selected, or reason is less than 4 chars
    if (!agentId || reason.length < 4) {
      return true;
    }

    // Also disable if the selected agent is not active (offline)
    const agent = this.agentsList().find(a => a.id === agentId);
    return !agent || !agent.is_active;
  });

  // Agent dynamic statistics cards
  statsTotal = computed(() => this.activeTickets().length);
  statsAbiertos = computed(() => this.activeTickets().filter(t => t.status === 'abierto' && !t.assigned_to).length);
  statsProgreso = computed(() => {
    const currentUserId = this.currentUserId();
    return this.activeTickets().filter(t => t.status === 'en_progreso' && t.assigned_to === currentUserId).length;
  });
  statsReabiertos = computed(() => {
    const currentUserId = this.currentUserId();
    return this.activeTickets().filter(t => t.status === 'reabierto' && t.assigned_to === currentUserId).length;
  });
  statsTransferidos = computed(() => {
    const currentUserId = this.currentUserId();
    return this.activeTickets().filter(t => t.status === 'transferido' && t.assigned_to === currentUserId).length;
  });
  statsResueltos = computed(() => {
    const currentUserId = this.currentUserId();
    return this.activeTickets().filter(t => t.status === 'resuelto' && t.assigned_to === currentUserId).length;
  });


  @Output() ticketSelected = new EventEmitter<Ticket>();

  innerViewMode = signal<'create' | 'list' | 'detail' | 'archived'>('create');
  showInitialLoading = computed(() => {
    const user = this.authService.currentUser();
    const urlView = this.route.snapshot.queryParams['view'];
    return !!user && !urlView && !this.ticketService.ticketsLoaded() && !this.initialViewDecided();
  });

  selectedTicket = signal<Ticket | null>(null);
  currentUserRole = computed(() => this.authService.currentUser()?.role || '');
  currentUserId = computed(() => this.authService.currentUser()?.id || '');

  // Form controls
  ticketForm!: FormGroup;
  isSubmitting = signal(false);
  isDragOver = signal(false);

  // Autocomplete variables
  institutions = signal<Institution[]>([]);
  institutionQuery = signal('');

  filteredInstitutions = computed(() => {
    const q = this.institutionQuery().toLowerCase();
    const currentInst = this.institutions();
    if (!q) return currentInst;
    return currentInst.filter(opt => opt.name.toLowerCase().includes(q));
  });

  // Priority chip signal
  selectedPriority = signal<string>('Media');
  priorities = signal<Priority[]>([]);

  // Tag chips configurations
  availableTags = ['Acceso', 'Turnos', 'Historia Clínica', 'Facturación', 'Otro'];
  selectedTags = signal<string[]>([]);

  // Attached files list
  attachments = signal<string[]>([]);

  cleanTagName(str: string): string {
    return (str || '')
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  // Get active tickets list from service with custom sorting and filters
  ticketsList = computed(() => {
    const all = this.ticketService.tickets();
    const role = this.currentUserRole();
    const query = this.searchQuery().toLowerCase().trim();
    const filter = this.selectedStatusFilter();
    const currentUserId = this.authService.currentUser()?.id || '';

    if (this.innerViewMode() === 'archived') {
      const archivedIds = this.archivedTicketIds();
      let archivedFiltered = all.filter(t => t.status === 'resuelto' && archivedIds.includes(t.id));
      if (role !== 'user') {
        archivedFiltered = archivedFiltered.filter(t => t.assigned_to === currentUserId);
      }

      if (role === 'user') {
        if (query) {
          archivedFiltered = archivedFiltered.filter(t =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
          );
        }
        const tagFilter = this.userTagFilter();
        if (tagFilter !== 'all') {
          const cleanFilter = this.cleanTagName(tagFilter);
          archivedFiltered = archivedFiltered.filter(t =>
            t.tags.some(tag => this.cleanTagName(tag) === cleanFilter)
          );
        }

        const sortVal = this.userSort();
        return [...archivedFiltered].sort((a, b) => {
          if (sortVal === 'oldest') {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          } else if (sortVal === 'priority') {
            const getPriorityWeight = (prio: string) => {
              switch (prio) {
                case 'Crítica': return 4;
                case 'Alta': return 3;
                case 'Media': return 2;
                case 'Baja': return 1;
                default: return 0;
              }
            };
            const weightA = getPriorityWeight(a.priority);
            const weightB = getPriorityWeight(b.priority);
            if (weightA !== weightB) {
              return weightB - weightA;
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          } else {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
        });
      } else {
        if (query) {
          archivedFiltered = archivedFiltered.filter(t =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.institution.toLowerCase().includes(query)
          );
        }
        return [...archivedFiltered].sort((a, b) => {
          const dateA = a.updated_at ? new Date(a.updated_at).getTime() : new Date(a.created_at).getTime();
          const dateB = b.updated_at ? new Date(b.updated_at).getTime() : new Date(b.created_at).getTime();
          return dateB - dateA;
        });
      }
    }

    let filtered = this.activeTickets();

    if (role === 'user') {
      if (query) {
        filtered = filtered.filter(t =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
        );
      }

      const statusFilter = this.userStatusFilter();
      if (statusFilter === 'open') {
        filtered = filtered.filter(t => t.status === 'abierto');
      } else if (statusFilter === 'in_progress') {
        filtered = filtered.filter(t => t.status === 'en_progreso' || t.status === 'transferido' || t.status === 'reabierto');
      } else if (statusFilter === 'resolved') {
        filtered = filtered.filter(t => t.status === 'resuelto');
      }

      const tagFilter = this.userTagFilter();
      if (tagFilter !== 'all') {
        const cleanFilter = this.cleanTagName(tagFilter);
        filtered = filtered.filter(t =>
          t.tags.some(tag => this.cleanTagName(tag) === cleanFilter)
        );
      }

      const sortVal = this.userSort();
      return [...filtered].sort((a, b) => {
        if (sortVal === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        } else if (sortVal === 'priority') {
          const getPriorityWeight = (prio: string) => {
            switch (prio) {
              case 'Crítica': return 4;
              case 'Alta': return 3;
              case 'Media': return 2;
              case 'Baja': return 1;
              default: return 0;
            }
          };
          const weightA = getPriorityWeight(a.priority);
          const weightB = getPriorityWeight(b.priority);
          if (weightA !== weightB) {
            return weightB - weightA;
          }
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });
    } else {
      // Agent status tab filters
      if (filter === 'abierto') {
        filtered = filtered.filter(t => t.status === 'abierto' && !t.assigned_to);
      } else if (filter === 'en_progreso') {
        filtered = filtered.filter(t => t.assigned_to === currentUserId && t.status === 'en_progreso');
      } else if (filter === 'reabierto') {
        filtered = filtered.filter(t => t.assigned_to === currentUserId && t.status === 'reabierto');
      } else if (filter === 'transferido') {
        filtered = filtered.filter(t => t.assigned_to === currentUserId && t.status === 'transferido');
      } else if (filter === 'resuelto') {
        filtered = filtered.filter(t => t.assigned_to === currentUserId && t.status === 'resuelto');
      }

      // Search query filtering
      if (query) {
        filtered = filtered.filter(t =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.institution.toLowerCase().includes(query) ||
          t.user_id.toLowerCase().includes(query)
        );
      }
    }

    // Sort: Nuevo at the top, then abierto -> reabierto -> en_progreso/transferido -> resuelto/cerrado
    return [...filtered].sort((a, b) => {
      const getStatusScore = (t: Ticket) => {
        const isNew = role !== 'user' && this.isTicketNew(t);
        if (isNew) return 1;

        const hasResponse = this.hasUnreadResponse(t);
        if (hasResponse) return 2;

        switch (t.status) {
          case 'abierto': return 3;
          case 'reabierto': return 4;
          case 'en_progreso':
          case 'transferido': return 5;
          case 'resuelto': return 6;
          default: return 7;
        }
      };

      const scoreA = getStatusScore(a);
      const scoreB = getStatusScore(b);

      if (scoreA !== scoreB) {
        return scoreA - scoreB;
      }

      const dateA = a.updated_at ? new Date(a.updated_at).getTime() : new Date(a.created_at).getTime();
      const dateB = b.updated_at ? new Date(b.updated_at).getTime() : new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  });

  initReadTickets(userId: string): void {
    try {
      const stored = localStorage.getItem(`read_ticket_ids_${userId}`);
      if (stored) {
        this.readTicketIds.set(JSON.parse(stored));
      } else {
        const legacy = localStorage.getItem('read_ticket_ids');
        if (legacy) {
          this.readTicketIds.set(JSON.parse(legacy));
        } else {
          this.readTicketIds.set([]);
        }
      }
    } catch (e) {
      console.error('Error reading read_ticket_ids:', e);
      this.readTicketIds.set([]);
    }
  }

  initLastSeenTimes(userId: string): void {
    try {
      const stored = localStorage.getItem(`last_seen_message_times_${userId}`);
      if (stored) {
        this.lastSeenMessageTimes.set(JSON.parse(stored));
      } else {
        this.lastSeenMessageTimes.set({});
      }
    } catch (e) {
      console.error('Error reading last_seen_message_times:', e);
    }
  }

  markTicketMessagesAsSeen(ticketId: string, lastMsgTime: Date): void {
    const user = this.authService.currentUser();
    if (!user) return;

    // Check if the current user is the one who should see notifications for this ticket
    // If they are an agent but not the assigned agent, we don't need to mark it as read for them!
    const ticket = this.ticketService.tickets().find(t => t.id === ticketId);
    if (ticket) {
      const userRole = user.role;
      const isOwnerOrAssigned = (userRole === 'user' && ticket.user_id === user.username) ||
        (userRole !== 'user' && ticket.assigned_to === user.id);
      if (!isOwnerOrAssigned) {
        // If a curious agent is viewing a ticket that is not assigned to them, do not mark as seen
        return;
      }
    }

    const times = { ...this.lastSeenMessageTimes() };
    times[ticketId] = lastMsgTime.toISOString();
    this.lastSeenMessageTimes.set(times);
    try {
      localStorage.setItem(`last_seen_message_times_${user.id}`, JSON.stringify(times));
    } catch (e) {
      console.error('Error saving last_seen_message_times:', e);
    }
    // Also if this ticket is currently showing in the toast, clear the toast
    if (this.toastTicketId() === ticketId) {
      this.toastMessage.set(null);
      this.toastTicketId.set(null);
    }
  }

  hasUnreadResponse(ticket: Ticket): boolean {
    if (ticket.status === 'resuelto') return false;
    if (!ticket.messages || ticket.messages.length === 0) return false;

    const lastMsg = ticket.messages[ticket.messages.length - 1];
    const userRole = this.currentUserRole();
    const currentUserId = this.authService.currentUser()?.id || '';

    if (userRole === 'user') {
      // Regular user: any message not from 'user' is a response
      const isResponse = lastMsg.role !== 'user';
      if (!isResponse) return false;

      const lastSeen = this.lastSeenMessageTimes()[ticket.id];
      if (!lastSeen) return true;
      return new Date(lastMsg.created_at).getTime() > new Date(lastSeen).getTime();
    } else {
      // Agent/Support:
      // 1. "abierto" status does not carry "nueva respuesta" (it's handled by "nuevo" badge)
      if (ticket.status === 'abierto') return false;

      // 2. Must be assigned to the current agent
      if (!ticket.assigned_to || ticket.assigned_to !== currentUserId) return false;

      // 3. Last message must be from the user
      const isResponse = lastMsg.role === 'user';
      if (!isResponse) return false;

      const lastSeen = this.lastSeenMessageTimes()[ticket.id];
      if (!lastSeen) return true;
      return new Date(lastMsg.created_at).getTime() > new Date(lastSeen).getTime();
    }
  }

  goToTicketFromToast(): void {
    const ticketId = this.toastTicketId();
    if (ticketId) {
      const t = this.ticketService.tickets().find(x => x.id === ticketId);
      if (t) {
        this.onSelectTicket(t);
      }
    }
    this.toastMessage.set(null);
    this.toastTicketId.set(null);
  }

  closeToast(event: Event): void {
    event.stopPropagation();
    this.toastMessage.set(null);
    this.toastTicketId.set(null);
  }

  isTicketNew(ticket: Ticket): boolean {
    if (ticket.status !== 'abierto') return false;
    if (ticket.assigned_to) return false;
    if (this.isTicketRead(ticket.id)) return false;
    const hasAgentReply = ticket.messages?.some(m => m.role === 'agent') || false;
    return !hasAgentReply;
  }

  isTicketRead(ticketId: string): boolean {
    return this.readTicketIds().includes(ticketId);
  }

  markTicketAsRead(ticketId: string): void {
    const user = this.authService.currentUser();
    if (!user) return;

    if (!this.readTicketIds().includes(ticketId)) {
      const updated = [...this.readTicketIds(), ticketId];
      this.readTicketIds.set(updated);
      try {
        localStorage.setItem(`read_ticket_ids_${user.id}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving read_ticket_ids:', e);
      }
    }
  }

  // Inline editing signals
  isEditing = signal(false);
  editDescription = '';
  editPriority = 'Media';

  // Popups signals
  showCreateSuccess = signal(false);
  showReopenInfo = signal(false);
  showTransferSuccess = signal(false);

  // Comments signals
  newCommentText = '';
  isSendingComment = signal(false);
  ticketComments = computed(() => {
    const t = this.selectedTicket();
    return t ? t.messages || [] : [];
  });

  agentsList = signal<any[]>([]);

  constructor() {
    this.initForm();

    // Set initial view for agents immediately to avoid flash of user-only create form
    const user = this.authService.currentUser();
    const urlView = this.route.snapshot.queryParams['view'];
    if (user && !urlView) {
      if (user.role !== 'user') {
        this.innerViewMode.set('list');
        this.initialViewDecided.set(true);
      }
    }

    // Effect to scroll comments list to bottom when selected ticket or comments change
    effect(() => {
      this.selectedTicket();
      this.ticketComments();
      this.scrollToBottom();
    });

    // Load last seen times and archived tickets when user changes
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.initLastSeenTimes(user.id);
        this.initReadTickets(user.id);

        // Load user-scoped archived tickets (by username for database restart persistence)
        try {
          const usernameKey = `hsi_archived_tickets_${user.username}`;
          const savedArchived = localStorage.getItem(usernameKey);
          if (savedArchived) {
            this.archivedTicketIds.set(JSON.parse(savedArchived));
          } else {
            // Check for user ID-scoped archived tickets (previous version) to migrate
            const userIdKey = `hsi_archived_tickets_${user.id}`;
            const userIdArchived = localStorage.getItem(userIdKey);
            if (userIdArchived) {
              const ids = JSON.parse(userIdArchived);
              this.archivedTicketIds.set(ids);
              localStorage.setItem(usernameKey, userIdArchived);
            } else {
              // Check for legacy shared archived tickets to migrate/use
              const legacyArchived = localStorage.getItem('hsi_archived_tickets');
              if (legacyArchived) {
                const legacyIds = JSON.parse(legacyArchived);
                this.archivedTicketIds.set(legacyIds);
                // Migrate it to scoped
                localStorage.setItem(usernameKey, legacyArchived);
              } else {
                this.archivedTicketIds.set([]);
              }
            }
          }
        } catch (e) {
          console.error('Error reading archived tickets:', e);
          this.archivedTicketIds.set([]);
        }
      }
    });

    // Check for new responses and show toast notifications
    effect(() => {
      const tickets = this.ticketService.tickets();
      const user = this.authService.currentUser();
      if (!user || tickets.length === 0) return;



      let hasNewNotification = false;
      let toastMsg = '';
      let toastId = '';

      for (const t of tickets) {
        if (this.hasUnreadResponse(t)) {
          const lastMsg = t.messages![t.messages!.length - 1];
          // If we haven't notified about this message ID in this session yet, and we are not currently viewing it
          const sel = this.selectedTicket();
          const isCurrentlyViewing = sel && sel.id === t.id && this.innerViewMode() === 'detail';

          if (isCurrentlyViewing) {
            // Automatically mark as read if currently viewing
            this.markTicketMessagesAsSeen(t.id, new Date(lastMsg.created_at));
          } else if (!this.notifiedMessageIds.has(lastMsg.id)) {
            this.notifiedMessageIds.add(lastMsg.id);
            toastMsg = `El ticket "${t.title}" tiene un nuevo mensaje.`;
            toastId = t.id;
            hasNewNotification = true;
          }
        }
      }

      if (hasNewNotification) {
        this.toastMessage.set(toastMsg);
        this.toastTicketId.set(toastId);

        // Auto-close toast after 6 seconds
        setTimeout(() => {
          if (this.toastTicketId() === toastId) {
            this.toastMessage.set(null);
            this.toastTicketId.set(null);
          }
        }, 15000);
      }
    });

    //  // Periodic sync interval (5 seconds)
    // const intervalId = setInterval(() => {
    //   const user = this.authService.currentUser();
    //   if (user) {
    //     this.ticketService.loadTicketsForUser(user.username);

    //     // Also if in detail view, sync details
    //     const sel = this.selectedTicket();
    //     if (sel && this.innerViewMode() === 'detail') {
    //       this.ticketService.getTicketDetails(sel.id).subscribe({
    //         next: (updatedTicket) => {
    //           if (!this.isEditing()) {
    //             const parsed = {
    //               ...updatedTicket,
    //               created_at: new Date(updatedTicket.created_at),
    //               updated_at: new Date(updatedTicket.updated_at),
    //               closed_at: updatedTicket.closed_at ? new Date(updatedTicket.closed_at) : undefined,
    //               resolved_at: updatedTicket.resolved_at ? new Date(updatedTicket.resolved_at) : undefined,
    //               reopened_at: updatedTicket.reopened_at ? new Date(updatedTicket.reopened_at) : undefined,
    //               messages: updatedTicket.messages ? updatedTicket.messages.map((m: any) => ({
    //                 ...m,
    //                 created_at: new Date(m.created_at)
    //               })) : []
    //             };
    //             this.selectedTicket.set(parsed);
    //           }
    //         }
    //       });
    //     }
    //   }
    // }, 5000);

    // this.destroyRef.onDestroy(() => {
    //   clearInterval(intervalId);
    // });



    // Fetch agents list for all users to resolve agent names
    effect(() => {
      const role = this.currentUserRole();
      if (role && this.agentsList().length === 0) {
        this.ticketService.getAgents().subscribe({
          next: (agents) => this.agentsList.set(agents),
          error: (err) => console.error('Error loading agents:', err)
        });
      }
    });

    // Reactive initial view selection based on ticket loading
    effect(() => {
      const user = this.authService.currentUser();
      const loaded = this.ticketService.ticketsLoaded();
      const urlView = this.route.snapshot.queryParams['view'];

      if (user && loaded && !urlView && !this.initialViewDecided()) {
        this.initialViewDecided.set(true);
        if (user.role !== 'user') {
          this.setViewMode('list');
        } else {
          if (this.ticketService.tickets().length > 0) {
            this.setViewMode('list');
          } else {
            this.setViewMode('create');
          }
        }
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.loadInstitutions();
    this.loadPriorities();
    this.loadTags();

    this.route.queryParams.subscribe(params => {
      const view = params['view'];
      if (view === 'create') {
        this.setViewMode('create');
      } else if (view === 'archived') {
        this.setViewMode('archived');
      } else if (view === 'list') {
        this.setViewMode('list');
      }
    });

    const user = this.authService.currentUser();
    if (user) {
      // Disparamos la carga de tickets
      this.ticketService.loadTicketsForUser(user.username);
    }

    // 🕒 INICIO DEL POLLING SILENCIOSO (Cada 3 segundos)
    this.pollingSub = interval(3000).subscribe(() => {
      this.recargarMensajesSilencioso();
    });

    // 🧹 LIMPIEZA AUTOMÁTICA: Usamos tu destroyRef para apagar el reloj
    this.destroyRef.onDestroy(() => {
      if (this.pollingSub) {
        this.pollingSub.unsubscribe();
      }
    });
  }

  recargarMensajesSilencioso() {
    const sel = this.selectedTicket();

    if (sel && this.innerViewMode() === 'detail' && !this.isEditing() && !this.isSendingComment()) {
      this.ticketService.getTicketDetails(sel.id).subscribe({
        next: (updatedTicket) => {
          const mensajesActuales = sel.messages?.length || 0;
          const mensajesNuevos = updatedTicket.messages?.length || 0;

          // Solo repintamos el ticket si llegó un mensaje nuevo o si alguien le cambió el estado
          if (mensajesNuevos > mensajesActuales || updatedTicket.status !== sel.status) {
            const parsed = {
              ...updatedTicket,
              created_at: new Date(updatedTicket.created_at),
              updated_at: new Date(updatedTicket.updated_at),
              closed_at: updatedTicket.closed_at ? new Date(updatedTicket.closed_at) : undefined,
              resolved_at: updatedTicket.resolved_at ? new Date(updatedTicket.resolved_at) : undefined,
              reopened_at: updatedTicket.reopened_at ? new Date(updatedTicket.reopened_at) : undefined,
              messages: updatedTicket.messages ? updatedTicket.messages.map((m: any) => ({
                ...m,
                created_at: new Date(m.created_at)
              })) : []
            };
            this.selectedTicket.set(parsed);

            // Mark as seen immediately since the user is in detail view of this ticket
            const lastMsgTime = parsed.messages && parsed.messages.length > 0
              ? parsed.messages[parsed.messages.length - 1].created_at
              : new Date();
            this.markTicketMessagesAsSeen(parsed.id, lastMsgTime);
          }
        },
        error: (err) => {
          console.warn('Error en polling silencioso del chat:', err);
        }
      });
    }

    // para que aparezcan los nuevos tickets o cambios de estado al instante
    const user = this.authService.currentUser();
    if (user && this.innerViewMode() === 'list') {
      this.ticketService.loadTicketsForUser(user.username);
    }
  }

  loadInstitutions() {
    // Usamos la clave exacta que vimos en el navegador
    const token = sessionStorage.getItem('hsi_token');

    // Armamos el encabezado con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Institution[]>('/api/institutions', { headers }).subscribe({
      next: (data) => {
        this.institutions.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las instituciones desde la BD:', err);
      }
    });
  }

  loadPriorities() {
    const token = sessionStorage.getItem('hsi_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Priority[]>('/api/priorities', { headers }).subscribe({
      next: (data) => {
        this.priorities.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las prioridades desde la BD:', err);
      }
    });
  }

  getPriorityClass(name: string): string {
    if (!name) return 'media';
    const n = name.toLowerCase();
    if (n.includes('baja')) return 'baja';
    if (n.includes('media')) return 'media';
    if (n.includes('alta')) return 'alta';
    if (n.includes('crit') || n.includes('crít')) return 'critica';
    return 'baja';
  }

  getPriorityChipClass(name: string): string {
    if (!name) return 'medium';
    const n = name.toLowerCase();
    if (n.includes('baja')) return 'low';
    if (n.includes('media')) return 'medium';
    if (n.includes('alta')) return 'high';
    if (n.includes('crit') || n.includes('crít')) return 'critica';
    return 'low';
  }

  getPriorityEmoji(name: string): string {
    if (!name) return '🟢';
    const n = name.toLowerCase();
    if (n.includes('baja')) return '🟢';
    if (n.includes('media')) return '🟡';
    if (n.includes('alta')) return '🟠';
    if (n.includes('crit') || n.includes('crít')) return '🔴';
    return '🟢';
  }

  private initForm(): void {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      institution: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  setViewMode(mode: 'create' | 'list' | 'detail' | 'archived'): void {
    if (mode === 'list' || mode === 'archived') {
      this.previousListMode.set(mode);
    }
    this.innerViewMode.set(mode);
    if (mode !== 'detail') {
      this.isEditing.set(false);
      const currentUrlView = this.route.snapshot.queryParams['view'];
      if (currentUrlView !== mode) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { view: mode },
          queryParamsHandling: 'merge'
        });
      }
    }
  }

  archiveTicket(ticketId: string): void {
    const user = this.authService.currentUser();
    if (!user || !user.username) return;
    const current = this.archivedTicketIds();
    if (!current.includes(ticketId)) {
      const updated = [...current, ticketId];
      this.archivedTicketIds.set(updated);
      try {
        localStorage.setItem(`hsi_archived_tickets_${user.username}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving archived tickets:', e);
      }
    }
  }

  unarchiveTicket(ticketId: string): void {
    const user = this.authService.currentUser();
    if (!user || !user.username) return;
    const current = this.archivedTicketIds();
    const updated = current.filter(id => id !== ticketId);
    this.archivedTicketIds.set(updated);
    try {
      localStorage.setItem(`hsi_archived_tickets_${user.username}`, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving archived tickets:', e);
    }
  }

  isTicketArchived(ticketId: string): boolean {
    return this.archivedTicketIds().includes(ticketId);
  }

  showError(field: string): boolean {
    const control = this.ticketForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onInstitutionInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.institutionQuery.set(val);
  }

  onInstitutionSelect(val: string): void {
    this.ticketForm.patchValue({ institution: val });
    this.institutionQuery.set(val);
  }

  setPriority(p: string): void {
    this.selectedPriority.set(p);
  }

  toggleTag(tag: string, selected: boolean): void {
    const current = this.selectedTags();
    if (selected) {
      if (current.length >= 5) {
        return;
      }
      this.selectedTags.set([...current, tag]);
    } else {
      this.selectedTags.set(current.filter(t => t !== tag));
    }
  }

  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.processFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave(): void {
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(files);
    }
  }

  private processFiles(files: FileList): void {
    const names: string[] = [];
    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
    }
    this.attachments.set([...this.attachments(), ...names]);
  }

  private resetForm(): void {
    this.ticketForm.reset();
    this.institutionQuery.set('');
  }

  onCancel(): void {
    this.resetForm();
    this.selectedTags.set([]);
    this.attachments.set([]);
    this.selectedPriority.set('Media');
    this.setViewMode('list');
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.ticketForm.invalid) return;
    if (this.selectedTags().length < 1 || this.selectedTags().length > 5) return;

    this.isSubmitting.set(true);
    const formVals = this.ticketForm.value;

    this.ticketService.createTicket(
      formVals.email,
      formVals.institution,
      this.selectedPriority(),
      formVals.title,
      formVals.description,
      this.selectedTags(),
      this.attachments()
    ).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.resetForm();
        this.selectedTags.set([]);
        this.attachments.set([]);
        this.selectedPriority.set('Media');
        this.setViewMode('list');
        this.showCreateSuccess.set(true);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.setViewMode('list');
      }
    });
  }

  // Ticket Operations logic
  onSelectTicket(t: Ticket): void {
    if (this.currentUserRole() !== 'user') {
      this.markTicketAsRead(t.id);
    }
    this.ticketService.getTicketDetails(t.id).subscribe({
      next: (fullTicket) => {
        const parsed = {
          ...fullTicket,
          created_at: new Date(fullTicket.created_at),
          updated_at: new Date(fullTicket.updated_at),
          closed_at: fullTicket.closed_at ? new Date(fullTicket.closed_at) : undefined,
          resolved_at: fullTicket.resolved_at ? new Date(fullTicket.resolved_at) : undefined,
          reopened_at: fullTicket.reopened_at ? new Date(fullTicket.reopened_at) : undefined,
          messages: fullTicket.messages ? fullTicket.messages.map((m: any) => ({
            ...m,
            created_at: new Date(m.created_at)
          })) : []
        };
        this.selectedTicket.set(parsed);
        this.setViewMode('detail');
        this.ticketSelected.emit(parsed);

        const lastMsgTime = parsed.messages && parsed.messages.length > 0
          ? parsed.messages[parsed.messages.length - 1].created_at
          : new Date();
        this.markTicketMessagesAsSeen(parsed.id, lastMsgTime);

        if (this.currentUserRole() === 'user' && parsed.status === 'resuelto') {
          this.showReopenInfo.set(true);
        }
      },
      error: (err) => {
        console.error('Error fetching ticket details:', err);
        this.selectedTicket.set(t);
        this.setViewMode('detail');
        this.ticketSelected.emit(t);
      }
    });
  }

  onDeleteTicket(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ticket de forma permanente?')) {
      this.ticketService.deleteTicket(id).subscribe(() => {
        this.selectedTicket.set(null);
        this.setViewMode('list');
      });
    }
  }

  canEditTicket(ticket: Ticket): boolean {
    const user = this.authService.currentUser();
    if (!user || user.role !== 'user') return false;
    if (ticket.status !== 'abierto') return false;
    if (ticket.editCount && ticket.editCount >= 1) return false;
    return !this.hasAgentResponse(ticket);
  }

  hasAgentResponse(ticket: Ticket): boolean {
    const messages = ticket.messages || [];
    return messages.some(m => m.role === 'agent' || m.role === 'admin' || m.role === 'owner');
  }

  onEditStart(): void {
    const t = this.selectedTicket();
    if (t) {
      this.editDescription = t.description;
      this.editPriority = t.priority;
      this.isEditing.set(true);
    }
  }

  onEditCancel(): void {
    this.isEditing.set(false);
  }

  onEditSave(): void {
    const t = this.selectedTicket();
    if (t) {
      this.ticketService.updateTicket(t.id, this.editDescription, this.editPriority, true).subscribe(() => {
        const updatedTicket = this.ticketsList().find(x => x.id === t.id);
        if (updatedTicket) {
          this.selectedTicket.set(updatedTicket);
        } else {
          t.description = this.editDescription;
          t.priority = this.editPriority;
          t.editCount = (t.editCount || 0) + 1;
          t.updated_at = new Date();
        }
        this.isEditing.set(false);
      });
    }
  }

  onSubmitComment(event: Event): void {
    event.preventDefault();
    if (this.isSendingComment()) return;

    const t = this.selectedTicket();
    const txt = this.newCommentText.trim();
    if (!t || !txt) return;

    this.isSendingComment.set(true);

    this.ticketService.addComment(t.id, txt).subscribe({
      next: () => {
        this.newCommentText = '';
        this.ticketService.getTicketDetails(t.id).subscribe({
          next: (updatedTicket) => {
            const parsed = {
              ...updatedTicket,
              created_at: new Date(updatedTicket.created_at),
              updated_at: new Date(updatedTicket.updated_at),
              closed_at: updatedTicket.closed_at ? new Date(updatedTicket.closed_at) : undefined,
              resolved_at: updatedTicket.resolved_at ? new Date(updatedTicket.resolved_at) : undefined,
              reopened_at: updatedTicket.reopened_at ? new Date(updatedTicket.reopened_at) : undefined,
              messages: updatedTicket.messages ? updatedTicket.messages.map((m: any) => ({
                ...m,
                created_at: new Date(m.created_at)
              })) : []
            };
            this.selectedTicket.set(parsed);
            this.isSendingComment.set(false);
          },
          error: () => {
            this.isSendingComment.set(false);
          }
        });
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        this.isSendingComment.set(false);
      }
    });
  }

  getTicketUserInitials(userId: string): string {
    if (!userId) return 'U';
    const name = userId.split('@')[0];
    return name.substring(0, 1).toUpperCase();
  }

  formatDisplayName(name: string): string {
    if (!name) return '';
    const raw = name.split('@')[0];
    const words = raw.replace(/[._-]/g, ' ').split(/\s+/);
    return words
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  getTicketUserFirstName(userId: string): string {
    if (!userId) return 'Usuario';
    return this.formatDisplayName(userId);
  }

  getCommentSender(comment: TicketMessage): string {
    if (comment.role === 'bot') {
      return 'Asistente Virtual';
    }
    if (comment.role === 'system') {
      return 'Sistema';
    }
    return this.formatDisplayName(comment.sender_id);
  }

  getUserInitials(): string {
    const user = this.authService.currentUser();
    if (!user) return 'U';
    const name = user.username.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  }

  getFirstName(): string {
    const user = this.authService.currentUser();
    if (!user) return 'Usuario';
    return user.username.split('@')[0];
  }

  getStatusLabel(status: string): string {
    if (status === 'en_progreso') return 'En progreso';
    return status;
  }

  getElapsedText(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + 'a';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + 'm';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + 'd';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + 'h';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + 'min';

    return '1m';
  }

  onStatusChange(ticketId: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value;
    if (!newStatus) return;

    this.ticketService.updateTicketStatus(ticketId, newStatus).subscribe({
      next: (updatedTicket) => {
        const parsed = {
          ...updatedTicket,
          created_at: new Date(updatedTicket.created_at),
          updated_at: new Date(updatedTicket.updated_at),
          messages: updatedTicket.messages ? updatedTicket.messages.map((m: any) => ({
            ...m,
            created_at: new Date(m.created_at)
          })) : []
        };
        this.selectedTicket.set(parsed);
      },
      error: (err) => {
        console.error('Error changing ticket status:', err);
      }
    });
  }

  onAssignChange(ticketId: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const agentId = select.value;
    if (!agentId) return;

    this.ticketService.assignTicket(ticketId, agentId).subscribe({
      next: (updatedTicket) => {
        const parsed = {
          ...updatedTicket,
          created_at: new Date(updatedTicket.created_at),
          updated_at: new Date(updatedTicket.updated_at),
          messages: updatedTicket.messages ? updatedTicket.messages.map((m: any) => ({
            ...m,
            created_at: new Date(m.created_at)
          })) : []
        };
        this.selectedTicket.set(parsed);
      },
      error: (err) => {
        console.error('Error reassigning ticket:', err);
      }
    });
  }

  changeStatusQuick(ticketId: string, status: string): void {
    this.ticketService.updateTicketStatus(ticketId, status).subscribe({
      next: (updatedTicket) => {
        const parsed = {
          ...updatedTicket,
          created_at: new Date(updatedTicket.created_at),
          updated_at: new Date(updatedTicket.updated_at),
          closed_at: updatedTicket.closed_at ? new Date(updatedTicket.closed_at) : undefined,
          resolved_at: updatedTicket.resolved_at ? new Date(updatedTicket.resolved_at) : undefined,
          reopened_at: updatedTicket.reopened_at ? new Date(updatedTicket.reopened_at) : undefined,
          messages: updatedTicket.messages ? updatedTicket.messages.map((m: any) => ({
            ...m,
            created_at: new Date(m.created_at)
          })) : []
        };
        this.selectedTicket.set(parsed);
      },
      error: (err) => {
        console.error('Error changing ticket status:', err);
      }
    });
  }

  getAgentName(agentId: string): string {
    const agent = this.agentsList().find(a => a.id === agentId);
    if (agent) {
      return this.formatDisplayName(`${agent.first_name} ${agent.last_name}`);
    }
    return this.formatDisplayName(agentId);
  }

  setStatusFilter(filter: 'todos' | 'abierto' | 'en_progreso' | 'reabierto' | 'transferido' | 'resuelto'): void {
    this.selectedStatusFilter.set(filter);
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  loadTags() {
    this.ticketService.getTags().subscribe({
      next: (tags) => {
        if (tags && tags.length > 0) {
          // De-duplicate tags by name (case-insensitive and removing accents)
          const seen = new Set<string>();
          const uniqueTags: any[] = [];

          for (const tag of tags) {
            const cleaned = this.cleanTagName(tag.name);
            if (!seen.has(cleaned)) {
              seen.add(cleaned);
              uniqueTags.push(tag);
            } else {
              // If we already saw the clean name, let's prefer the accented/correct version if current has it
              const index = uniqueTags.findIndex(t => this.cleanTagName(t.name) === cleaned);
              if (index !== -1 && tag.name.includes('ó') && !uniqueTags[index].name.includes('ó')) {
                uniqueTags[index] = tag;
              }
            }
          }
          this.systemTags.set(uniqueTags);
        } else {
          this.setMockSystemTags();
        }
      },
      error: (err) => {
        console.error('Error loading tags from backend:', err);
        this.setMockSystemTags();
      }
    });
  }

  setMockSystemTags() {
    this.systemTags.set([
      { id: '6a4bb000a9ad10c7c59df8a3', name: 'Acceso' },
      { id: '6a4bb000a9ad10c7c59df8a4', name: 'Autenticación' },
      { id: '6a4bb000a9ad10c7c59df8a5', name: 'Historia clínica' },
      { id: '6a4bb000a9ad10c7c59df8a6', name: 'Odontología' },
      { id: '6a4bb000a9ad10c7c59df8a7', name: 'Snomed CT' },
      { id: '6a4bb000a9ad10c7c59df8a8', name: 'Administración' },
      { id: '6a4cfe0a923044c942ffc27b', name: 'Facturación' },
      { id: '6a4bb000a9ad10c7c59df8aa', name: 'Turnos' }
    ]);
  }

  openTransferModal(ticket: Ticket): void {
    this.ticketToTransfer.set(ticket);
    this.selectedTransferAgentId.set('');
    this.transferReason.set('');
    this.transferSearchQuery.set('');
    this.selectedSpecializationFilter.set('Todos');
    this.onlineStatusFilter.set('todos');
    this.showTransferModal.set(true);
  }

  closeTransferModal(): void {
    this.showTransferModal.set(false);
    this.ticketToTransfer.set(null);
  }

  selectAgentForTransfer(agent: any): void {
    if (!agent.is_active) return; // Cannot select inactive agents
    this.selectedTransferAgentId.set(agent.id);
  }

  getSelectedAgentName(): string {
    const agent = this.agentsList().find(a => a.id === this.selectedTransferAgentId());
    return agent ? `${agent.first_name} ${agent.last_name}` : '';
  }

  getAgentInitials(agent: any): string {
    const fn = agent.first_name || '';
    const ln = agent.last_name || '';
    return (fn.charAt(0) + ln.charAt(0)).toUpperCase() || agent.username.charAt(0).toUpperCase();
  }

  confirmTransfer(): void {
    const ticketId = this.ticketToTransfer()?.id;
    const agentId = this.selectedTransferAgentId();
    const reason = this.transferReason().trim();

    if (!ticketId || !agentId || reason.length < 4) return;

    this.ticketService.assignTicket(ticketId, agentId, reason).subscribe({
      next: (updatedTicket) => {
        const parsed = {
          ...updatedTicket,
          created_at: new Date(updatedTicket.created_at),
          updated_at: new Date(updatedTicket.updated_at),
          messages: updatedTicket.messages ? updatedTicket.messages.map((m: any) => ({
            ...m,
            created_at: new Date(m.created_at)
          })) : []
        };
        this.selectedTicket.set(parsed);
        this.closeTransferModal();
        this.showTransferSuccess.set(true);
      },
      error: (err) => {
        console.error('Error transferring ticket:', err);
      }
    });
  }

  openResolveConfirmation(ticketId: string): void {
    this.ticketToResolveId.set(ticketId);
    this.showResolveConfirmModal.set(true);
  }

  closeResolveConfirmation(): void {
    this.showResolveConfirmModal.set(false);
    this.ticketToResolveId.set('');
  }

  confirmResolve(): void {
    const id = this.ticketToResolveId();
    if (id) {
      this.changeStatusQuick(id, 'resuelto');
    }
    this.closeResolveConfirmation();
  }
}


