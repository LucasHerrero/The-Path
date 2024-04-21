import { Ejercicios } from './../Ejercicios';
import { RutinasCreacionService } from './rutinas-creacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController,AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-rutinas-creacion',
  templateUrl: './rutinas-creacion.component.html',
  styleUrls: ['./rutinas-creacion.component.scss'],
})
export class RutinasCreacionComponent implements OnInit {
  Ejercicio: Ejercicios[] = [];
  ejercicio: Ejercicios = {} as Ejercicios;
  ejerciciosSeleccionados: Ejercicios[] = [];
  showMuscleGroups: any;
  showEquipment: any;
  nombreRutina: string = '';
  cantidadEjercicios: number = 0;

  constructor(
    private modalController: ModalController,
    private rutinasCreacionService: RutinasCreacionService,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.guardarDatos();
  }

  ngOnInit() {
    this.rutinasCreacionService.getEjercicios().subscribe((data) => {
      this.Ejercicio = data;
    });
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message:
        'Ya has seleccionado la cantidad de ejercicios necesarios para tu rutina',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async guardarDatos() {
    console.log('entro a guardar datos');
    this.nombreRutina = await this.storage.get('nombreRutina');
    this.cantidadEjercicios = await this.storage.get('cantidadEjercicios');
    console.log(this.nombreRutina);
    console.log(this.cantidadEjercicios);
  }
  verMas(ejercicio: Ejercicios) {


    this.closeModal();
    this.router.navigate(['/masinfo', ejercicio.id]);
    console.log(ejercicio);
  }

  async closeModal() {
    return await this.modalController.dismiss();
  }

  filterMuscle(evt: any) {
    evt = evt.target.value;
    console.log(evt);

    this.rutinasCreacionService
      .getEjerciciosbySearchMuscle(evt)
      .subscribe((data) => {
        this.Ejercicio = data;
        console.log(this.Ejercicio);
      });
  }

  filterEquipment(evt: any) {
    evt = evt.target.value;
    console.log(evt);

    this.rutinasCreacionService
      .getEjerciciosbySearchEquipment(evt)
      .subscribe((data) => {
        this.Ejercicio = data;
        console.log(this.Ejercicio);
      });
  }

  filterlist(evt: any) {
    evt = evt.target.value;
    console.log(evt);

    if (evt.length > 2) {
      this.rutinasCreacionService
        .getEjerciciosbySearchName(evt)
        .subscribe((data) => {
          this.Ejercicio = data;
          console.log(this.Ejercicio);
        });
    } else {
      this.rutinasCreacionService.getEjercicios().subscribe((data) => {
        this.Ejercicio = data;
        console.log(this.Ejercicio);
      });
    }
  }

  seleccionarEjercicio(ejercicio: Ejercicios) {
    console.log("entro a seleccionar ejercicio");
    if (ejercicio) {
      if (this.ejerciciosSeleccionados.includes(ejercicio)) {
        this.ejerciciosSeleccionados = this.ejerciciosSeleccionados.filter(
          (e) => e !== ejercicio
        );
      } else {
        if (this.ejerciciosSeleccionados.length >= this.cantidadEjercicios) {
          this.mostrarAlerta();
        } else {
          this.ejerciciosSeleccionados.push(ejercicio);
        }
      }
    }
  }

  isSelected(ejercicio: Ejercicios) {
    return this.ejerciciosSeleccionados.includes(ejercicio);
  }
}
