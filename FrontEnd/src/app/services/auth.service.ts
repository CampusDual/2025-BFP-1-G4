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
    map((response: string) => {
      // Espera formato: token|role
      let log: string[] = response.split('|');
      if (log[0] && log[1] && log[2]) {
        sessionStorage.setItem('token', log[0]);
        sessionStorage.setItem('username', credentials.username);
        sessionStorage.setItem('role', log[1]);
        sessionStorage.setItem('userId', log[2]); // Guardar userId si está presente

      }
      return log[0];
    })
  );
}

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

 get isLogged(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

getUserId(): number | null {
  const id = sessionStorage.getItem('userId');
  console.log('[DEBUG] userId recuperado del sessionStorage:', id);
  const parsedId = Number(id);
  return isNaN(parsedId) ? null : parsedId;
}


  logout(): void {
    sessionStorage.clear();
  }


}
