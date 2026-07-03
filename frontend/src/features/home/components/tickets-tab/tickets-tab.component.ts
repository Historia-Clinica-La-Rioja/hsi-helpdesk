
import { Component, Input, Output, EventEmitter, inject, signal, computed, effect, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TicketService, Ticket, TicketMessage } from '../../../../core/services/ticket.service';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';

export interface Institution {
  _id: string;
  id: number;
  name: string;
  email: string;
}

export interface Priority {
  _id: string;
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
      @if (innerViewMode() === 'create') {
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
                  <label>Título del error o solicitud *</label>
                  <div class="input-container">
                    <span class="material-icons input-icon">title</span>
                    <input 
                      type="text" 
                      formControlName="title" 
                      placeholder="Ej: Error al firmar documento / cargar Historia Clínica"
                    />
                  </div>
                  @if (showError('title')) {
                    <span class="error-text">El título es obligatorio</span>
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
                    @for (prio of priorities(); track prio._id) {
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
                    @for (tag of availableTags; track tag) {
                      <mat-chip-option 
                        [selected]="selectedTags().includes(tag)"
                        (selectionChange)="toggleTag(tag, $event.selected)"
                      >
                        {{ tag }}
                      </mat-chip-option>
                    }
                  </mat-chip-listbox>
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
                [disabled]="isSubmitting() || ticketForm.invalid"
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
      } @else if (innerViewMode() === 'list') {
        <!-- List View (Mis Tickets / Tickets de Soporte) -->
        <div class="ticket-history-card">
          <div class="history-header">
            <h2>{{ currentUserRole() === 'user' ? 'Mis tickets' : 'Panel de Agente' }}</h2>
            @if (currentUserRole() === 'user') {
              <button class="new-ticket-btn" (click)="setViewMode('create')">
                + Nuevo ticket
              </button>
            }
          </div>

          @if (currentUserRole() !== 'user') {
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
                <button 
                  class="agent-tab-btn" 
                  [class.active]="selectedStatusFilter() === 'cerrado'"
                  (click)="setStatusFilter('cerrado')"
                >
                  Cerrado
                </button>
              </div>
            </div>
          }
          
          <div class="separator"></div>

          <div class="tickets-list">
            @if (ticketsList().length === 0) {
              <div class="empty-state">
                <span class="material-icons">confirmation_number</span>
                <p>{{ currentUserRole() === 'user' ? 'Aún no tenés tickets enviados.' : 'No se encontraron tickets de soporte.' }}</p>
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
                        <!-- Status Badges -->
                        <span class="status-badge" [ngClass]="ticket.status">
                          {{ getStatusLabel(ticket.status) }}
                        </span>
                        @if (ticket.status === 'transferido' || ticket.status === 'reabierto') {
                          <span class="status-badge en_progreso">
                            En progreso
                          </span>
                        }
                        @if (ticket.status === 'resuelto' || ticket.status === 'cerrado') {
                          <span class="status-badge cerrado">
                            Cerrado
                          </span>
                        }

                        <!-- Nuevo Badge -->
                        @if (currentUserRole() !== 'user' && !isTicketRead(ticket.id) && ticket.status !== 'resuelto' && ticket.status !== 'cerrado') {
                          <span class="new-ticket-badge">Nuevo</span>
                        }

                        <!-- Elapsed Time Pill -->
                        <span class="time-elapsed-pill">{{ getElapsedText(ticket.created_at) }}</span>
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
                        @if ((ticket.status === 'resuelto' || ticket.status === 'cerrado') && ticket.resolved_at) {
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
            <button class="back-btn" (click)="setViewMode('list')">
              <span class="material-icons">arrow_back</span> Volver
            </button>
            <div class="detail-actions">
              @if (!isEditing()) {
                @if (selectedTicket(); as ticket) {
                  @if (canEditTicket(ticket)) {
                    <button class="edit-btn" (click)="onEditStart()">
                      <span class="material-icons">edit</span> Editar
                    </button>
                  } @else if (currentUserRole() === 'user' && ticket.editCount && ticket.editCount >= 1) {
                    <div class="edit-limit-badge">
                      <span class="material-icons info-icon">info</span> Límite de 1 edición alcanzado
                    </div>
                  }
                }
              }
            </div>
          </div>

          <div class="separator"></div>

          @if (selectedTicket(); as ticket) {
            <div class="detail-body">
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
                      @if (ticket.status === 'resuelto' || ticket.status === 'cerrado') {
                        <span class="status-badge cerrado">
                          Cerrado
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
                  @if ((ticket.status === 'resuelto' || ticket.status === 'cerrado') && ticket.resolved_at) {
                    <div class="info-block">
                      <span class="info-label">Resuelto/Cerrado</span>
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

                <div class="detail-description-section">
                  <h4>Descripción del incidente</h4>
                  <p class="description-text">{{ ticket.description }}</p>
                </div>

                @if (currentUserRole() !== 'user') {
                  @if (!ticket.assigned_to || ticket.assigned_to === currentUserId()) {
                    <div class="admin-controls-card">
                      <h4>Acciones de Soporte Técnico</h4>
                      <div class="admin-actions-toolbar">
                        <!-- Resolve Action Button -->
                        <div class="status-buttons-group">
                          @if (ticket.status !== 'resuelto' && ticket.status !== 'cerrado') {
                            <button 
                              type="button" 
                              class="resolve-action-btn"
                              (click)="changeStatusQuick(ticket.id, 'resuelto')"
                            >
                              <span class="material-icons" style="font-size: 16px; vertical-align: middle;">task_alt</span>
                              Resolver Ticket
                            </button>
                          } @else {
                            <div class="ticket-resolved-badge-large">
                              <span class="material-icons" style="font-size: 18px; vertical-align: middle;">check_circle</span>
                              Ticket Resuelto y Cerrado
                            </div>
                          }
                        </div>

                        <div class="separator-v"></div>

                        <!-- Assignment Dropdown -->
                        <div class="admin-control-group">
                          <label class="control-label">Transferir Ticket</label>
                          <select [value]="ticket.assigned_to || ''" (change)="onAssignChange(ticket.id, $event)">
                            <option value="">-- Seleccionar Agente --</option>
                            @for (agent of agentsList(); track agent.id) {
                              <option [value]="agent.id">
                                {{ agent.first_name }} {{ agent.last_name }} ({{ agent.username }})
                              </option>
                            }
                          </select>
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
                      @for (prio of priorities(); track prio._id) {
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
                <div class="comments-list">
                  <!-- Render custom messages/comments -->
                  @for (comment of ticketComments(); track comment.id) {
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
                    <button type="submit" class="comment-submit-btn" [disabled]="!newCommentText.trim() || isSendingComment()">
                      Enviar Comentario
                    </button>
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
    </div>
  `,
  styles: [`
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
      max-height: 420px;
      overflow-y: auto;
      padding-right: 4px;
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
    }

    .add-comment-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .add-comment-form textarea {
      height: 70px;
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
  `]
})

export class TicketsTabComponent implements OnInit {
  private ticketService = inject(TicketService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);

  readTicketIds = signal<string[]>([]);
  selectedStatusFilter = signal<'todos' | 'abierto' | 'en_progreso' | 'reabierto' | 'transferido' | 'resuelto' | 'cerrado'>('todos');
  searchQuery = signal<string>('');

  // Agent dynamic statistics cards
  statsTotal = computed(() => this.ticketService.tickets().length);
  statsAbiertos = computed(() => this.ticketService.tickets().filter(t => t.status === 'abierto').length);
  statsProgreso = computed(() => this.ticketService.tickets().filter(t => t.status === 'en_progreso').length);
  statsReabiertos = computed(() => this.ticketService.tickets().filter(t => t.status === 'reabierto').length);
  statsTransferidos = computed(() => this.ticketService.tickets().filter(t => t.status === 'transferido').length);
  statsResueltos = computed(() => this.ticketService.tickets().filter(t => t.status === 'resuelto').length);

  @Input() set viewMode(mode: 'create' | 'list' | 'detail') {
    this.innerViewMode.set(mode);
  }
  @Output() viewModeChange = new EventEmitter<'create' | 'list' | 'detail'>();
  @Output() ticketSelected = new EventEmitter<Ticket>();

  innerViewMode = signal<'create' | 'list' | 'detail'>('create');

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

  // Get active tickets list from service with custom sorting and filters
  ticketsList = computed(() => {
    const all = this.ticketService.tickets();
    const role = this.currentUserRole();
    const query = this.searchQuery().toLowerCase().trim();
    const filter = this.selectedStatusFilter();
    const currentUserId = this.authService.currentUser()?.id || '';

    let filtered = all;

    if (role === 'user') {
      if (query) {
        filtered = filtered.filter(t =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.institution.toLowerCase().includes(query)
        );
      }
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
      } else if (filter === 'cerrado') {
        filtered = filtered.filter(t => t.assigned_to === currentUserId && t.status === 'cerrado');
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
        const isNew = role !== 'user' && !this.isTicketRead(t.id) && t.status !== 'resuelto' && t.status !== 'cerrado';
        if (isNew) return 1;

        switch (t.status) {
          case 'abierto': return 2;
          case 'reabierto': return 3;
          case 'en_progreso':
          case 'transferido': return 4;
          case 'resuelto':
          case 'cerrado': return 5;
          default: return 6;
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

  initReadTickets(): void {
    try {
      const stored = localStorage.getItem('read_ticket_ids');
      if (stored) {
        this.readTicketIds.set(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading read_ticket_ids:', e);
    }
  }

  isTicketRead(ticketId: string): boolean {
    return this.readTicketIds().includes(ticketId);
  }

  markTicketAsRead(ticketId: string): void {
    if (!this.readTicketIds().includes(ticketId)) {
      const updated = [...this.readTicketIds(), ticketId];
      this.readTicketIds.set(updated);
      try {
        localStorage.setItem('read_ticket_ids', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving read_ticket_ids:', e);
      }
    }
  }

  // Inline editing signals
  isEditing = signal(false);
  editDescription = '';
  editPriority = 'Media';

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
    this.initReadTickets();

    // Periodic sync interval (5 seconds)
    const intervalId = setInterval(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.ticketService.loadTicketsForUser(user.username);

        // Also if in detail view, sync details
        const sel = this.selectedTicket();
        if (sel && this.innerViewMode() === 'detail') {
          this.ticketService.getTicketDetails(sel.id).subscribe({
            next: (updatedTicket) => {
              if (!this.isEditing()) {
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
              }
            }
          });
        }
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });

    // Seed initial user email if logged in
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.ticketForm.patchValue({
          email: user.username.includes('@') ? user.username : `${user.username}@salud.larioja.gob.ar`
        });
      }
    });

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
  }

  ngOnInit() {
    // Al iniciar el componente, traemos las instituciones y prioridades de la base de datos
    this.loadInstitutions();
    this.loadPriorities();
  }

  loadInstitutions() {
    this.http.get<Institution[]>('http://localhost:8083/api/institutions').subscribe({
      next: (data) => {
        this.institutions.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las instituciones desde la BD:', err);
      }
    });
  }

  loadPriorities() {
    const token = localStorage.getItem('hsi_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Priority[]>('http://localhost:8083/api/priorities', { headers }).subscribe({
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
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      institution: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  setViewMode(mode: 'create' | 'list' | 'detail'): void {
    this.innerViewMode.set(mode);
    this.viewModeChange.emit(mode);
    if (mode !== 'detail') {
      this.isEditing.set(false);
    }
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
    const user = this.authService.currentUser();
    if (user) {
      this.ticketForm.patchValue({
        email: user.username.includes('@') ? user.username : `${user.username}@salud.larioja.gob.ar`
      });
    }
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
        this.selectedTicket.set(fullTicket);
        this.setViewMode('detail');
        this.ticketSelected.emit(fullTicket);
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
    return !ticket.editCount || ticket.editCount < 1;
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

  setStatusFilter(filter: 'todos' | 'abierto' | 'en_progreso' | 'reabierto' | 'transferido' | 'resuelto' | 'cerrado'): void {
    this.selectedStatusFilter.set(filter);
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }
}


