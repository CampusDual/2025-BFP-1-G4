import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Oferta } from '../model/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  private apiUrl = 'http://localhost:30030/offers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': "Bearer "+ token
    });
  }

  crearOferta(oferta: Oferta): Observable<Oferta> {
    return this.http.post<Oferta>(this.apiUrl+"/add", oferta, {
      headers: this.getAuthHeaders()
    }).pipe(
          map((response: Oferta) => response as Oferta)
        );
  }

  obtenerOfertas(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl+"/getAll", {
      headers: this.getAuthHeaders()
    });
  }

  getOfferById(): Observable<Oferta[]> {
      return this.http.get<Oferta[]>(this.apiUrl+"/byEnterprise", {
    return this.http.get<Oferta[]>(this.apiUrl+"/getAll", {
      headers: this.getAuthHeaders()
    });
  }

  getOfferById(): Observable<Oferta[]> {
      return this.http.get<Oferta[]>(this.apiUrl+"/byEnterprise", {
      headers: this.getAuthHeaders()
    });
  }
  
toggleEstadoOferta(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/toggleActive`,
      { id }, 
      { headers: this.getAuthHeaders() }
    );
  }
  
}
