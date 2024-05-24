import { jwtDecode } from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';
import { IntJwtPayload } from '../IntJwtPayload';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/rutinas/User';
import { ProfileServiceService } from './profile-service.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  User2: IntJwtPayload = {} as IntJwtPayload;
  User: User = {} as User;
  constructor(
    private authService: AuthService,
    private route: Router,
    private alertController: AlertController,
    private profileService: ProfileServiceService,
    private toastController: ToastController,
    private modalController: ModalController,

  ) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          this.profileService
            .getUserById(decodedToken.userId)
            .subscribe((user) => {
              this.User = user;
              console.log(this.User);
            });
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
  async presentToastFinish(msg: string, icon: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
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

  editProfile() {
    var resp: any = null;
    if (this.User.birthday) {
      const date = new Date(this.User.birthday);
      resp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    const data = {
      userId: this.User.user_id,
      username: this.User.username,
      email: this.User.email,
      birthday: resp,
      height: this.User.height,
      kg: this.User.kg,
    };

    this.profileService
      .putUserInfo(data)
      .then((response) => {
        const response2: any = response;
        this.presentToastFinish(
          response2.message,
          'checkmark-circle',
          'success'
        );
        setTimeout(() => {
          this.closeSession();
        }, 3000);
      })
      .catch((error) => {
        this.presentToastFinish(error.error, 'close-circle', 'danger');
      });
  }

  async openChangePasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent
    });

    return await modal.present();
  }
}
