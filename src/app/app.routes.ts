import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.HomeComponent)
  },
  {
    path: 'news',
    loadComponent: () => import('./news/news').then(m => m.NewsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
