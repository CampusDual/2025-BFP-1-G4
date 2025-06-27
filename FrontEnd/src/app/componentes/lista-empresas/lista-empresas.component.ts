import { Component } from '@angular/core';
import { EnterpriseService } from 'src/app/services/enterprise.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent {
  enterprisesList: any[] = [];

  constructor(private enterpriseService: EnterpriseService) {}

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

  agregarFila() {
    this.enterprisesList.push({
      id: '—',
      name: '',
      address: '',
      email: '',
      phonenumber: ''
    });
  }

  eliminarFila(empresa: any) {
    const index = this.enterprisesList.indexOf(empresa);
    if (index > -1) this.enterprisesList.splice(index, 1);
  }
}
