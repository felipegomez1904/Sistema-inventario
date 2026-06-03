import { Component, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuteStateService } from '../aute-state.service';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-layout',
    template: `<button (click)="logOut()">salir</button>
    <router-outlet>./`,

})

export default class Layoutcomponent {
    private _router = inject(Router);
    private _auteState = inject(AuteStateService);
    
      async logOut(){
         await this._auteState.logOut();
         this._router.navigateByUrl('/aute/iniciar-sesion');
      }

}