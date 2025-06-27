import { Component } from '@angular/core';
import { EnterpriseService } from 'src/app/services/enterprise.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent {
  showView: string[] = ['id', 'name', 'address', 'email', 'phonenumber', 'acciones'];

  enterprisesList: any[] = [];

  constructor(private enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.enterpriseService.getAllEnterprises().subscribe({
      next: (data) => {
        this.enterprisesList = data;
      },
      error: (err) => {
        console.error('Error al obtener empresas', err);
      }
    });
  }
  
  /*toggleEstado(enterprise: any): {
    this.enterpriseService.toggleEstadoEnterprise(enterprise.id).subscribe({
    next: (updatedEnterprise: { active: any; }) => {
      console.log('Respuesta backend:', updatedEnterprise);
      enterprise.active = updatedEnterprise.active;
    },
    error: (err: any) => {
      console.error('Error al cambiar estado', err);
    }
  });
  }*/
}
