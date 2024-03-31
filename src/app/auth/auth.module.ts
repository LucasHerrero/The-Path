import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router'; 
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AuthComponent 
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ])
  ]
})
export class AuthModule { }
