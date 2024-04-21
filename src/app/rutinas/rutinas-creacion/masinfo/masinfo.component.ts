import { Component, Input } from '@angular/core';
import { Ejercicios } from '../../Ejercicios';
@Component({
  selector: 'app-masinfo',
  templateUrl: './masinfo.component.html',
  styleUrls: ['./masinfo.component.scss']

})
export class MasinfoComponent {

  @Input() ejercicio!: Ejercicios;

  constructor() { }
}
