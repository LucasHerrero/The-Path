import { Ejercicios } from './../Ejercicios';
import { RutinasCreacionService } from './rutinas-creacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-rutinas-creacion',
  templateUrl: './rutinas-creacion.component.html',
  styleUrls: ['./rutinas-creacion.component.scss'],
})
export class RutinasCreacionComponent implements OnInit {
Ejercicio : Ejercicios[] = [];
ejercicio : Ejercicios = {} as Ejercicios;
showMuscleGroups: any;
showEquipment: any;

  constructor(private modalController : ModalController,private rutinasCreacionService : RutinasCreacionService, private router: Router) { }

  ngOnInit() {
    this.rutinasCreacionService.getEjercicios().subscribe((data) => {
      this.Ejercicio = data;
      console.log(this.Ejercicio);
    });
  }

  verMas(ejercicio : Ejercicios) {
    this.closeModal();
    this.router.navigate(['/masinfo', ejercicio.id]);
    console.log(ejercicio);
  }

  async closeModal() {
    return await this.modalController.dismiss();
   }

   filterMuscle (evt : any){
    evt = evt.target.value;
    console.log(evt);

    this.rutinasCreacionService.getEjerciciosbySearchMuscle(evt).subscribe((data) => {
      this.Ejercicio = data;
      console.log(this.Ejercicio);
    });

  }

  filterEquipment (evt : any){

evt = evt.target.value;
console.log(evt);

this.rutinasCreacionService.getEjerciciosbySearchEquipment(evt).subscribe((data) => {
  this.Ejercicio = data;
  console.log(this.Ejercicio);
});


  }

   filterlist(evt : any){
     evt = evt.target.value;
     console.log(evt);

  if (evt.length > 2){

  this.rutinasCreacionService.getEjerciciosbySearchName(evt).subscribe((data) => {
    this.Ejercicio = data;
    console.log(this.Ejercicio);
  });

  }else {
    this.rutinasCreacionService.getEjercicios().subscribe((data) => {
      this.Ejercicio = data;
      console.log(this.Ejercicio);
    });
  }

   }

}



