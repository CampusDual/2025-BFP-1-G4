import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:30030/auth';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string}): Observable<string> {

    const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + encodedCredentials,
      'Content-Type': 'text/plain;charset=UTF-8'
    });


   return this.http.post(`${this.baseUrl}/login`, null, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => response as string)
    );
  }

}
