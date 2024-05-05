import { AuthService } from './../auth/Auth.service';
import { TusRutinasService } from './tus-rutinas.service';
import { Component, OnInit } from '@angular/core';
import { RutinaEjercicio } from '../rutinas/RutinaEjercicio';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IntJwtPayload } from '../auth/IntJwtPayload';
import { Ejercicios } from '../rutinas/Ejercicios';

@Component({
  selector: 'app-tus-rutinas',
  templateUrl: './tus-rutinas.page.html',
  styleUrls: ['./tus-rutinas.page.scss'],
})
export class TusRutinasPage implements OnInit {
  RutinaEjercicio: RutinaEjercicio[] = [];
  isAuthenticatedVar = false;
  constructor(
    private tusRutinasService: TusRutinasService,
    private authService: AuthService,
    private alertController: AlertController,
    private route: Router
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticatedVar = true;
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          console.log('idToken', decodedToken.userId);

          this.tusRutinasService
            .getTusRutinas(decodedToken.userId)
            .subscribe((data) => {
              this.RutinaEjercicio = data;
              console.log('RutinaEjercicio', this.RutinaEjercicio);
            });
        });
      }
    });
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
}
