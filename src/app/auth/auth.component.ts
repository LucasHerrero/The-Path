import { ConstantPool } from '@angular/compiler';
import { AuthService } from './Auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Form, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  emailInic: string = '';
  PassInic: string = '';
  username: string = '';
  edad: string = '';
  email: string = '';
  Pass: string = '';
  Pass2: string = '';
  height: string = '';
  kg: string = '';

  isLoginView = false; //TODO: CAMBIAR A TRUE PARA QUE APAREZCA EL LOGIN

  constructor(
    private authService: AuthService,
    private Storage: Storage,
    private toastController: ToastController,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.init();
  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.group({
    emailM: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  async init() {
    const storage = await this.Storage.create();
    this.Storage = storage;
    this.checkStorage();
  }
  async presentToastError(message: string) {
    const toast = await this.toastController.create({
      message: message,
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
  formInfoLogin() {
  const user = {
    email: this.email,
    password: this.Pass,
  };

  this.authService.login(user).then((response) => {
    if (response.success) {
      console.log('Got token', response.token);
      this.Storage.set('auth-token', response.token);
      this.checkStorage();
      this.router.navigate(['/']);
      this.presentToast();
    } else {
      console.error('Error during login', response.error);
      this.presentToastError(response.error);


    }
  });
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
        },
      ],
    });
    toast.present();
  }

  async registerUser() {
    const user = {
      username: this.username,
      password: this.Pass,
      email: this.email,
      height: this.height,
      kg: this.kg,
    };

    this.authService.register(user).then((response) => {
      console.log('Got token', response);
      this.Storage.set('auth-token', response);
      this.checkStorage();
      this.router.navigate(['/']);
      this.presentToast();
    });
  }
}
