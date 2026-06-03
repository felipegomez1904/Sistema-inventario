import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuteStateService } from "../shared/aute-state.service";
import { map } from "rxjs";

export const privateGuard = (): CanActivateFn =>{
    return ()=>{
        const router = inject(Router);
        const authState = inject(AuteStateService);
        return authState.autestate$.pipe( 
            map((state) =>{
                console.log(state);
                if(!state){
                    router.navigateByUrl('/aute/iniciar-sesion');
                    return false;
                }
                return true;
                })
            );
};
};

export const publicGuard = (): CanActivateFn =>{
    return ()=>{
        const router = inject(Router);
        const authState = inject(AuteStateService);
        return authState.autestate$.pipe(
            map((state) =>{
                if(state){
                    router.navigateByUrl('/tareas');
                    return false;
                }
                return true;
            })
        );
};
};