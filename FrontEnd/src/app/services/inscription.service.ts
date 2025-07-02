import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private apiUrl = 'http://localhost:30030/inscriptions'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  getCandidatosPorOferta(ofertaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byOffer/${ofertaId}`, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
