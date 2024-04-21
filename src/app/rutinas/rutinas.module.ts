import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RutinasComponent } from './rutinas.component';
import { RutinasCreacionComponent } from './rutinas-creacion/rutinas-creacion.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [RutinasComponent,
    RutinasCreacionComponent,

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,

    RouterModule.forChild([
      {
        path: '',
        component: RutinasComponent
      }
    ])
  ],

})
export class RutinasModule { }
