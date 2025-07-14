import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Oferta } from '../model/oferta.model';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  getOfertasPostuladasPorUsuario(): Observable<number[]> {
    const userId = this.authService.getUserId(); // O como sea que obtienes el id del usuario

    if (!userId) {
      // Opcional: si no hay usuario logueado, devuelve array vacío para evitar errores
      return of([]);
    }

    return this.http.get<number[]>(`${this.apiUrl}/inscriptions/byUser/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }



  private apiUrl = 'http://localhost:30030/offers';
  constructor(private http: HttpClient, private authService: AuthService) { }


  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': "Bearer " + token
    });
  }

  /*
  checkInscription(username: string, offerId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/inscripciones/existe?user=${username}&offer=${offerId}`);
  } */

  inscribirse(offerid: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, { id: offerid }, { headers: this.getAuthHeaders() });
  }

  crearOferta(oferta: Oferta): Observable<Oferta> {
    return this.http.post<Oferta>(this.apiUrl + "/add", oferta, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((response: Oferta) => response as Oferta)
    );
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
    return this.http.put(
      `${this.apiUrl}/toggleActive`,
      { id },
      { headers: this.getAuthHeaders() }
    );
  }

  getAllActiveOffers(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl + "/findAllByActive", {
    });
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


