import { RutinaEjercicio } from './../rutinas/RutinaEjercicio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TusRutinasService {
  url = environment.apiUrl;
  constructor(public http: HttpClient) {}

  getTusRutinas(id: number): Observable<RutinaEjercicio[]> {
    return this.http.get<RutinaEjercicio[]>(
      `${this.url}/RutinasEjercicio/user/${id}`
    );
  }

  getRutinasSearchByDay(
    id: number,
    day: string
  ): Observable<RutinaEjercicio[]> {
    return this.http.get<RutinaEjercicio[]>(
      `${this.url}/RutinasEjercicio/search?Dia=${day}&userId=${id}`
    );
  }
  getRutinasSearchByName(
    id: number,
    name: string
  ): Observable<RutinaEjercicio[]> {
    return this.http.get<RutinaEjercicio[]>(
      `${this.url}/RutinasEjercicio/search?nombre=${name}&userId=${id}`
    );
  }

  editRutinaskg(idUser: number, body: any): Observable<any> {
    return this.http.put(`${this.url}/rutinaEjercicioKg/${idUser}`, body);
  }

  deleteRutinas(idRutina: number) {
    return this.http.delete(`${this.url}/rutinas/${idRutina}`);
  }
}
