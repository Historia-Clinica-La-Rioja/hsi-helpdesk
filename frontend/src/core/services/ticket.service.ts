import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';

export interface TicketMessage {
  id: string;
  sender_id: string;
  role: 'bot' | 'user' | 'agent';
  content: string;
  created_at: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  user_id: string;
  institution: string;
  priority: 'Baja' | 'Media' | 'Alta';
  status: 'abierto' | 'en_progreso' | 'resuelto' | 'escalado';
  tags: string[];
  attachments: string[];
  created_at: Date;
  updated_at: Date;
  messages?: TicketMessage[];
  editCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:8083/api';

  private allTickets = signal<Ticket[]>([]);

  tickets = computed(() => this.allTickets());
  hasTickets = computed(() => this.allTickets().length > 0);
  activeCount = computed(() => this.allTickets().filter(t => t.status === 'abierto' || t.status === 'en_progreso').length);

  constructor() {
    this.auth.currentUser;
  }

  loadTicketsForUser(username: string): void {
    const key = `hsi_tickets_${username}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      const parsed = JSON.parse(saved).map((t: any) => ({
        ...t,
        created_at: new Date(t.created_at),
        updated_at: new Date(t.updated_at)
      }));
      this.allTickets.set(parsed);
    } else {
      // demo user "humberto@gmail.com"
      if (username === 'humberto' || username === 'humberto@gmail.com') {
        const seeded: Ticket[] = [
          {
            id: 'tk_001',
            title: 'Error al cargar historia clínica de paciente sin DNI físico',
            description: 'El sistema tira error 500 cuando se intenta registrar una consulta para un paciente extranjero que no posee DNI físico, a pesar de ingresar el DNI provisorio.',
            user_id: username,
            institution: 'Hospital Vera Barros',
            priority: 'Alta',
            status: 'en_progreso',
            tags: ['Historia Clínica'],
            attachments: ['screenshot_error.png'],
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000)
          },
          {
            id: 'tk_002',
            title: 'Falta de Módulos de Farmacia en Guardia General',
            description: 'En el módulo de Guardias de la HSI no nos aparecen los medicamentos del vademécum de urgencia para recetar.',
            user_id: username,
            institution: 'CAPS Centro',
            priority: 'Media',
            status: 'abierto',
            tags: ['Facturación', 'Acceso'],
            attachments: [],
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        ];
        this.saveToStorage(username, seeded);
        this.allTickets.set(seeded);
      } else {
        this.allTickets.set([]);
      }
    }
  }

  clearTickets(): void {
    this.allTickets.set([]);
  }

  createTicket(
    email: string,
    institution: string,
    priority: 'Baja' | 'Media' | 'Alta',
    description: string,
    tags: string[],
    attachments: string[]
  ): Observable<any> {
    const user = this.auth.currentUser();
    const username = user ? user.username : 'anonimo';

    const title = description.length > 60 ? description.substring(0, 57) + '...' : description;

    return this.http.post<any>(`${this.apiUrl}/tickets`, {
      title,
      description,
      institution
    }).pipe(
      tap(res => {
        // Create client ticket object
        const newTicket: Ticket = {
          id: res.ticket_id || 'tk_' + Math.random().toString(36).substring(2, 9),
          title,
          description,
          user_id: username,
          institution,
          priority,
          status: 'abierto',
          tags,
          attachments,
          created_at: new Date(),
          updated_at: new Date()
        };

        const updated = [newTicket, ...this.allTickets()];
        this.allTickets.set(updated);
        this.saveToStorage(username, updated);
      }),
      catchError(err => {
        const newTicket: Ticket = {
          id: 'tk_local_' + Math.random().toString(36).substring(2, 9),
          title,
          description,
          user_id: username,
          institution,
          priority,
          status: 'abierto',
          tags,
          attachments,
          created_at: new Date(),
          updated_at: new Date()
        };

        const updated = [newTicket, ...this.allTickets()];
        this.allTickets.set(updated);
        this.saveToStorage(username, updated);

        return of({ message: 'Ticket creado localmente (Modo Offline)', ticket_id: newTicket.id });
      })
    );
  }

  updateTicket(id: string, description: string, priority: 'Baja' | 'Media' | 'Alta', isUserEdit: boolean = false): Observable<any> {
    const user = this.auth.currentUser();
    const username = user ? user.username : 'anonimo';

    const updated = this.allTickets().map(t => {
      if (t.id === id) {
        return {
          ...t,
          description,
          priority,
          editCount: isUserEdit ? (t.editCount || 0) + 1 : (t.editCount || 0),
          updated_at: new Date()
        };
      }
      return t;
    });

    this.allTickets.set(updated);
    this.saveToStorage(username, updated);
    return of({ success: true });
  }

  deleteTicket(id: string): Observable<any> {
    const user = this.auth.currentUser();
    const username = user ? user.username : 'anonimo';

    const updated = this.allTickets().filter(t => t.id !== id);

    this.allTickets.set(updated);
    this.saveToStorage(username, updated);
    return of({ success: true });
  }

  private saveToStorage(username: string, tickets: Ticket[]): void {
    const key = `hsi_tickets_${username}`;
    localStorage.setItem(key, JSON.stringify(tickets));
  }
}
