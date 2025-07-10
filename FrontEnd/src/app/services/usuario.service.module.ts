import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model'; // Ajusta según tu modelo

@Injectable({
  providedIn: 'root' // ⬅️ Esto es lo importante
})
export class UsuarioService {
 
  private apiUrl = 'http://localhost:30030/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.apiUrl}/getProfileById/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

getIdByLogin(login: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/getIdByLogin/${login}`, {
    headers: this.getAuthHeaders()
  });
}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }

  updateUserProfile(user: User): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/updateProfile`, user, { headers });
  }
}
