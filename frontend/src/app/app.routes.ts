import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

const loginGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('../features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('../features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'tickets', 
    canActivate: [authGuard],
    loadComponent: () => import('../features/home/components/tickets-tab/tickets-tab.component').then(m => m.TicketsTabComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login' // Ahora sí, solo caerá aquí si escriben una URL que no existe
  }
];