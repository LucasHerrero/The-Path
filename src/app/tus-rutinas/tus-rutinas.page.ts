import { AuthService } from './../auth/Auth.service';
import { TusRutinasService } from './tus-rutinas.service';
import { Component, OnInit } from '@angular/core';
import { RutinaEjercicio } from '../rutinas/RutinaEjercicio';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { IntJwtPayload } from '../auth/IntJwtPayload';
import { ModalController } from '@ionic/angular';
import { RutinasCreacionComponent } from '../rutinas/rutinas-creacion/rutinas-creacion.component';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tus-rutinas',
  templateUrl: './tus-rutinas.page.html',
  styleUrls: ['./tus-rutinas.page.scss'],
})
export class TusRutinasPage implements OnInit {
  RutinaEjercicioORG: RutinaEjercicio[] = [];
  idUser: number = 0;
  RutinaEjercicio: RutinaEjercicio[] = [];
  isAuthenticatedVar = true;
  noRutinas: boolean = true;
  deleteButton: boolean = false;
  deleteEjercicios: boolean = false;
  rutinaSeleccionada: number[] = [];

  constructor(
    private tusRutinasService: TusRutinasService,
    private authService: AuthService,
    private alertController: AlertController,
    private route: Router,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.presentLoading();
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticatedVar = true;
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          console.log('idToken', decodedToken.userId);
          this.idUser = decodedToken.userId;

          this.tusRutinasService
            .getTusRutinas(decodedToken.userId)
            .subscribe((data) => {
              console.log(data);
              this.dismissLoading();
              if (data.length == 0) {
                this.noRutinas = true;
              } else {
                this.noRutinas = false;
              }

              this.RutinaEjercicio = data;
              this.RutinaEjercicioORG = data;
            });
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

  filterlist(evt: any) {
    if (evt.target !== undefined) {
      evt = evt.target.value;
    } else {
      evt = evt;
    }
    if (evt.length > 1) {
      this.tusRutinasService
        .getRutinasSearchByName(this.idUser, evt)
        .subscribe((data) => {
          console.log(data);
          this.RutinaEjercicio = data;
        });
    } else {
      this.authService.isAuthenticated().then((isAuthenticated) => {
        if (isAuthenticated) {
          this.isAuthenticatedVar = true;
          this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
            this.tusRutinasService
              .getTusRutinas(decodedToken.userId)
              .subscribe((data) => {
                this.RutinaEjercicio = data;
              });
          });
        }
      });
    }
  }

  async presentRutinasSheet() {
    var nombre = '';
    type Button = {
      text: string;
      handler: () => void;
      role?: string;
    };

    const buttons: Button[] = this.RutinaEjercicioORG.map((rutina) => ({
      text: rutina.Rutina.nombre,
      handler: () => {
        nombre = rutina.Rutina.nombre;
        this.filterlist(nombre);
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
  filterByDay(day: string) {
    this.tusRutinasService
      .getRutinasSearchByDay(this.idUser, day)
      .subscribe((data) => {
        this.RutinaEjercicio = data;
        console.log('Rutina', this.RutinaEjercicio);
      });
  }
  async presentDayActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Grupos Musculares',

      buttons: [
        {
          text: 'Lunes',
          handler: () => {
            this.filterByDay('Lunes');
          },
        },
        {
          text: 'Martes',
          handler: () => {
            this.filterByDay('Martes');
          },
        },
        {
          text: 'Miercoles',
          handler: () => {
            this.filterByDay('Miercoles');
          },
        },
        {
          text: 'Jueves',
          handler: () => {
            this.filterByDay('Jueves');
          },
        },
        {
          text: 'Viernes',
          handler: () => {
            this.filterByDay('Viernes');
          },
        },
        {
          text: 'Sabado',
          handler: () => {
            this.filterByDay('Sabado');
          },
        },
        {
          text: 'Domingo',
          handler: () => {
            this.filterByDay('Domingo');
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

  editRutinaAbrirYCerrar() {
    if (this.deleteButton == true && this.deleteEjercicios == true) {
      this.deleteButton = false;
      this.deleteEjercicios = false;
    } else {
      this.deleteButton = true;
      this.deleteEjercicios = true;
    }
  }

  deleteRutina(idRutina: number) {
    console.log('idRutina', idRutina);
  }

  async addEjercicio() {
    this.storage.create();
    this.storage.set('rutina', true);
    this.storage.set('cantidadEjercicios', 1);
    const modal = await this.modalController.create({
      component: RutinasCreacionComponent,
    });
    return await modal.present();
  }

  deleteEjercicio(idEjercicio: number) {
    console.log(idEjercicio);
  }

  // logCheckedExercise(rutinaId: number) {
  //   if (this.rutinaSeleccionada.includes(rutinaId)) {
  //     this.rutinaSeleccionada = this.rutinaSeleccionada.filter(
  //       (i) => i !== rutinaId
  //     );
  //     // Si el ejercicio está en ejerciciosInfo, lo removemos
  //   } else {
  //     this.rutinaSeleccionada.push(rutinaId);
  //   }
  // }
  // isSelected(rutinaId: number) {
  //   return this.rutinaSeleccionada.includes(rutinaId);
  // }
}
