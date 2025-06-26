import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:30030/users/register'; // ← Ajusta la URL a tu endpoint real

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any) {
    return this.http.post(this.apiUrl, usuario);
  }
}
