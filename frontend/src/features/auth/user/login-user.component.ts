import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
export class LoginUserComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  hsiEmail = '';
  hsiDni = '';
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

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