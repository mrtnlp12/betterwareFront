import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../../dtos';
import { User } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:4000/user';

  constructor(private http: HttpClient) {

  }

  addUser(data: UserDTO) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  updateUser(id: string, data: UserDTO) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

}
