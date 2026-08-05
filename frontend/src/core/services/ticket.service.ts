import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';

export interface TicketMessage {
  id: string;
  sender_id: string;
  role: 'bot' | 'user' | 'agent' | 'system' | 'admin' | 'owner';
  content: string;
  created_at: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  user_id: string;
  institution: string;
  priority: string;
  status: 'abierto' | 'en_progreso' | 'resuelto' | 'transferido' | 'reabierto';
  tags: string[];
  attachments: string[];
  created_at: Date;
  updated_at: Date;
  messages?: TicketMessage[];
  editCount?: number;
  assigned_to?: string;
  closed_at?: Date;
  resolved_at?: Date;
  reopened_at?: Date;
  transfer_reason?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = '/api';

  private allTickets = signal<Ticket[]>([]);

  tickets = computed(() => this.allTickets());
  hasTickets = computed(() => this.allTickets().length > 0);
  activeCount = computed(() => this.allTickets().filter(t => 
    t.status === 'abierto' || 
    t.status === 'en_progreso' || 
    t.status === 'reabierto' || 
    t.status === 'transferido'
  ).length);

  constructor() {
    this.auth.currentUser;
  }

  loadTicketsForUser(username: string): void {
    const token = this.auth.token();
    if (!token) {
      this.allTickets.set([]);
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}/tickets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (res) => {
        const parsed = res.map((t: any) => ({
          ...t,
          created_at: new Date(t.created_at),
          updated_at: new Date(t.updated_at),
          closed_at: t.closed_at ? new Date(t.closed_at) : undefined,
          resolved_at: t.resolved_at ? new Date(t.resolved_at) : undefined,
          reopened_at: t.reopened_at ? new Date(t.reopened_at) : undefined,
          messages: t.messages ? t.messages.map((m: any) => ({
            ...m,
            created_at: new Date(m.created_at)
          })) : []
        }));
        this.allTickets.set(parsed);
      },
      error: (err) => {
        console.error('Error loading tickets from backend:', err);
        this.allTickets.set([]);
      }
    });
  }

  clearTickets(): void {
    this.allTickets.set([]);
  }

  getTicketDetails(id: string): Observable<Ticket> {
    const token = this.auth.token();
    return this.http.get<any>(`${this.apiUrl}/tickets/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(t => {
        const parsed: Ticket = {
          ...t,
          created_at: new Date(t.created_at),
          updated_at: new Date(t.updated_at),
          closed_at: t.closed_at ? new Date(t.closed_at) : undefined,
          resolved_at: t.resolved_at ? new Date(t.resolved_at) : undefined,
          reopened_at: t.reopened_at ? new Date(t.reopened_at) : undefined,
          messages: t.messages ? t.messages.map((m: any) => ({
            ...m,
            created_at: new Date(m.created_at)
          })) : []
        };
        const updated = this.allTickets().map(x => x.id === id ? parsed : x);
        this.allTickets.set(updated);
      })
    );
  }

  createTicket(
    email: string,
    institution: string,
    priority: string,
    title: string,
    description: string,
    tags: string[],
    attachments: string[]
  ): Observable<any> {
    const token = this.auth.token();

    return this.http.post<any>(`${this.apiUrl}/tickets`, {
      title,
      description,
      institution,
      priority,
      tags,
      attachments
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(res => {
        const t = res.ticket;
        const newTicket: Ticket = {
          id: t.id,
          title: t.title,
          description: t.description,
          user_id: t.user_id,
          institution: t.institution,
          priority: t.priority,
          status: t.status,
          tags: t.tags || [],
          attachments: t.attachments || [],
          created_at: new Date(t.created_at),
          updated_at: new Date(t.updated_at),
          messages: []
        };

        const updated = [newTicket, ...this.allTickets()];
        this.allTickets.set(updated);
      })
    );
  }

  updateTicket(id: string, description: string, priority: string, isUserEdit: boolean = false): Observable<any> {
    const token = this.auth.token();

    return this.http.put<any>(`${this.apiUrl}/tickets/${id}`, {
      description,
      priority
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(res => {
        const updated = this.allTickets().map(t => {
          if (t.id === id) {
            return {
              ...t,
              description: res.description || description,
              priority: res.priority || priority,
              editCount: res.editCount ?? ((t.editCount || 0) + (isUserEdit ? 1 : 0)),
              updated_at: res.updated_at ? new Date(res.updated_at) : new Date()
            };
          }
          return t;
        });
        this.allTickets.set(updated);
      })
    );
  }

  addComment(ticketId: string, text: string): Observable<any> {
    const token = this.auth.token();

    return this.http.post<any>(`${this.apiUrl}/tickets/${ticketId}/messages`, {
      content: text
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(res => {
        const newMsg: TicketMessage = {
          id: res.id,
          sender_id: res.sender_id,
          role: res.role,
          content: res.content,
          created_at: new Date(res.created_at)
        };

        const updated = this.allTickets().map(t => {
          if (t.id === ticketId) {
            return {
              ...t,
              messages: [...(t.messages || []), newMsg]
            };
          }
          return t;
        });
        this.allTickets.set(updated);
      })
    );
  }

  updateTicketStatus(id: string, status: string): Observable<any> {
    const token = this.auth.token();
    return this.http.put<any>(`${this.apiUrl}/tickets/${id}/status`, {
      status: status
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(res => {
        const updated = this.allTickets().map(t => {
          if (t.id === id) {
            return {
              ...t,
              status: res.status,
              updated_at: new Date(res.updated_at),
              closed_at: res.closed_at ? new Date(res.closed_at) : undefined,
              resolved_at: res.resolved_at ? new Date(res.resolved_at) : undefined,
              reopened_at: res.reopened_at ? new Date(res.reopened_at) : undefined
            };
          }
          return t;
        });
        this.allTickets.set(updated);
      })
    );
  }

  assignTicket(id: string, agentId: string, reason?: string): Observable<any> {
    const token = this.auth.token();
    return this.http.put<any>(`${this.apiUrl}/tickets/${id}/assign`, {
      assigned_to: agentId,
      reason: reason || ''
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(res => {
        const updated = this.allTickets().map(t => {
          if (t.id === id) {
            return {
              ...t,
              status: res.status,
              assigned_to: res.assigned_to || agentId,
              updated_at: new Date(res.updated_at),
              closed_at: res.closed_at ? new Date(res.closed_at) : undefined,
              resolved_at: res.resolved_at ? new Date(res.resolved_at) : undefined,
              reopened_at: res.reopened_at ? new Date(res.reopened_at) : undefined
            };
          }
          return t;
        });
        this.allTickets.set(updated);
      })
    );
  }

  getAgents(): Observable<any[]> {
    const token = this.auth.token();
    return this.http.get<any[]>(`${this.apiUrl}/agents`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getTags(): Observable<any[]> {
    const token = this.auth.token();
    return this.http.get<any[]>(`${this.apiUrl}/tags`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteTicket(id: string): Observable<any> {
    return of({ success: true });
  }
}
