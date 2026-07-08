import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = '/api';

  currentUser = signal<any>(null);
  token = signal<string | null>(null);

  constructor() {
    this.restoreSession();
  }

  private decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const decoded = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }

  private restoreSession(): void {
    const savedToken = localStorage.getItem('hsi_token');
    const savedUser = localStorage.getItem('hsi_user');
    if (savedToken && savedUser) {
      this.token.set(savedToken);
      try {
        const userObj = JSON.parse(savedUser);
        if (!userObj.id) {
          const decoded = this.decodeToken(savedToken);
          if (decoded && decoded.user_id) {
            userObj.id = decoded.user_id;
          }
        }
        this.currentUser.set(userObj);
      } catch (e) {
        this.currentUser.set(null);
      }
    }
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }

  loginHSI(username: string, dni: string): Observable<any> {
    const trimmedUser = username.trim();
    const trimmedDni = dni.trim();

    return this.http.post<any>(`${this.apiUrl}/auth/login/hsi`, { username: trimmedUser, dni: trimmedDni }).pipe(
      tap(res => {
        if (res && res.status === 'success' && res.data && res.data.token) {
          const userToken = res.data.token;
          const decoded = this.decodeToken(userToken);
          const userId = decoded ? decoded.user_id : '';
          const userProfile = {
            id: userId,
            username: trimmedUser,
            dni: trimmedDni,
            firstName: trimmedUser.split('@')[0],
            role: 'user'
          };

          localStorage.setItem('hsi_token', userToken);
          localStorage.setItem('hsi_user', JSON.stringify(userProfile));

          this.token.set(userToken);
          this.currentUser.set(userProfile);
        }
      }),
      catchError(err => {
        return throwError(() => new Error(err.error?.message || 'Usuario no encontrado en el sistema. Verificá tus credenciales.'));
      })
    );
  }

  loginAgent(username: string, password: string): Observable<any> {
    const trimmedUser = username.trim();

    return this.http.post<any>(`${this.apiUrl}/auth/login/agent`, { username: trimmedUser, password }).pipe(
      tap(res => {
        if (res && res.status === 'success' && res.data && res.data.token) {
          const userToken = res.data.token;
          const decoded = this.decodeToken(userToken);
          const userId = decoded ? decoded.user_id : '';
          const userProfile = {
            id: userId,
            username: trimmedUser,
            firstName: trimmedUser.split('@')[0],
            role: 'agent'
          };

          localStorage.setItem('hsi_token', userToken);
          localStorage.setItem('hsi_user', JSON.stringify(userProfile));

          this.token.set(userToken);
          this.currentUser.set(userProfile);
        }
      }),
      catchError(err => {
        return throwError(() => new Error(err.error?.message || 'Credenciales inválidas. Verificá tu usuario y contraseña.'));
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${this.token()}`
      }
    }).pipe(
      tap(() => this.clearSession()),
      catchError(err => {
        this.clearSession();
        return throwError(() => err);
      })
    );
  }

  private clearSession(): void {
    localStorage.removeItem('hsi_token');
    localStorage.removeItem('hsi_user');
    this.token.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
