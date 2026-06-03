import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./tareas-lista/tareas-lista.component').then(m => m.ListaTareasComponent),
  }
  
] as Routes;

