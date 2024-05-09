import { dia } from './../rutinas/Rutina';
import { Component, OnInit } from '@angular/core';
import { TusRutinasService } from '../tus-rutinas/tus-rutinas.service';
import { RutinaEjercicio } from '../rutinas/RutinaEjercicio';
import { Ejercicios } from '../rutinas/Ejercicios';
import { ModalController } from '@ionic/angular';
import { MasinfoComponent } from '../rutinas/rutinas-creacion/masinfo/masinfo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tu-semana',
  templateUrl: './tu-semana.page.html',
  styleUrls: ['./tu-semana.page.scss'],
})
export class TuSemanaPage implements OnInit {
  selectedDay: dia = {} as dia;
  RutinaEjercicio: RutinaEjercicio[] = [];
  days2 : string[] = [];


  constructor( private route : Router, private tusRutinas : TusRutinasService, private modalController : ModalController) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

    const currentDay = new Date().getDay();
    this.selectedDay = days[currentDay] as dia;
  }
  ngOnInit() {
    var days2 = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

    this.tusRutinas.getTusRutinas(16).subscribe(
      (data) => {
        this.RutinaEjercicio = data;

        this.RutinaEjercicio.forEach((rutina => {
          days2 = days2.filter(day => day !== rutina.Rutina.Dia);

        }));
       this.days2 = days2;

      },
      (error) => {
        console.log(error);
      }
    );

  }


  async verMas(ejercicio: Ejercicios, event: Event) {
    event.stopPropagation();



  }
  agregarRutina() {
    this.route.navigate(['/rutinas']);
  }




}
