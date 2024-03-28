import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RutinasComponent } from './rutinas.component';

@NgModule({
  declarations: [RutinasComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RutinasComponent
      }
    ])
  ]
})
export class RutinasModule { }