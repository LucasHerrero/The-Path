import { RutinaEjercicio } from './../rutinas/RutinaEjercicio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rutina, dia } from '../rutinas/Rutina';
@Injectable({
  providedIn: 'root',
})
export class TusRutinasService {
  url = environment.apiUrl;
  constructor(public http: HttpClient) {}

  getRutinaByDayAndUser(idUser: number, day: dia): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.url}/rutina/day/${idUser}/${day}`);
  }

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

  deleteRutinas(idRutina: number): Observable<any> {
    return this.http.delete(`${this.url}/rutinas/${idRutina}`);
  }

  addEjercicio(idRutina: number, idEjercicio: number[]): Observable<any> {
    const data = {
      idEjercicios: idEjercicio,
    };
    return this.http.post(`${this.url}/addEjercicio/${idRutina}`, data);
  }

  deleteEjercicio(idRutina: number, idEjercicio: number): Observable<any> {
    return this.http.delete(
      `${this.url}/deleteEjercicio/${idRutina}/${idEjercicio}`
    );
  }
}
