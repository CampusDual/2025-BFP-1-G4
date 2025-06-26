import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private url = 'http://localhost:30030/usuarios/register'; // ajusta a tu endpoint real

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any) {
    return this.http.post(this.url, usuario);
  }
}
