import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuSemanaPage } from './tu-semana.page';

const routes: Routes = [
  {
    path: '',
    component: TuSemanaPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuSemanaPageRoutingModule {}
