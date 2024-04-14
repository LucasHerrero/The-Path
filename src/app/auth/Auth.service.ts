import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

login(email: string, password: string): Promise<string> {
  const resp = {
    email: email,
    password: password
  };

  return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, resp).toPromise().then(response => {
    if (response && typeof response.token === 'string') {
      return response.token;
    } else {
      throw new Error('Token is not a string');
    }
  });
}
}
