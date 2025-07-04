import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpriseService } from '../../services/enterprise.service';
import { EnterpriseDTO, EnterpriseUserDTO } from '../../model/enterprise-user-dto.model';

@Component({
  selector: 'app-publicar-empresa',
  templateUrl: './publicar-empresa.component.html',
  styleUrls: ['./publicar-empresa.component.css']
})
export class PublicarEmpresaComponent implements OnInit {
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
      this.actualizarEmpresa();
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

  actualizarEmpresa(): void {
    // Si el usuario no quiere cambiar contraseña, la eliminamos del objeto antes de enviarlo
    if (!this.passwordEditable) {
      delete this.enterpriseUser.password;
    }

    this.enterpriseService.updateEnterpriseWithUser(this.enterpriseId, this.enterpriseUser).subscribe({
      next: () => {
        alert('Empresa actualizada con éxito');
        this.router.navigate(['/lista-empresas']);
      },
      error: (err) => {
        console.error('Error al actualizar empresa', err);
      }
    });
  }

  habilitarPassword(): void {
    this.passwordEditable = true;
  }
}
