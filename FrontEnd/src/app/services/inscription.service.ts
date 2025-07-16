import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = 'http://localhost:30030/inscriptions'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  cambiarEstado(inscriptionId: number, nuevoEstado: string): Observable<any> {
    const body = {
      status: nuevoEstado
    };

    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/toggleActiveStatus/${inscriptionId}`, body, {
      headers,
      responseType: 'text' as 'json'  // ✅ SOLUCIÓN: evita error al recibir texto plano
    });
  }

  getCandidatosPorOferta(ofertaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byOffer/${ofertaId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getPostulacionesUsuario(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/byUser/${userId}`;
    console.log('Llamando a URL:', url);
    return this.http.get<any[]>(url, {
      headers: this.getAuthHeaders()
    });
  }

  getInscripcionPorUsuarioYOferta(userId: number, ofertaId: number) {
    return this.http.get<{ id: number }>(
      `${this.apiUrl}/byUserAndOffer?userId=${userId}&ofertaId=${ofertaId}`
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
