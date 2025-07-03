import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnterpriseService } from '../../services/enterprise.service';
import { Enterprise } from 'src/app/model/enterprise.model';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  enterprisesList: Enterprise[] = [];

  constructor(
    private enterpriseService: EnterpriseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(): void {
    this.enterpriseService.getAllEnterprises().subscribe({
      next: (data) => {
        this.enterprisesList = data;
      },
      error: (err) => {
        console.error('Error al cargar empresas', err);
      }
    });
  }

  irANuevaEmpresa(): void {
    this.router.navigate(['/publicar-empresa']);
  }

  editarEmpresa(id: number): void {
    this.router.navigate(['/publicar-empresa', id]);
  }
}
