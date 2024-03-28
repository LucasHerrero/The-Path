import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component'; // Importa el componente HomeComponent
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    HomeComponent // Declara el componente HomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([ // Agrega una ruta para el componente HomeComponent
      {
        path: '',
        component: HomeComponent
      }
    ])
  ]
})
export class HomeModule { }
