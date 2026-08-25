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
  router.navigate(['/login/user']);
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
  // 1. Ruta para usuarios HSI
  {
    path: 'login/user',
    canActivate: [loginGuard],
    loadComponent: () => import('../features/auth/user/login-user.component').then(m => m.LoginUserComponent)
  },
  // 2. Ruta oculta para Administradores
  {
    path: 'login/admin',
    canActivate: [loginGuard],
    loadComponent: () => import('../features/auth/admin/login-admin.component').then(m => m.LoginAdminComponent)
  },
  {
    path: 'login',
    redirectTo: 'login/user',
    pathMatch: 'full'
  },
  {
    path: 'sso-redirect',
    loadComponent: () => import('../features/auth/sso-redirect/sso-redirect').then(m => m.SsoRedirectComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('../features/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: 'about',
        loadComponent: () => import('../features/home/components/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'tickets',
        loadComponent: () => import('../features/home/components/tickets-tab/tickets-tab.component').then(m => m.TicketsTabComponent)
      },
      {
        path: 'training',
        loadComponent: () => import('../features/home/components/training/training.component').then(m => m.TrainingComponent)
      },
      {
        path: 'knowledge-base',
        loadComponent: () => import('../features/home/components/knowledge-base/knowledge-base.component').then(m => m.KnowledgeBaseComponent)
      },
      {
        path: '',
        redirectTo: 'tickets',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login/user',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login/user'
  }
];