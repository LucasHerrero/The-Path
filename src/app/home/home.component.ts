import { TusRutinasService } from 'src/app/tus-rutinas/tus-rutinas.service';
import { Component, OnInit } from '@angular/core';
import { Rutina, dia } from '../rutinas/Rutina';
import { AuthService } from '../auth/Auth.service';
import { IntJwtPayload } from '../auth/IntJwtPayload';

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
  constructor(
    private tusRutinasService: TusRutinasService,
    private authService: AuthService
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
  }

  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticatedVar = true;
        this.authService.decodeToken().then((decodedToken: IntJwtPayload) => {
          console.log('idToken', decodedToken.userId);
          this.idUser = decodedToken.userId;

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
      }
    });
  }
}
