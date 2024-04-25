import { Ejercicios } from './../Ejercicios';
import { RutinasCreacionService } from './rutinas-creacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MasinfoComponent } from './masinfo/masinfo.component';
import { ActionSheetController } from '@ionic/angular';

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
    private alertController: AlertController,
    public actionSheetController: ActionSheetController
  ) {
    this.guardarDatos();
  }

  ngOnInit() {
    this.rutinasCreacionService.getEjercicios().subscribe((data) => {
      this.Ejercicio = data;
    });
  }

  async presentEquipmentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Equipamiento',
      buttons: [
        { text: 'Todos', handler: () => this.filterEquipment('') },
        { text: 'Barra', handler: () => this.filterEquipment('Barra') },
        {
          text: 'Mancuernas',
          handler: () => this.filterEquipment('Mancuerna'),
        },
        { text: 'Máquina', handler: () => this.filterEquipment('Máquina') },
      ],
    });

    await actionSheet.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Grupos Musculares',

      buttons: [
        {
          text: 'Todos',
          handler: () => {
            this.rutinasCreacionService.getEjercicios().subscribe((data) => {
              this.Ejercicio = data;
            });
          },
        },
        {
          text: 'Pecho',
          handler: () => {
            this.filterMuscle('Pecho');
          },
        },
        {
          text: 'Espalda',
          handler: () => {
            this.filterMuscle('Espalda');
          },
        },
        {
          text: 'Piernas',
          handler: () => {
            this.filterMuscle('Piernas');
          },
        },
        {
          text: 'Hombros',
          handler: () => {
            this.filterMuscle('Hombros');
          },
        },
        {
          text: 'Brazos',
          handler: () => {
            this.filterMuscle('Brazos');
          },
        },
        {
          text: 'Glúteos',
          handler: () => {
            this.filterMuscle('Glúteos');
          },
        },
        {
          text: 'Abdominales',
          handler: () => {
            this.filterMuscle('Abdominales');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
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

  async verMas(ejercicio: Ejercicios, event: Event) {
    event.stopPropagation();

    const modal = await this.modalController.create({
      component: MasinfoComponent,
      componentProps: {
        ejercicio: ejercicio,
      },
    });

    return await modal.present();
  }

  async closeModal() {
    return await this.modalController.dismiss();
  }

  filterMuscle(evt: any) {
    console.log(evt);

    this.rutinasCreacionService
      .getEjerciciosbySearchMuscle(evt)
      .subscribe((data) => {
        this.Ejercicio = data;
        console.log(this.Ejercicio);
      });
  }

  filterEquipment(evt: any) {
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
    console.log('entro a seleccionar ejercicio');
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
    console.log(this.ejerciciosSeleccionados);
  }

  isSelected(ejercicio: Ejercicios) {
    return this.ejerciciosSeleccionados.includes(ejercicio);
  }

  async guardarRutina() {
    const data = {
      nombre: this.nombreRutina,
      cantidadEj: this.cantidadEjercicios,
      userFk: 1
    };
    console.log(data);
  }

}
