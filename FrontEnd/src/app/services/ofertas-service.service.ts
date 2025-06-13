import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  private apiUrl = 'http://localhost:30030/ofertas'; // Cambia esto a tu URL real

  constructor(private http: HttpClient) {}

  getOfertas(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl);
  }
}
