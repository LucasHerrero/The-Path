import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RutinasCreacionComponent } from './rutinas-creacion/rutinas-creacion.component';
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss'],
})
export class RutinasComponent  {

  constructor(private modalController : ModalController) { }


  async openModal() {
    const modal = await this.modalController.create({
      component: RutinasCreacionComponent

    });
    return await modal.present();
  }
 
}
