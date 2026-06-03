import { Routes } from "@angular/router";

export default [
    {
        path: 'unirse',
        loadComponent: () => import ('./unirse/unirse.component'),
    },
    {
        path: 'iniciar-sesion',
        loadComponent: () => import ('./iniciar-sesion/iniciar-sesion.component'),
    }
] as Routes