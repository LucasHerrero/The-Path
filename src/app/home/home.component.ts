import { TusRutinasService } from 'src/app/tus-rutinas/tus-rutinas.service';
import { Component, OnInit } from '@angular/core';
import { Rutina, dia } from '../rutinas/Rutina';
import { AuthService } from '../auth/Auth.service';
import { IntJwtPayload } from '../auth/IntJwtPayload';
import { HomeService } from './home.service';
import { Imc } from './imc';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedDay: dia = {} as dia;
  isAuthenticatedVar: boolean = false;
  idUser: number = 0;
  noRutinas: boolean = false;
  Rutina: Rutina = {} as Rutina;
  Imc: Imc = {} as Imc;
  cardDay2Color: string = '';

  constructor(
    private tusRutinasService: TusRutinasService,
    private authService: AuthService,
    private homeService: HomeService
  ) {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];

    const currentDay = new Date().getDay();
    this.selectedDay = days[currentDay] as dia;
    this.cardDay2Color = 'cardDay2';
  }

  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticatedVar = true;
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          this.idUser = decodedToken.userId;
          this.homeService.getImc(this.idUser).subscribe((data) => {
            this.Imc = data;
            console.log(this.Imc.imcInfo);
            if (this.Imc.imcInfo == 'Delgadez') {
              this.cardDay2Color = 'cardDay2Danger';
            } else if (this.Imc.imcInfo == 'Peso normal') {
              this.cardDay2Color = 'cardDay2Success';
            } else if (this.Imc.imcInfo == 'Sobrepeso') {
              console.log('entro');
              this.cardDay2Color = 'cardDay2Warning';
            } else if (this.Imc.imcInfo == 'Obesidad Moderada') {
              this.cardDay2Color = 'cardDay2Warning';
            } else if (this.Imc.imcInfo == 'Obesidad Severa') {
              this.cardDay2Color = 'cardDay2Danger';
            } else if (this.Imc.imcInfo == 'Obesidad Morbida') {
              this.cardDay2Color = 'cardDay2Danger';
            }
            console.log(this.cardDay2Color);
          });
          this.tusRutinasService
            .getRutinaByDayAndUser(decodedToken.userId, this.selectedDay)
            .subscribe((data) => {
              if (data.length == 0) {
                this.noRutinas = true;
              } else {
                this.noRutinas = false;
              }
              for (let i = 0; i < 1; i++) {
                this.Rutina = data[i];
              }
            });
        });
      }else{
        this.cardDay2Color = 'cardDay2Blur';
      }
    });
  }
}
