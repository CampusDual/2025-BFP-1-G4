import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnterpriseDTO, EnterpriseUserDTO } from '../model/enterprise-user-dto.model';
import { Enterprise } from '../model/enterprise.model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  createEnterprise(enterprise: Enterprise) {
    throw new Error('Method not implemented.');
  }
  
  getAllEnterprises(): Observable<Enterprise[]> {
    return this.http.get<Enterprise[]>(this.apiUrl + "/getAll", {
      headers: this.getAuthHeaders()
    });
  }


getEnterprisePorId(id: number): Observable<EnterpriseDTO> {
  return this.http.get<EnterpriseDTO>(`${this.apiUrl}/get/${id}`, {
    headers: this.getAuthHeaders()
  });
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


deleteEnterprise(id: number): Observable<any> {
  // Envía el id en el body como EnterpriseDTO
  const body = { id: id };
  return this.http.request('delete', `${this.apiUrl}/delete`, {
    body,
    headers: this.getAuthHeaders()
  });
}


updateEnterpriseWithUser(dto: EnterpriseUserDTO): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/update`, dto, {
    headers: this.getAuthHeaders()
  });
}
getEnterpriseWithUser(id: number) {
  return this.http.get<EnterpriseUserDTO>(`http://localhost:30030/enterprises/getWithUser/${id}`, { headers: this.getAuthHeaders() });
}
}
