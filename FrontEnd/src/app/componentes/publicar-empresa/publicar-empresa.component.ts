import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpriseService } from '../../services/enterprise.service';
import { EnterpriseDTO, EnterpriseUserDTO } from '../../model/enterprise-user-dto.model';
import { HttpHeaders } from '@angular/common/http';

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
  empresasSeleccionadas: any;

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
      this.cargarEmpresaParaEditar(+id);
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  cargarEmpresaParaEditar(id: number): void {
  this.enterpriseService.getEnterprisePorId(id).subscribe({
    next: (data) => {
      this.enterpriseUser.enterprise = data;
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
  if (!this.empresaId) return;
  this.enterpriseService.updateEnterpriseWithUser(this.empresaId, this.enterpriseUser).subscribe({
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

borrarSeleccionadas(): void {
  for (let id of this.empresasSeleccionadas) {
    this.enterpriseService.deleteEnterprise(id).subscribe({
      next: () => {
        console.log(`Empresa ${id} eliminada`);
        this.cargarEmpresas(); // recargar la lista
      },
      error: (err) => {
        console.error(`Error al eliminar empresa ${id}`, err);
        alert(`Error al eliminar empresa ${id}`);
      }
    });
  }
}

  cargarEmpresas() {
    throw new Error('Method not implemented.');
  }


  habilitarPassword(): void {
    this.passwordEditable = true;
  }
}
