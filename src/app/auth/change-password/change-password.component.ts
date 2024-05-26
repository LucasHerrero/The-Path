import { ProfileServiceService } from './../profile/profile-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../Auth.service';
import { IntJwtPayload } from '../IntJwtPayload';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private profileServiceService: ProfileServiceService,
    private toastController : ToastController,
  ) {}
  newPassword: string = '';
  repeatPassword: string = '';
  check: boolean = true;
  idUser: number = 0;


  ngOnInit() {




    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          this.idUser = decodedToken.userId;
        });
      }
    });
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

  async closeModal() {
    await this.modalController.dismiss();
  }

  passwordsMatch() {
    if (this.newPassword === this.repeatPassword) {
      this.check = true;
      this.changePassword();
    } else {
      this.check = false;
    }
  }
  closeSession() {
    this.authService.logout();
    location.reload();
  }

  changePassword() {
    const data = {
      password: this.newPassword,
    };

    this.profileServiceService.updatePassword(this.idUser, data).then((response) => {
      const response2: any = response;
      this.presentToastFinish(
        response2.message,
        'checkmark-circle',
        'success'
      );
      setTimeout(() => {
       this.closeModal();
       this.closeSession();
      }, 3000);
    })
    .catch((error) => {
      this.presentToastFinish(error.error, 'close-circle', 'danger');
    });
  }
}
