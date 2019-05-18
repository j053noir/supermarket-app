import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(model: Login) {
    return this.http.post(`${environment.apiUrl}/auth/login`, model).pipe(
      map((response: any) => {
        if (response.status && response.content) {
          this.setToken(response.content as string);
        }
        return response;
      })
    );
  }

  getToken() {
    localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  list() {
    return this.http
      .get(`${environment.apiUrl}/auth`)
      .pipe(map(response => response));
  }

  get(id: string) {
    return this.http
      .get(`${environment.apiUrl}/auth/${id}`)
      .pipe(map(response => response));
  }

  post(model: UserCreate) {
    return this.http
      .post(`${environment.apiUrl}/auth`, model)
      .pipe(map(response => response));
  }

  put(id: string, model: UserCreate) {
    return this.http
      .put(`${environment.apiUrl}/auth/${id}`, model)
      .pipe(map(response => response));
  }
}

export interface UserCreate {
  username: string;
  password: string;
  name: string;
}

export interface Login {
  username: string;
  password: string;
}
