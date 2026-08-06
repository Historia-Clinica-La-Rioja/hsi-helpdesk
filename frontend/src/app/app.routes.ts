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
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];