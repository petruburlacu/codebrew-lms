import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'home', loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) },
];
