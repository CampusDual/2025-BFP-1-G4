import { Component } from '@angular/core';
import { EnterpriseService } from 'src/app/services/enterprise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent {
  enterprisesList: any[] = [];

  constructor(
  private enterpriseService: EnterpriseService,
  private router: Router
) { }

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

onRowClick(id: number): void {
  this.router.navigate(['/publicar-oferta', id]);
}
  
}
