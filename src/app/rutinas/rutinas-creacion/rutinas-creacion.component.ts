import { Ejercicios } from './../Ejercicios';
import { RutinasCreacionService } from './rutinas-creacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ModalController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MasinfoComponent } from './masinfo/masinfo.component';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/Auth.service';
import { User } from '../User';
import { IntJwtPayload } from 'src/app/auth/IntJwtPayload';
import { TusRutinasService } from 'src/app/tus-rutinas/tus-rutinas.service';

@Component({
  selector: 'app-rutinas-creacion',
  templateUrl: './rutinas-creacion.component.html',
  styleUrls: ['./rutinas-creacion.component.scss'],
})
export class RutinasCreacionComponent implements OnInit {
  Ejercicio: Ejercicios[] = [];
  ejercicio: Ejercicios = {} as Ejercicios;
  ejerciciosSeleccionados: number[] = [];
  showMuscleGroups: any;
  showEquipment: any;
  nombreRutina: string = '';
  cantidadEjercicios: number = 0;
  dia: string = '';
  user: IntJwtPayload = {} as IntJwtPayload;
  isLoading = false;
  isLoading2 = false;

  constructor(
    private modalController: ModalController,
    private rutinasCreacionService: RutinasCreacionService,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private authService: AuthService,
    private toastController: ToastController,
    private route: Router,
    private tusRutinasService: TusRutinasService
  ) {
    this.datosRutina1();
  }

  ngOnInit() {

    this.isLoading = true;
    this.rutinasCreacionService.getEjercicios().subscribe(
      (data) => {
        this.Ejercicio = data;
        this.isLoading = false; // Oculta el spinner cuando los datos están cargados
      },
      (error) => {
        this.isLoading = false; // Oculta el spinner si hay un error
        this.presentToastError2();
      }
    );
  }

  async presentToastSuccess(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
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

  async presentToastError(msg: any) {
    const toast = await this.toastController.create({
      message: msg.error,
      duration: 2000,
      color: 'danger',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'close',
        },
      ],
    });
    toast.present();
  }

  async presentToastError2() {
    const toast = await this.toastController.create({
      message: 'Error al cargar los ejercicios',
      duration: 2000,
      color: 'danger',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'close',
        },
      ],
    });
    toast.present();
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
  async datosRutina1() {


    this.nombreRutina = await this.storage.get('nombreRutina');
    this.cantidadEjercicios = await this.storage.get('cantidadEjercicios');

    this.dia = await this.storage.get('dia');
    //Logica para sacar id.
    this.authService.isAuthenticated().then((isAuth) => {
      if (isAuth) {
        this.authService.decodeToken().then((data) => {
          this.user = data;
        });
      }
    });
  }
  async verMas(ejercicio: Ejercicios, event: Event) {
    event.stopPropagation();

    const modal = await this.modalController.create({
      component: MasinfoComponent,
      componentProps: {
        ejercicio: ejercicio,
      },
      cssClass: 'modal',
      presentingElement: await this.modalController.getTop(),
    });

    return await modal.present();
  }

  async closeModal() {
    return await this.modalController.dismiss();
  }

  filterMuscle(evt: any) {
    this.rutinasCreacionService
      .getEjerciciosbySearchMuscle(evt)
      .subscribe((data) => {
        this.Ejercicio = data;
      });
  }

  filterEquipment(evt: any) {
    this.rutinasCreacionService
      .getEjerciciosbySearchEquipment(evt)
      .subscribe((data) => {
        this.Ejercicio = data;
      });
  }

  filterlist(evt: any) {
    evt = evt.target.value;

    if (evt.length > 0) {
      this.rutinasCreacionService
        .getEjerciciosbySearchName(evt)
        .subscribe((data) => {
          this.Ejercicio = data;
        });
    } else {
      this.rutinasCreacionService.getEjercicios().subscribe((data) => {
        this.Ejercicio = data;
      });
    }
  }

  seleccionarEjercicio(ejercicio: Ejercicios) {
    if (ejercicio) {
      if (this.ejerciciosSeleccionados.includes(ejercicio.id)) {
        this.ejerciciosSeleccionados = this.ejerciciosSeleccionados.filter(
          (e) => e !== ejercicio.id
        );
      } else {
        if (this.ejerciciosSeleccionados.length >= this.cantidadEjercicios) {
          this.mostrarAlerta();
        } else {
          this.ejerciciosSeleccionados.push(ejercicio.id);
        }
      }
    }
    console.log(this.ejerciciosSeleccionados);

  }

  isSelected(ejercicio: Ejercicios) {
    return this.ejerciciosSeleccionados.includes(ejercicio.id);
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

  async guardarRutina() {
    this.isLoading2 = true;
    const check: boolean = await this.storage.get('rutina');
    const ejercicioId = this.ejerciciosSeleccionados.map((e) => e);

    if (check == true) {
      const idRutina = await this.storage.get('rutinaId');
      this.tusRutinasService.addEjercicio(idRutina, ejercicioId).subscribe(
        (data) => {
          this.isLoading = true;
          this.presentToastSuccess('Ejercicio añadido a la rutina');
          setTimeout(() => {
            this.router.navigate(['/tus-rutinas']).then(() => {
              location.reload();
            });
          }, 2000);
        },
        (error) => {
          this.isLoading2 = false;
          this.presentToastError(error);
        }
      );

    } else {
      this.authService.isAuthenticated().then(async (isAuth) => {
        if (isAuth) {
          const data = {
            nombre: this.nombreRutina,
            cantidadEj: this.ejerciciosSeleccionados.length,
            Dia: this.dia,
            userFk: this.user.userId,

            ejercicios: this.ejerciciosSeleccionados.map((e) => e),
          };

          //POST
          await this.rutinasCreacionService
            .postRutina(data)
            .then((response) => {
              this.isLoading2 = false;
              this.presentToastSuccess('Creacion de rutina exitosa');
              setTimeout(() => {
                this.router.navigate(['/tus-rutinas']).then(() => {
                  location.reload();
                });
              }, 2000);
            })
            .catch((error) => {
              this.isLoading2 = false;
              this.presentToastError(error);
            });
          // location.reload();
          this.modalController.dismiss();
        } else {
          this.logeate();
          this.modalController.dismiss();
        }
      });
    }
  }
}
