import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private Storage: Storage) {
    this.init();
  }

  async init() {
    await this.Storage.create();
  }
  login(email: string, password: string): Promise<string> {
    const resp = {
      email: email,
      password: password,
    };

    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/login`, resp)
      .toPromise()
      .then((response) => {
        if (response && typeof response.token === 'string') {
          return response.token;
        } else {
          throw new Error('Token is not a string');
        }
      });
  }

  register(data: any): Promise<string> {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/register`, data)
      .toPromise()
      .then((response) => {
        if (response && typeof response.token === 'string') {
          return response.token;
        } else {
          throw new Error('Token is not a string');
        }
      });
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.Storage.get('auth-token');

    return !!token;
  }
}
