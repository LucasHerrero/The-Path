import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { IntJwtPayload}  from './IntJwtPayload';
import { Observable } from 'rxjs';


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
 login(data: any): Promise<any> {
  const resp = {
    email: data.email,
    password: data.password,
  };

  return this.http
    .post<{ token: string }>(`${environment.apiUrl}/login`, resp)
    .toPromise()
    .then((response) => {
      if (response && typeof response.token === 'string') {
        return { success: true, token: response.token };
      } else {
        return { success: false, error: 'Token is not a string' };
      }
    })
    .catch((error) => {
      return { success: false, error: error.error };
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
    console.log('token', token);
    return !!token;
  }


  //CREAR INTERFAZ PARA EL TOKEN.
  async decodeToken(): Promise<IntJwtPayload>{
    const token = await this.Storage.get('auth-token');

    const decodedToken : IntJwtPayload= jwtDecode(token);
    console.log('decodedtoken',decodedToken);

    return decodedToken;
  }
}



