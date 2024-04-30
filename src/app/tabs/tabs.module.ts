import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'rutinas',
        loadChildren: () =>
          import('../rutinas/rutinas.module').then((m) => m.RutinasModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'tus-rutinas',
        loadChildren: () => import('../tus-rutinas/tus-rutinas.module').then(m => m.TusRutinasPageModule)
      }
    ]),
  ],
})
export class TabsModule {}
