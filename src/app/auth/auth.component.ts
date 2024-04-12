import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  emailInic = "";
 PassInic = "";
  isLoginView = false; //TODO: CAMBIAR A TRUE PARA QUE APAREZCA EL LOGIN


  formInfoLogin(){
    console.log(this.emailInic, this.PassInic);
  }



}
