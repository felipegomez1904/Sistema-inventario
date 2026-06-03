import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuteStateService } from '../../../shared/aute-state.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './tareas-lista.component.html',
  styleUrls: ['./tareas-lista.component.scss'],
})
export class ListaTareasComponent {
  private _auteStateService = inject(AuteStateService);
  private _router = inject(Router);

  logout() {
    this._auteStateService
      .logOut()
      .then(() => {
        toast.success('Sesión cerrada correctamente');
        this._router.navigateByUrl('/aute/iniciar-sesion');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        toast.error('No se pudo cerrar sesión');
      });
  }
  navigateTo(route: string) {
    this._router.navigateByUrl(route);
  }
}




