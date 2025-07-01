import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Enterprise } from '../model/enterprise.model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
private apiUrl = 'http://localhost:30030/enterprises';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': "Bearer " + token
    });
  }

  createEnterprise(enterprise: Enterprise): Observable<Enterprise> {
    return this.http.post<Enterprise>(this.apiUrl + "/add", enterprise, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((response: Enterprise) => response as Enterprise)
    );
  }
 
  getAllEnterprises(): Observable<Enterprise[]> {
    return this.http.get<Enterprise[]>(this.apiUrl + "/getAll", {
      headers: this.getAuthHeaders()
    });
  }

  deleteEnterprise(id: number): Observable<Enterprise> {
    return this.http.delete<Enterprise>(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateEnterprise(enterprise: Enterprise): Observable<Enterprise> {
    return this.http.put<Enterprise>(`${this.apiUrl}/update`, enterprise, {
      headers: this.getAuthHeaders()
    });
  }

  /*toggleEstadoEnterprise(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/toggleActive`,
      { id },
      { headers: this.getAuthHeaders() }
    );
  }
  getAllActiveEnterprises(): Observable<Enterprise[]> {
    return this.http.get<Enterprise[]>(this.apiUrl + "/findAllByActive", {
      headers: this.getAuthHeaders()
    });
  }*/
}
