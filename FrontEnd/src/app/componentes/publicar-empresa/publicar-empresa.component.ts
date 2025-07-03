import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnterpriseService } from '../../services/enterprise.service';
import { EnterpriseUserDTO } from '../../model/enterprise-user-dto.model';

@Component({
  selector: 'app-publicar-empresa',
  templateUrl: './publicar-empresa.component.html',
  styleUrls: ['./publicar-empresa.component.css']
})
export class PublicarEmpresaComponent {
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

  constructor(private enterpriseService: EnterpriseService, private router: Router) { }

  onSubmit(): void {
  this.enterpriseService.createEnterpriseWithUser(this.enterpriseUser).subscribe({
    next: () => {
      alert('Empresa y usuario creados con éxito');
      this.router.navigate(['/lista-empresas']); // Redirige aquí
    },
    error: err => {
      alert('Empresa y usuario creados con éxito');
      this.router.navigate(['/lista-empresas']); // Redirige aquí
    }
  });
}

}
