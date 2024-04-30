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

  getTusRutinas( id : number): Observable<RutinaEjercicio[]> {
    return this.http.get<RutinaEjercicio[]>(`${this.url}/RutinasEjercicio/user/${id}`);
  }
}
