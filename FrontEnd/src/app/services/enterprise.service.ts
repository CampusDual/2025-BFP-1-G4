import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnterpriseUserDTO } from '../model/enterprise-user-dto.model';
import { Enterprise } from '../model/enterprise.model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  getAllEnterprises(): Observable<Enterprise[]> {
    return this.http.get<Enterprise[]>(this.apiUrl + "/getAll", {
      headers: this.getAuthHeaders()
    });
  }


  getEnterprisePorId(id: number): Observable<Enterprise> {
    return this.http.get<Enterprise>(`${this.apiUrl}/get/${id}`, { headers: this.getAuthHeaders() });
  }

  private apiUrl = 'http://localhost:30030/enterprises';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': "Bearer " + token
    });
  }

createEnterpriseWithUser(dto: EnterpriseUserDTO): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/add`, dto, {
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
}
