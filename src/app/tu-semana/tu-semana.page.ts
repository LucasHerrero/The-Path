import { TusRutinasService } from './../tus-rutinas/tus-rutinas.service';
import { dia } from './../rutinas/Rutina';
import { Component, OnInit } from '@angular/core';
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
import { IntJwtPayload } from '../auth/IntJwtPayload';
import { LoadingController } from '@ionic/angular';

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
  ejerciciosInfo: Ejercicios[] = [];
  isRoutineComplete = false;
  userId: number = 0;
  noRutinas: boolean = false;
  check: boolean = false;
  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private authService: AuthService,
    private route: Router,
    private tusRutinas: TusRutinasService,
    private rutinasCreacion: RutinasCreacionService,
    private toastController: ToastController,
    private loadingController: LoadingController
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
    this.presentLoading();
    var days2 = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticatedVar = true;

        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          this.userId = decodedToken.userId;
          this.tusRutinas.getTusRutinas(decodedToken.userId).subscribe(
            (data) => {
              console.log(data);
              if (data) {
                this.noRutinas = true;
              }
              this.RutinaEjercicio = data;
              this.dismissLoading();

              this.RutinaEjercicio.forEach((rutina) => {
                days2 = days2.filter((day) => day !== rutina.Rutina.Dia);
              });
              this.days2 = days2;
            },
            (error) => {
              this.presentToastError(
                'Error al cargar las rutinas',
                'close-circle'
              );
              this.dismissLoading();
            }
          );
        });
      }
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });
    await loading.present();
  }
  async dismissLoading() {
    await this.loadingController.dismiss();
  }
  refresh() {
    this.ejerciciosSeleccionados = [];
    this.ejerciciosInfo = [];
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
  logCheckedInfo(ejercicio: Ejercicios) {
    if (this.ejerciciosSeleccionados.includes(ejercicio)) {
    } else {
      if (this.ejerciciosInfo.includes(ejercicio)) {
        this.ejerciciosInfo = this.ejerciciosInfo.filter(
          (e) => e !== ejercicio
        );
      } else {
        this.ejerciciosInfo.push(ejercicio);
      }
    }
  }

  logCheckedExercise(ejercicio: Ejercicios, cantidadEj: number) {
    if (this.ejerciciosSeleccionados.includes(ejercicio)) {
      this.ejerciciosSeleccionados = this.ejerciciosSeleccionados.filter(
        (e) => e !== ejercicio
      );
      // Si el ejercicio está en ejerciciosInfo, lo removemos
    } else {
      this.ejerciciosSeleccionados.push(ejercicio);
    }
    if (this.ejerciciosInfo.includes(ejercicio)) {
      this.ejerciciosInfo = this.ejerciciosInfo.filter((e) => e !== ejercicio);
    }
    this.isRoutineComplete = this.ejerciciosSeleccionados.length === cantidadEj;
  }

  isSelected(ejercicio: Ejercicios) {
    return this.ejerciciosSeleccionados.includes(ejercicio);
  }
  isSelectedInfo(ejercicio: Ejercicios) {
    return this.ejerciciosInfo.includes(ejercicio);
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
  async presentToastError(msg: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: 'danger',
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
  async rutinaFinalizada(idRutina: number) {
    const msg: string = 'Haz completado la rutina. ¡Felicidades!';
    const icon: string = 'checkmark';

    this.ejerciciosSeleccionados.forEach((ejercicio) => {
  
      const rutinaPut = {
        idRutina: idRutina,
        idEjercicio: ejercicio.id,
        kg: ejercicio.kg,
        reps: ejercicio.reps,
        sets: ejercicio.sets,
      };

      this.tusRutinas.editRutinaskg(this.userId, rutinaPut).subscribe(
        (data) => {
          this.presentToastFinish(msg, icon);
        },
        (error) => {
          console.log(error);
          this.presentToastError('Error al guardar los datos', 'close-circle');
        }
      );
    });
  }

  async removeDay(id: number) {
    const msg: string = 'Has quitado la rutina de tu semana.';
    const icon: string = 'trash-outline';
    await this.updateDay(id, '').then(() => {
      setTimeout(() => {
        location.reload();
      }, 2000);
      this.presentToastFinish(msg, icon);
    });
  }
}
