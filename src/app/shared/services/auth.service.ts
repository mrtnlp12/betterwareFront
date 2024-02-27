import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../dtos';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:4000/user';

  constructor(private http: HttpClient) {

  }

  login(data: LoginDTO) {
    return this.http.post(`${this.baseUrl}/login`, data)
      .pipe(
        tap((data: any) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
        })
      )
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/validate-token`, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    })
      .pipe(
        map((data: any) => data.ok)
      )
  }
}
