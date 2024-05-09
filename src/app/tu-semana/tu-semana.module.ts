import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TuSemanaPageRoutingModule } from './tu-semana-routing.module';

import { TuSemanaPage } from './tu-semana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TuSemanaPageRoutingModule
  ],
  declarations: [TuSemanaPage,
  ]
})
export class TuSemanaPageModule {}
