import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient, storage : Storage) { }

login(email: string, password: string) {
  return this.http.post(`${environment.apiUrl}/login`, { email, password });
}


}
