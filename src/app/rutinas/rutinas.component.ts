import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RutinasCreacionComponent } from './rutinas-creacion/rutinas-creacion.component';
import { Storage } from '@ionic/storage';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss'],
})
export class RutinasComponent  {
nombreRutina: string ="";
cantidadEjercicios: number = 0;
dia : string = "";


  constructor(private storage : Storage,private modalController : ModalController) {
    this.init();
   }



  async init() {


    const storage = await this.storage.create();
    this.storage = storage;
    await this.storage.remove('nombreRutina');
    await this.storage.remove('cantidadEjercicios');
    await this.storage.remove('dia');
  }

  async openModal() {
    this.guardarDatos();
    const modal = await this.modalController.create({
      component: RutinasCreacionComponent

    });
    return await modal.present();
  }

async guardarDatos(){
  await this.storage.set('nombreRutina', this.nombreRutina);
    await this.storage.set('cantidadEjercicios', this.cantidadEjercicios);
   await this.storage.set('dia', this.dia);
}

public isFormIncomplete(): boolean {
  return !this.nombreRutina || !this.dia || !this.cantidadEjercicios;
}

}
