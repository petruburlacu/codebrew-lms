import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./../nx-welcome.component').then(
  //       (c) => c.NxWelcomeComponent
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [] // Provide the service here
})
export class DashboardRoutingModule {}