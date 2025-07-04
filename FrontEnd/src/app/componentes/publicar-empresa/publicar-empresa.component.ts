import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnterpriseUserDTO } from 'src/app/model/enterprise-user-dto.model';

@Component({
  selector: 'app-publicar-empresa',
  templateUrl: './publicar-empresa.component.html',
  styleUrls: ['./publicar-empresa.component.css']
})
export class PublicarEmpresaComponent implements OnInit {

private empresaId?: number;

  enterpriseUser: EnterpriseUserDTO = {
    enterprise: {
      name: '',
      address: '',
      email: '',
      phonenumber: ''
    },
    login: '',
    password: ''
  };

  modoEditar: boolean = false;
  private apiUrl = 'http://localhost:30030/enterprises';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.modoEditar = true;
      this.empresaId = +idParam;
      this.cargarEmpresaParaEditar(+idParam);
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  cargarEmpresaParaEditar(id: number): void {
    this.http.get<any>(`${this.apiUrl}/get/${id}`, { headers: this.getAuthHeaders() }).subscribe({
      next: (data) => {
        this.enterpriseUser.enterprise = {
          name: data.name,
          address: data.address,
          email: data.email,
          phonenumber: data.phonenumber
        };
        // Suponiendo que el backend no te devuelve login ni password, los dejamos vacíos o como los tengas
        this.enterpriseUser.login = '';
        this.enterpriseUser.password = '';
      },
      error: (err) => {
        console.error('Error al cargar empresa para editar', err);
      }
    });
  }

  onSubmit(): void {
    if (this.modoEditar) {
      this.actualizarEmpresaConUsuario();
    } else {
      this.crearEmpresaConUsuario();
    }
  }

  crearEmpresaConUsuario(): void {
    this.http.post<any>(`${this.apiUrl}/add`, this.enterpriseUser, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        alert('Empresa y usuario creados con éxito');
        this.router.navigate(['/lista-empresas']);
      },
      error: (err) => {
        console.error('Error al crear empresa con usuario', err);
        alert('Error al crear empresa');
      }
    });
  }

  actualizarEmpresaConUsuario(): void {
    if (!this.empresaId) return;
    this.http.put<any>(`${this.apiUrl}/update/${this.empresaId}`, this.enterpriseUser, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        alert('Empresa y usuario actualizados con éxito');
        this.router.navigate(['/lista-empresas']);
      },
      error: (err) => {
        console.error('Error al actualizar empresa con usuario', err);
        alert('Error al actualizar empresa');
      }
    });
  }
}
