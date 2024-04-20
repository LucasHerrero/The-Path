import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ejercicios } from '../Ejercicios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RutinasCreacionService {


  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getEjercicios() {
    return this.http.get<Ejercicios[]>(this.url+`/ejercicios`);
  }

  getEjerciciosbySearchName(search: string) {
    return this.http.get<Ejercicios[]>(this.url+`/search?nombre=${search}`);
  }
  getEjerciciosbySearchMuscle(search: string) {
    return this.http.get<Ejercicios[]>(this.url+`/search?musculo=${search}`);
  }
  getEjerciciosbySearchEquipment(search: string) {
    return this.http.get<Ejercicios[]>(this.url+`/search?equipacion=${search}`);
  }
}


