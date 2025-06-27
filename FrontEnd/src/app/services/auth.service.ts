import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:30030/auth';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<string> {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + encodedCredentials,
      'Content-Type': 'text/plain;charset=UTF-8'
    });

    return this.http.post(`${this.baseUrl}/login`, null, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => {
        if (response) {
          sessionStorage.setItem('token', response);
          sessionStorage.setItem('username', credentials.username);
        }
        return response;
      })
    );
  }

 get isLogged(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  logout(): void {
    sessionStorage.clear();
  }

}
