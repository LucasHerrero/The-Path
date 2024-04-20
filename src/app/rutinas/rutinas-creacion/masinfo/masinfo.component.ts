import { Component, OnInit } from '@angular/core';
import { Ejercicios } from '../../Ejercicios';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RutinasCreacionComponent } from '../rutinas-creacion.component';

@Component({
  selector: 'app-masinfo',
  templateUrl: './masinfo.component.html',

})
export class MasinfoComponent {
  ejercicio : Ejercicios = {} as Ejercicios;

  constructor(private modalcontroller:ModalController,private router : Router,private route : ActivatedRoute ) { }
   id = this.route.snapshot.paramMap.get('id');


   async volver(){

    const modal = await this.modalcontroller.create({
      component: RutinasCreacionComponent

    });
    return await modal.present();
   }

}
