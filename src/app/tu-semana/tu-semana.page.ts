import { dia } from './../rutinas/Rutina';
import { Component, OnInit } from '@angular/core';
import { TusRutinasService } from '../tus-rutinas/tus-rutinas.service';
import { RutinaEjercicio } from '../rutinas/RutinaEjercicio';
import { Ejercicios } from '../rutinas/Ejercicios';
import {
  ModalController,
  AlertController,
  ActionSheetController,
  ToastController,
} from '@ionic/angular';
import { MasinfoComponent } from '../rutinas/rutinas-creacion/masinfo/masinfo.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/Auth.service';
import { RutinasCreacionService } from '../rutinas/rutinas-creacion/rutinas-creacion.service';

@Component({
  selector: 'app-tu-semana',
  templateUrl: './tu-semana.page.html',
  styleUrls: ['./tu-semana.page.scss'],
})
export class TuSemanaPage implements OnInit {
  selectedDay: dia = {} as dia;
  RutinaEjercicio: RutinaEjercicio[] = [];
  days2: string[] = [];
  isAuthenticatedVar: boolean = false;
  ejerciciosSeleccionados: Ejercicios[] = [];
  isRoutineComplete = false;
  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private authService: AuthService,
    private route: Router,
    private tusRutinas: TusRutinasService,
    private rutinasCreacion: RutinasCreacionService,
    private toastController: ToastController
  ) {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];

    const currentDay = new Date().getDay();
    this.selectedDay = days[currentDay] as dia;
  }
  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticatedVar = true;
      }
    });
    var days2 = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];

    this.tusRutinas.getTusRutinas(16).subscribe(
      (data) => {
        this.RutinaEjercicio = data;

        this.RutinaEjercicio.forEach((rutina) => {
          days2 = days2.filter((day) => day !== rutina.Rutina.Dia);
        });
        this.days2 = days2;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refresh() {
    this.ejerciciosSeleccionados = [];
    console.log('refresh');
    console.log(this.ejerciciosSeleccionados);
  }
  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Rutina agregada con exito.',
      duration: 2000,
      color: 'success',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark',
        },
      ],
    });
    toast.present();
  }

  async updateDay(id: number, Dia: string) {
    const dia = {
      Dia: Dia,
    };

    this.rutinasCreacion.updateRutinaDay(id, dia).subscribe((data) => {
      if (dia.Dia === '') {
      } else {
        this.presentToastSuccess();
      }
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
  }
  async verMas(ejercicio: Ejercicios, event: Event) {
    event.stopPropagation();
  }
  crearRutina() {
    this.route.navigate(['/rutinas']);
  }

  async presentRutinasActionSheet() {
    type Button = {
      text: string;
      handler: () => void;
      role?: string;
    };

    const buttons: Button[] = this.RutinaEjercicio.map((rutina) => ({
      text: rutina.Rutina.nombre,
      handler: () => {
        this.updateDay(rutina.Rutina.id, this.selectedDay);
      },
    }));

    // Agrega un botón de cancelar
    buttons.push({
      text: 'Cancelar',
      handler() {},
      role: 'cancel',
    });

    // Crea y presenta el ActionSheet
    const actionSheet = await this.actionSheetController.create({
      header: 'Tus Rutinas',
      buttons,
    });

    await actionSheet.present();
  }
  async logeate() {
    const alert = await this.alertController.create({
      header: '¿Parece que no has iniciado sesión?',
      subHeader: 'Inicia sesión para poder ver tus rutinas',

      buttons: ['Iniciar Sesion'],
    });

    await alert.present();

    await alert.onDidDismiss().then(() => {
      this.route.navigate(['/auth']);
    });
  }
  logCheckedExercise(ejercicio: Ejercicios, cantidadEj: number) {
    if (this.ejerciciosSeleccionados.includes(ejercicio)) {
      this.ejerciciosSeleccionados = this.ejerciciosSeleccionados.filter(
        (e) => e !== ejercicio
      );
    } else {
      this.ejerciciosSeleccionados.push(ejercicio);
    }
    console.log(this.ejerciciosSeleccionados);
    console.log(cantidadEj);
    this.isRoutineComplete = this.ejerciciosSeleccionados.length === cantidadEj;
  }
  isSelected(ejercicio: Ejercicios) {
    return this.ejerciciosSeleccionados.includes(ejercicio);
  }
  async presentToastFinish(msg: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: 'success',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: icon,
        },
      ],
    });
    toast.present();
  }
  async rutinaFinalizada() {
    const msg: string = 'Haz completado la rutina. ¡Felicidades!';
    const icon: string = 'checkmark';
    setTimeout(() => {
      location.reload();
    }, 2000);
    this.presentToastFinish(msg, icon);
  }

  async removeDay(id: number) {
    const msg: string = 'Rutina eliminada con exito.';
    const icon: string = 'trash-outline';
    await this.updateDay(id, '').then(() => {
      setTimeout(() => {
        location.reload();
      }, 2000);
      this.presentToastFinish(msg, icon);
    });
  }
}
