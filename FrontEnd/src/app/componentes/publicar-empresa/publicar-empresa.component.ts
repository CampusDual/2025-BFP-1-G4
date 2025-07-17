import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpriseService } from '../../services/enterprise.service';
import { EnterpriseUserDTO } from '../../model/enterprise-user-dto.model';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-publicar-empresa',
  templateUrl: './publicar-empresa.component.html',
  styleUrls: ['./publicar-empresa.component.css']
})
export class PublicarEmpresaComponent implements OnInit {

  enterpriseUser: EnterpriseUserDTO = {
    enterprise: {
      id: undefined,
      name: '',
      email: '',
      phonenumber: '',
      address: ''
    },
    login: '',
    password: ''
  };

  modoEditar: boolean = false;
  passwordEditable: boolean = false;
  enterpriseId: number = 0;
  empresasSeleccionadas: any[] = [];
  location: any;

  constructor(
    private enterpriseService: EnterpriseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEditar = true;
      this.enterpriseId = +id;
      this.cargarEmpresaParaEditar(this.enterpriseId);
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  cargarEmpresaParaEditar(id: number): void {
    this.enterpriseService.getEnterpriseWithUser(id).subscribe({
      next: (data) => {
        this.enterpriseUser = data;
      },
      error: (err) => {
        console.error('Error al obtener empresa', err);
        alert('No se pudo cargar la empresa');
      }
    });
  }

  onSubmit(): void {
    if (this.modoEditar) {
      this.actualizarEmpresaConUsuario();
    } else {
      this.publicarEmpresa();
    }
  }

  publicarEmpresa(): void {
    this.enterpriseService.createEnterpriseWithUser(this.enterpriseUser).subscribe({
      next: () => {
        alert('Empresa creada con éxito');
        this.router.navigate(['/lista-empresas']);
      },
      error: (err) => {
        console.error('Error al crear empresa', err);
      }
    });
  }

  actualizarEmpresaConUsuario(): void {
    this.enterpriseService.updateEnterpriseWithUser(this.enterpriseUser).subscribe({
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

  borrarSeleccionadas(ids: number[]) {
    ids.forEach(id => {
      this.enterpriseService.getEnterpriseWithUser(id).subscribe(dto => {
        const enterpriseId = dto.enterprise.id;
        if (enterpriseId !== undefined) {
          this.enterpriseService.deleteEnterprise(enterpriseId).subscribe(() => {
            // Empresa eliminada
          });
        } else {
          console.error('enterpriseId is undefined, cannot delete enterprise');
        }
      });
    });
  }

  habilitarPassword(): void {
    this.passwordEditable = true;
  }

  cancelar() {
    this.router.navigate(['/lista-empresas']);
  }
}
