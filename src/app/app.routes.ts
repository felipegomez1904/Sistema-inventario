import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/aute.guard'; // Los guardias de autenticación
import { ListaTareasComponent } from './tareas/funciones/tareas-lista/tareas-lista.component'; // Importa el ListaTareasComponent correcto
import { EquiposComponent } from './tareas/funciones/equipos/equipos.component';
import { GruasComponent } from './tareas/funciones/gruas/gruas.component';
import { MantenimientoComponent } from './tareas/funciones/mantenimiento/mantenimiento.component';
import { GruasVistaComponent } from './vistas/gruas-vista/gruas-vista.component';
import { EquiposVistaComponent } from './vistas/equipos-vista/equipos-vista.component';

export const routes: Routes = [
  {
    path: 'aute',
    canActivateChild: [publicGuard()],
    loadChildren: () => import('./aute/funciones/aute.routes'),
  },
  {
    path: 'tareas',
    component: ListaTareasComponent, 
    canActivate: [privateGuard()],  
  },
  {
    path: 'gruas',
    component: GruasComponent, 
    canActivate: [privateGuard()], 
  },
  {
    path: 'equipos',
    component: EquiposComponent,
    canActivate: [privateGuard()],
  },
  {
    path: 'mantenimiento',
    component: MantenimientoComponent,
    canActivate: [privateGuard()],
  },
  {
    path: 'list-grua',
    component: GruasVistaComponent,
    canActivate: [privateGuard()],
  },
  {
    path: 'list-equipo',
    component: EquiposVistaComponent,
    canActivate: [privateGuard()],
  },
  {
    path: '**',
    redirectTo: '/aute/iniciar-sesion', // Redirigir al login si no hay ruta válida
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
