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
  return this.http.delete(`${this.apiUrl}/delete/${id}`, {
    headers: this.getAuthHeaders()
  });
}


  updateEnterpriseWithUser(id: number, dto: EnterpriseUserDTO): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/update/${id}`, dto, {
    headers: this.getAuthHeaders()
  });
}
}
