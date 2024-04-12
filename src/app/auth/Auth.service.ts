import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient, private Storage: Storage) { }

login(email: string, password: string) {
  return this.http.post(`${environment.apiUrl}/login`, { email, password });
}


}
