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
      if (log[0] && log[1]) {
        sessionStorage.setItem('token', log[0]);
        sessionStorage.setItem('username', credentials.username);
        sessionStorage.setItem('role', log[1]);
      
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

  logout(): void {
    sessionStorage.clear();
  }

  getUserId(): number | null {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const id = payload.id || payload.sub || null;

    if (id === null) return null;

    // Convierte id a número, si no puede, devuelve null
    const idNum = Number(id);
    return isNaN(idNum) ? null : idNum;

  } catch (e) {
    console.error('Error al decodificar el token', e);
    return null;
  }
}


}
