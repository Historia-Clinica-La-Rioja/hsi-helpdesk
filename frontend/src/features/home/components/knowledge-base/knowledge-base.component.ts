import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';

export interface Faq {
  id: string;
  label: string;
  questions: string;
  answers: string;
  is_active: boolean;
  tags?: string[];
  created_on?: string;
  updated_on?: string;
}

interface CategoryNode {
  name: string;
  fullName: string;
  subcategories: CategoryNode[];
  faqs: Faq[];
  isExpanded: boolean;
  totalCount: number;
}

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="kb-container">
      <!-- Upper Header Area -->
      <div class="kb-header-row">
        <div class="kb-header-left">
          <h2>Base de Conocimiento</h2>
        </div>
        <button class="new-article-btn" (click)="openNewArticleModal()">
          <span class="material-icons">add</span>
          Nuevo artículo
        </button>
      </div>

      <!-- Search Box -->
      <div class="search-row">
        <div class="search-input-wrapper">
          <span class="material-icons search-icon">search</span>
          <input 
            type="text" 
            [ngModel]="searchQuery()" 
            (ngModelChange)="onSearchQueryChange($event)"
            placeholder="Buscar por pregunta o etiqueta..."
          />
        </div>
      </div>

      <!-- Content Grid -->
      <div class="kb-content-grid">
        
        <!-- Left Panel: Categories -->
        <div class="categories-panel">
          @if (searchQuery()) {
            <div class="search-results-header">
              <span class="results-title">Resultados de búsqueda</span>
              <span class="results-count">({{ filteredFaqs().length }} encontrados)</span>
            </div>
            
            <div class="search-results-list">
              @for (faq of filteredFaqs(); track faq.id) {
                <div 
                  class="search-faq-item" 
                  [class.active]="selectedFaq()?.id === faq.id"
                  (click)="selectFaq(faq)"
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
                  <p>No se encontraron artículos para tu búsqueda.</p>
                </div>
              }
            </div>
          } @else {
            <span class="panel-section-title">CATEGORÍAS</span>
            <div class="categories-tree-container">
              <ng-container *ngTemplateOutlet="categoryTemplate; context: { nodes: categoryTree(), depth: 0 }"></ng-container>
            </div>
          }
        </div>

        <!-- Right Panel: Article Details / Placeholder -->
        <div class="details-panel">
          @if (selectedFaq(); as faq) {
            <div class="article-details-card">
              
              <!-- Card Header -->
              <div class="article-header">
                <h3>{{ faq.questions }}</h3>
                <div class="article-actions">
                  <!-- Edit Button -->
                  <button class="edit-article-btn" (click)="openEditArticleModal(faq)">
                    <span class="material-icons">edit</span>
                    Editar
                  </button>
                  
                  <!-- Close Details Button -->
                  <button class="close-details-btn" (click)="closeDetails()" title="Cerrar detalle">
                    <span class="material-icons">close</span>
                  </button>
                </div>
              </div>

              <!-- Tags list -->
              @if (faq.tags && faq.tags.length > 0) {
                <div class="article-tags-row">
                  <span class="material-icons tag-icon-prefix">local_offer</span>
                  @for (tag of faq.tags; track tag) {
                    <span class="tag-pill">{{ tag }}</span>
                  }
                </div>
              }

              <!-- Divider -->
              <div class="article-divider"></div>

              <!-- Article Content (Answer) -->
              <div class="article-content">
                <p>{{ faq.answers }}</p>
              </div>

            </div>
          } @else {
            <!-- Selection Placeholder -->
            <div class="empty-details-state">
              <span class="material-icons empty-icon">description</span>
              <p>Seleccioná una categoría o buscá un artículo</p>
            </div>
          }
        </div>

      </div>
    </div>

    <!-- Recursive category tree template -->
    <ng-template #categoryTemplate let-nodes="nodes" let-depth="depth">
      @for (node of nodes; track node.fullName) {
        <div class="category-node" [style.padding-left.px]="depth * 12">
          <div class="category-item-row" (click)="toggleNode(node)">
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
              <ng-container *ngTemplateOutlet="categoryTemplate; context: { nodes: node.subcategories, depth: depth + 1 }"></ng-container>
            }
            
            <!-- Render FAQs under this specific node -->
            @for (faq of node.faqs; track faq.id) {
              <div 
                class="faq-leaf-row" 
                [class.active]="selectedFaq()?.id === faq.id"
                [style.padding-left.px]="(depth + 1) * 12 + 16"
                (click)="selectFaq(faq)"
              >
                <span class="material-icons leaf-doc-icon">description</span>
                <span class="faq-leaf-title">{{ faq.questions }}</span>
              </div>
            }
          }
        </div>
      }
    </ng-template>

    <!-- Modal Form (New / Edit Article) -->
    @if (showArticleModal()) {
      <div class="modal-overlay" (click)="closeArticleModal()">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ isEditMode() ? 'Editar Artículo' : 'Nuevo Artículo' }}</h3>
            <button class="close-modal-btn" (click)="closeArticleModal()">
              <span class="material-icons">close</span>
            </button>
          </div>

          <form (submit)="saveArticle($event)">
            <div class="modal-body">
              <!-- Category/Label Input -->
              <div class="form-group">
                <label for="labelInput">Categoría / Tópico</label>
                <input 
                  type="text" 
                  id="labelInput" 
                  name="label"
                  [(ngModel)]="formModel.label" 
                  placeholder="Ej: Acceso y Autenticación / Autenticación de dos factores" 
                  required
                  list="categorySuggestions"
                />
                <datalist id="categorySuggestions">
                  @for (cat of flatCategoryNames(); track cat) {
                    <option [value]="cat"></option>
                  }
                </datalist>
                <span class="help-text">Separá con "/" para crear subcategorías (ej: Categoría / Subcategoría)</span>
              </div>

              <!-- Question Input -->
              <div class="form-group">
                <label for="questionsInput">Pregunta (Título)</label>
                <input 
                  type="text" 
                  id="questionsInput" 
                  name="questions"
                  [(ngModel)]="formModel.questions" 
                  placeholder="Escribí la pregunta o título del artículo..." 
                  required
                />
              </div>

              <!-- Answer Textarea -->
              <div class="form-group">
                <label for="answersInput">Respuesta detallada</label>
                <textarea 
                  id="answersInput" 
                  name="answers"
                  [(ngModel)]="formModel.answers" 
                  placeholder="Escribí la respuesta o instructivo detallado..." 
                  rows="6"
                  required
                ></textarea>
              </div>

              <!-- Tags Form Management -->
              <div class="form-group">
                <label for="tagInput">Etiquetas</label>
                <div class="tags-input-container">
                  <input 
                    type="text" 
                    id="tagInput" 
                    [(ngModel)]="tempTag" 
                    name="tempTag"
                    placeholder="Escribí una etiqueta y presioná Enter..." 
                    (keydown.enter)="addTag($event)"
                  />
                </div>
                
                @if (formModel.tags.length > 0) {
                  <div class="modal-tags-list">
                    @for (tag of formModel.tags; track tag) {
                      <span class="modal-tag-chip">
                        {{ tag }}
                        <span class="material-icons delete-tag-icon" (click)="removeTag(tag)">close</span>
                      </span>
                    }
                  </div>
                }
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="cancel-btn" (click)="closeArticleModal()" [disabled]="isSubmitting()">
                Cancelar
              </button>
              <button type="submit" class="save-btn" [disabled]="isSubmitting()">
                @if (isSubmitting()) {
                  <span class="material-icons loading-spinner">autorenew</span>
                  Guardando...
                } @else {
                  Guardar artículo
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .kb-container {
      padding: 32px;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: var(--color-bg-primary);
    }

    .kb-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .kb-header-row h2 {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .new-article-btn {
      display: flex;
      align-items: center;
      gap: 6px;
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

    .new-article-btn:hover {
      background-color: var(--color-accent-teal-hover);
      box-shadow: 0 6px 16px rgba(119, 194, 216, 0.35);
      transform: translateY(-1px);
    }

    .new-article-btn:active {
      transform: translateY(0);
    }

    /* Search Box styling */
    .search-row {
      width: 100%;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .search-icon {
      position: absolute;
      left: 16px;
      color: var(--color-text-muted);
      font-size: 20px;
    }

    .search-input-wrapper input {
      width: 100%;
      height: 46px;
      padding: 0 16px 0 48px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-input);
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--color-text-primary);
      background-color: var(--color-bg-secondary);
      outline: none;
      transition: all 0.2s ease;
    }

    .search-input-wrapper input:focus {
      border-color: var(--color-accent-teal);
      background-color: var(--color-bg-primary);
      box-shadow: 0 0 0 3px rgba(119, 194, 216, 0.15);
    }

    /* Grid Layout */
    .kb-content-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 24px;
      flex: 1;
      min-height: 480px;
    }

    /* Left Panel: Categories styling */
    .categories-panel {
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-card);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 600px;
      overflow-y: auto;
    }

    .panel-section-title {
      font-family: var(--font-heading);
      font-size: 11px;
      font-weight: 700;
      color: var(--color-text-muted);
      letter-spacing: 0.8px;
    }

    .categories-tree-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* Category tree row */
    .category-node {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .category-item-row {
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 8px;
      border-radius: var(--radius-input);
      cursor: pointer;
      transition: background-color 0.15s ease;
      user-select: none;
    }

    .category-item-row:hover {
      background-color: var(--color-bg-secondary);
    }

    .expand-arrow {
      font-size: 18px;
      color: var(--color-text-muted);
      transition: transform 0.2s ease;
      margin-right: 4px;
    }

    .expand-arrow.rotated {
      transform: rotate(90deg);
    }

    .folder-icon {
      font-size: 18px;
      color: var(--color-accent-teal);
      margin-right: 8px;
    }

    .category-name-text {
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 600;
      color: var(--color-text-primary);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .category-count-badge {
      font-family: var(--font-heading);
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-left: 8px;
    }

    /* FAQ Leaf Item */
    .faq-leaf-row {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 10px;
      border-radius: var(--radius-input);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .faq-leaf-row:hover {
      background-color: var(--color-bg-secondary);
    }

    .faq-leaf-row.active {
      background-color: rgba(119, 194, 216, 0.12);
    }

    .leaf-doc-icon {
      font-size: 16px;
      color: var(--color-text-muted);
      opacity: 0.6;
      margin-right: 8px;
    }

    .faq-leaf-row.active .leaf-doc-icon {
      color: var(--color-accent-teal-hover);
      opacity: 1;
    }

    .faq-leaf-title {
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-muted);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .faq-leaf-row.active .faq-leaf-title {
      color: var(--color-text-primary);
      font-weight: 500;
    }

    /* Flat Search Results List styling */
    .search-results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--color-border);
    }

    .results-title {
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .results-count {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
    }

    .search-results-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .search-faq-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px;
      border-radius: var(--radius-input);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .search-faq-item:hover {
      background-color: var(--color-bg-secondary);
    }

    .search-faq-item.active {
      background-color: rgba(119, 194, 216, 0.12);
    }

    .doc-icon {
      font-size: 18px;
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    .search-faq-item.active .doc-icon {
      color: var(--color-accent-teal);
    }

    .search-faq-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }

    .search-faq-title {
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .search-faq-path {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .empty-search-state {
      padding: 40px 20px;
      text-align: center;
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .empty-search-state .material-icons {
      font-size: 32px;
      opacity: 0.5;
    }

    .empty-search-state p {
      font-size: 12px;
    }

    /* Right Panel Details styling */
    .details-panel {
      flex: 1;
      display: flex;
    }

    .empty-details-state {
      width: 100%;
      border: 1.5px dashed var(--color-border);
      border-radius: var(--radius-card);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: var(--color-text-muted);
      padding: 40px;
    }

    .empty-icon {
      font-size: 48px;
      color: var(--color-accent-teal);
      opacity: 0.6;
    }

    .empty-details-state p {
      font-family: var(--font-body);
      font-size: 14.5px;
      font-weight: 500;
    }

    /* Article detail card */
    .article-details-card {
      width: 100%;
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-card);
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: var(--shadow-card);
      animation: detailFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes detailFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .article-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
    }

    .article-header h3 {
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 700;
      color: var(--color-text-primary);
      line-height: 1.4;
    }

    .article-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .views-counter {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--color-text-muted);
      margin-right: 4px;
    }

    .eye-icon {
      font-size: 18px;
      opacity: 0.7;
    }

    .edit-article-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 14px;
      border: 1px solid var(--color-border);
      background-color: var(--color-bg-primary);
      border-radius: 16px;
      color: var(--color-text-muted);
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .edit-article-btn:hover {
      background-color: var(--color-bg-secondary);
      border-color: var(--color-accent-teal);
      color: var(--color-text-primary);
    }

    .close-details-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      border-radius: 50%;
      color: var(--color-text-muted);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .close-details-btn:hover {
      background-color: var(--color-bg-secondary);
      color: var(--color-text-primary);
    }

    .article-tags-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .tag-icon-prefix {
      font-size: 16px;
      color: var(--color-text-muted);
      opacity: 0.6;
    }

    .tag-pill {
      font-family: var(--font-body);
      font-size: 11.5px;
      font-weight: 600;
      color: var(--color-text-primary);
      background-color: #EBF4FD;
      border: 1px solid #D6E9FC;
      padding: 3px 10px;
      border-radius: 12px;
    }

    .article-divider {
      height: 1px;
      background-color: var(--color-border);
    }

    .article-content {
      font-family: var(--font-body);
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--color-text-primary);
      white-space: pre-wrap;
    }

    /* Modal dialog styling */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(51, 49, 67, 0.45);
      backdrop-filter: blur(6px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: modalFadeIn 0.2s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-dialog {
      background-color: var(--color-bg-primary);
      border-radius: var(--radius-card);
      width: 520px;
      max-width: 90%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes modalScaleIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .modal-header {
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-border);
    }

    .modal-header h3 {
      font-family: var(--font-heading);
      font-size: 17px;
      font-weight: 700;
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
      transition: background-color 0.2s;
    }

    .close-modal-btn:hover {
      background-color: var(--color-bg-secondary);
      color: var(--color-text-primary);
    }

    .modal-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 450px;
      overflow-y: auto;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      font-family: var(--font-heading);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .form-group input, .form-group textarea {
      padding: 10px 12px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-input);
      font-family: var(--font-body);
      font-size: 13.5px;
      color: var(--color-text-primary);
      background-color: var(--color-bg-secondary);
      outline: none;
      transition: all 0.2s ease;
    }

    .form-group input:focus, .form-group textarea:focus {
      border-color: var(--color-accent-teal);
      background-color: var(--color-bg-primary);
      box-shadow: 0 0 0 3px rgba(119, 194, 216, 0.15);
    }

    .form-group .help-text {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--color-text-muted);
    }

    .tags-input-container {
      display: flex;
      gap: 8px;
    }

    .tags-input-container input {
      flex: 1;
    }

    .modal-tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .modal-tag-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 11.5px;
      font-weight: 600;
      color: var(--color-text-primary);
      background-color: #EBF4FD;
      border: 1px solid #D6E9FC;
      padding: 3px 8px 3px 10px;
      border-radius: 12px;
    }

    .delete-tag-icon {
      font-size: 14px;
      cursor: pointer;
      color: var(--color-text-muted);
      border-radius: 50%;
      padding: 1px;
      transition: background-color 0.15s, color 0.15s;
    }

    .delete-tag-icon:hover {
      background-color: var(--color-border);
      color: var(--color-error);
    }

    .modal-footer {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      border-top: 1px solid var(--color-border);
      background-color: var(--color-bg-secondary);
    }

    .modal-footer button {
      height: 38px;
      padding: 0 20px;
      border-radius: 19px;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .modal-footer .cancel-btn {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
    }

    .modal-footer .cancel-btn:hover {
      background-color: var(--color-border);
      color: var(--color-text-primary);
    }

    .modal-footer .save-btn {
      background-color: var(--color-accent-teal);
      border: none;
      color: white;
      box-shadow: 0 4px 12px rgba(119, 194, 216, 0.2);
    }

    .modal-footer .save-btn:hover:not(:disabled) {
      background-color: var(--color-accent-teal-hover);
      box-shadow: 0 6px 16px rgba(119, 194, 216, 0.3);
    }

    .modal-footer .save-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .loading-spinner {
      font-size: 16px;
      animation: spin 1s linear infinite;
      vertical-align: middle;
      margin-right: 4px;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class KnowledgeBaseComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  faqs = signal<Faq[]>([]);
  selectedFaq = signal<Faq | null>(null);
  searchQuery = signal<string>('');

  // Tree computation
  categoryTree = computed<CategoryNode[]>(() => {
    return this.buildCategoryTree(this.faqs());
  });

  // Flat list of categories for autocomplete input
  flatCategoryNames = computed<string[]>(() => {
    const labels = this.faqs().map(f => f.label);
    return [...new Set(labels)];
  });

  // Search filter
  filteredFaqs = computed<Faq[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.faqs();
    if (!query) return [];

    return all.filter(faq => {
      const matchQuestion = faq.questions.toLowerCase().includes(query);
      const matchAnswer = faq.answers.toLowerCase().includes(query);
      const matchLabel = faq.label.toLowerCase().includes(query);
      const matchTags = faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(query));
      return matchQuestion || matchAnswer || matchLabel || matchTags;
    });
  });

  // Form & Modals state
  showArticleModal = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  formModel = {
    id: '',
    label: '',
    questions: '',
    answers: '',
    tags: [] as string[]
  };
  tempTag = '';

  // Seed for views counts
  private viewsSeed: Record<string, number> = {};

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    const token = sessionStorage.getItem('hsi_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Faq[]>('/api/faqs', { headers }).subscribe({
      next: (data) => {
        this.faqs.set(data);
        
        // Re-establish active details selection if it existed
        const currentActive = this.selectedFaq();
        if (currentActive) {
          const fresh = data.find(f => f.id === currentActive.id);
          this.selectedFaq.set(fresh || null);
        }
      },
      error: (err) => {
        console.error('Error al cargar las FAQs:', err);
      }
    });
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery.set(query);
  }

  selectFaq(faq: Faq): void {
    this.selectedFaq.set(faq);
  }

  closeDetails(): void {
    this.selectedFaq.set(null);
  }

  toggleNode(node: CategoryNode): void {
    node.isExpanded = !node.isExpanded;
  }

  // Views counter helper
  getMockViews(id: string): number {
    if (!this.viewsSeed[id]) {
      // Seed a number between 15 and 99
      this.viewsSeed[id] = Math.floor(Math.random() * 85) + 15;
    }
    return this.viewsSeed[id];
  }

  // Categories tree parser
  private buildCategoryTree(faqs: Faq[]): CategoryNode[] {
    const root: CategoryNode[] = [];

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

    const calculateCounts = (nodes: CategoryNode[]): number => {
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

  // Form Modals Handling
  openNewArticleModal(): void {
    this.isEditMode.set(false);
    this.tempTag = '';
    this.formModel = {
      id: '',
      label: '',
      questions: '',
      answers: '',
      tags: []
    };
    this.showArticleModal.set(true);
  }

  openEditArticleModal(faq: Faq): void {
    this.isEditMode.set(true);
    this.tempTag = '';
    this.formModel = {
      id: faq.id,
      label: faq.label,
      questions: faq.questions,
      answers: faq.answers,
      tags: faq.tags ? [...faq.tags] : []
    };
    this.showArticleModal.set(true);
  }

  closeArticleModal(): void {
    this.showArticleModal.set(false);
  }

  // Tags input action
  addTag(event: Event): void {
    event.preventDefault();
    const tag = this.tempTag.trim();
    if (tag && !this.formModel.tags.includes(tag)) {
      this.formModel.tags.push(tag);
    }
    this.tempTag = '';
  }

  removeTag(tag: string): void {
    this.formModel.tags = this.formModel.tags.filter(t => t !== tag);
  }

  // Save changes handler
  saveArticle(event: Event): void {
    event.preventDefault();
    if (this.isSubmitting()) return;

    // Validate inputs
    const label = this.formModel.label.trim();
    const questions = this.formModel.questions.trim();
    const answers = this.formModel.answers.trim();
    if (!label || !questions || !answers) return;

    // Handle any unfinished tag input
    const trailingTag = this.tempTag.trim();
    if (trailingTag && !this.formModel.tags.includes(trailingTag)) {
      this.formModel.tags.push(trailingTag);
      this.tempTag = '';
    }

    this.isSubmitting.set(true);

    const token = sessionStorage.getItem('hsi_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      label,
      questions,
      answers,
      tags: this.formModel.tags
    };

    if (this.isEditMode()) {
      // Edit mode (PUT)
      this.http.put<Faq>(`/api/faqs/${this.formModel.id}`, payload, { headers }).subscribe({
        next: (updatedFaq) => {
          this.isSubmitting.set(false);
          this.showArticleModal.set(false);
          this.loadFaqs();
          // Immediately select updated FAQ
          this.selectedFaq.set(updatedFaq);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          console.error('Error al guardar artículo:', err);
          alert('Hubo un error al guardar el artículo. Por favor, intentá de nuevo.');
        }
      });
    } else {
      // New mode (POST)
      this.http.post<Faq>('/api/faqs', payload, { headers }).subscribe({
        next: (newFaq) => {
          this.isSubmitting.set(false);
          this.showArticleModal.set(false);
          this.loadFaqs();
          // Immediately select new FAQ
          this.selectedFaq.set(newFaq);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          console.error('Error al crear artículo:', err);
          alert('Hubo un error al crear el artículo. Por favor, intentá de nuevo.');
        }
      });
    }
  }
}
