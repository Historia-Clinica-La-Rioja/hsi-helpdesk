import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sso-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; color: #555;">
      <div class="spinner"></div>
      <p style="margin-top: 16px;">Verificando credenciales con HSI...</p>
      
      <style>
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    </div>
  `
})
export class SsoRedirectComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const hsiToken = params['token'];

      if (hsiToken) {
        this.authService.loginSSO(hsiToken).subscribe({
          next: (res: any) => {
            if (res && res.status === 'requires_registration') {
              this.router.navigate(['/login/user'], {
                queryParams: {
                  sso_username: res.data.username,
                  sso_token: hsiToken 
                }
              });
            } else {
              this.router.navigate(['/home/tickets']);
            }
          },
          error: (err) => {
            console.error('Fallo el SSO:', err);
            this.router.navigate(['/login/user']);
          }
        });
      } else {
        this.router.navigate(['/login/user']);
      }
    });
  }
}