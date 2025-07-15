import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Oferta } from '../model/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  private apiUrl = 'http://localhost:30030/offers';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': "Bearer " + token
    });
  }

 getOfertasPostuladasPorUsuario(): Observable<any[]> {
  const userId = sessionStorage.getItem('userId');
  console.log('userId recuperado:', userId);

  if (!userId) {
    console.warn('No se encontró userId en sessionStorage');
    return of([]);
  }

  return this.http.get<number[]>(`http://localhost:30030/inscriptions/byUser/${userId}`, {
    headers: this.getAuthHeaders()
  });
}

  inscribirse(offerid: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, { id: offerid }, { headers: this.getAuthHeaders() });
  }

  crearOferta(oferta: Oferta): Observable<Oferta> {
    return this.http.post<Oferta>(this.apiUrl + "/add", oferta, {
      headers: this.getAuthHeaders()
    }).pipe(map((response: Oferta) => response));
  }

  obtenerOfertas(id: number): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl + "/getAll", {
      headers: this.getAuthHeaders()
    });
  }

  getOfferById(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl + "/byEnterprise", {
      headers: this.getAuthHeaders()
    });
  }

  toggleEstadoOferta(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/toggleActive`, { id }, {
      headers: this.getAuthHeaders()
    });
  }

  getAllActiveOffers(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl + "/findAllByActive");
  }

  obtenerOfertaPorId(id: number): Observable<Oferta> {
    return this.http.get<Oferta>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarOferta(oferta: Oferta): Observable<any> {
    return this.http.put(`${this.apiUrl}/${oferta.id}`, oferta, {
      headers: this.getAuthHeaders()
    });
  }
}
