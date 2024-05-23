import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';
import { IntJwtPayload } from '../IntJwtPayload';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  User: IntJwtPayload = {} as IntJwtPayload;
  constructor(
    private authService: AuthService,
    private route: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          this.User = decodedToken;
        });
      }
    });
  }

  closeSession() {
    this.authService.logout();
    location.reload();
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.closeSession();
          },
        },
      ],
    });

    await alert.present();
  }
}
