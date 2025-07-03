import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../../services/enterprise.service';
import { Enterprise } from '../../model/enterprise.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {
  enterprisesList: Enterprise[] = [];

  constructor(private enterpriseService: EnterpriseService, private router: Router) { }

  ngOnInit(): void {
    this.enterpriseService.getAllEnterprises().subscribe({
      next: (data) => this.enterprisesList = data,
      error: (err) => console.error('Error al cargar empresas', err)
    });

}

onRowClick(id: number): void {
  this.router.navigate(['/editar-empresa', id]);
}

irANuevaOferta(): void {
  this.router.navigate(['/publicar-empresa']); // Ajusta la ruta si es distinta
}
}
