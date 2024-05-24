import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Imc } from './imc';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
private url : string = environment.apiUrl;
  constructor(private http : HttpClient) { }


  getImc(id:number) : Observable<Imc>{
    return this.http.get<Imc>(`${this.url}/imcCalculation/${id}`);
  }
}
