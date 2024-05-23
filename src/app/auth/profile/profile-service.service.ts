import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/rutinas/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProfileServiceService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/userById/${id}`);
  }
  putUserInfo(data: any) {
    return this.http
      .put(`${this.baseUrl}/userUpdate`, data)
      .toPromise()
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
