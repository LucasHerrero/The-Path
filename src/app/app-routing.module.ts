import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MasinfoComponent } from './rutinas/rutinas-creacion/masinfo/masinfo.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule),
    // canActivate: [AuthGuard] EJEMPLO PARA ASEGURAR UNA RUTA.
  },
  {
    path: 'rutinas',
    loadChildren: () => import('./rutinas/rutinas.module').then( m => m.RutinasModule),

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'masinfo/:id',
    component: MasinfoComponent,

  },
  {
    path: 'tus-rutinas',
    loadChildren: () => import('./tus-rutinas/tus-rutinas.module').then( m => m.TusRutinasPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
