import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HsiRobotLogoComponent } from '../../../shared/components/hsi-robot-logo/hsi-robot-logo.component';
import { HsiHalftoneComponent } from '../../../shared/components/hsi-halftone/hsi-halftone.component';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HsiRobotLogoComponent, HsiHalftoneComponent],
  templateUrl: './login-user.component.html',
  styleUrl: './login.component.scss' 
})
export class LoginUserComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); 

  hsiEmail = '';
  hsiDni = '';
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  showSsoModal = signal(false);
  ssoUsername = signal('');
  ssoDni = '';
  pendingSsoToken = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const ssoUsername = params['sso_username'];
      const ssoToken = params['sso_token'];
      const directToken = params['token'];

      if (ssoToken) {
        this.ssoUsername.set(ssoUsername || '');
        this.pendingSsoToken = ssoToken;
        this.showSsoModal.set(true);
        return;
      }

      if (directToken) {
        this.handleSSOLogin(directToken);
      }
    });
  }

  handleSSOLogin(token: string): void {
    this.isLoading.set(true);
    this.authService.loginSSO(token).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        
        if (res && res.status === 'requires_registration') {
          this.ssoUsername.set(res.data.username);
          this.showSsoModal.set(true); 
        } else {
          this.router.navigate(['/home/tickets']); 
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      }
    });
  }

  onCompleteSSO(): void {
    this.errorMessage.set(null);
    if (!this.ssoUsername().trim() || !this.ssoDni.trim()) {
      this.errorMessage.set('El correo institucional y el DNI son obligatorios.');
      return;
    }

    this.isLoading.set(true);
    // 🔥 Enviamos el email tipeado, el DNI y el Token
    this.authService.completeSSORegistration(this.ssoUsername(), this.ssoDni, this.pendingSsoToken).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.showSsoModal.set(false);
        this.router.navigate(['/home/tickets']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      }
    });
  }
  onSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading.set(true);
    this.errorMessage.set(null);

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
  }
}