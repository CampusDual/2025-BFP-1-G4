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
  empresasSeleccionadas: Enterprise[] = [];

  constructor(
    private enterpriseService: EnterpriseService,
    private router: Router
  ) { }

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

  toggleSeleccion(enterprise: Enterprise): void {
    const index = this.empresasSeleccionadas.indexOf(enterprise);
    if (index === -1) {
      this.empresasSeleccionadas.push(enterprise);
    } else {
      this.empresasSeleccionadas.splice(index, 1);
    }
  }

  eliminarEmpresasSeleccionadas(): void {
    if (!confirm('¿Estás seguro de que deseas eliminar las empresas seleccionadas?')) return;

    this.empresasSeleccionadas.forEach((enterprise) => {
      this.enterpriseService.deleteEnterprise(enterprise.id!).subscribe({
        next: () => {
          // Eliminar del listado local
          this.enterprisesList = this.enterprisesList.filter(e => e.id !== enterprise.id);
          this.empresasSeleccionadas = this.empresasSeleccionadas.filter(e => e.id !== enterprise.id);
        },
        error: (err) => {
          console.error(`Error al eliminar empresa con ID ${enterprise.id}`, err);
        }
      });
    });
  }

  estaSeleccionada(enterprise: Enterprise): boolean {
    return this.empresasSeleccionadas.includes(enterprise);
  }
}
