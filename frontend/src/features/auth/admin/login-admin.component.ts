import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HsiHalftoneComponent } from '../../../shared/components/hsi-halftone/hsi-halftone.component';
import { HsiRobotLogoComponent } from '../../../shared/components/hsi-robot-logo/hsi-robot-logo.component';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HsiRobotLogoComponent, HsiHalftoneComponent],
  templateUrl: './login-admin.component.html',
  styleUrl: '../user/login.component.scss',
})
export class LoginAdminComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  adminUsername = '';
  adminPassword = '';
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading.set(true);
    this.errorMessage.set(null);

    if (!this.adminUsername.trim() || !this.adminPassword.trim()) {
      this.isLoading.set(false);
      this.errorMessage.set('Usuario y contraseña son obligatorios.');
      return;
    }

    this.authService.loginAgent(this.adminUsername, this.adminPassword).subscribe({
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