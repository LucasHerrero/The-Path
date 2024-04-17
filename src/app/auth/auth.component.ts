import { ConstantPool } from '@angular/compiler';
import { AuthService } from './Auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ToastController} from '@ionic/angular';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  emailInic :string = "";
 PassInic : string = "";
 nombre : string = "";
 apellidos : string = "";
 edad : string = "";
   isLoginView = false; //TODO: CAMBIAR A TRUE PARA QUE APAREZCA EL LOGIN

constructor ( private authService: AuthService, private Storage : Storage,private toastController: ToastController) {

 this.init();
  }

  async init() {
    const storage = await this.Storage.create();
    this.Storage = storage;
  }

  async formInfoLogin() {
    try {
      const token = await this.authService.login(this.emailInic, this.PassInic);
      console.log('Got token', token);
      await this.Storage.set('auth-token', token);
      this.checkStorage();
      this.presentToast();
    } catch (error) {
      console.error('Error during login', error);
    }
  }

  async checkStorage() {
    try {
      const token = await this.Storage.get('auth-token');
      console.log('Stored token', token);
    } catch (error) {
      console.error('Error during checking storage', error);
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inicio de sesión exitoso.',
      duration: 2000,
      color: 'success',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark',
        }
      ]
    });
    toast.present();
  }

  async registerForm() {

    const date = new Date(this.edad);
    if (isNaN(date.getTime())) {
      console.error('Invalid date', this.edad);
      return;
    }

    const formattedAge = date.toISOString().slice(0, 10);
    console.log('Formatted age', formattedAge);


}
}

