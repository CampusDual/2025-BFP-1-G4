import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnterpriseService } from '../../services/enterprise.service';
import { Enterprise } from 'src/app/model/enterprise.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const recargar = navigation?.extras.state?.['recargar'];

     if (recargar) {
    this.cargarEmpresas();
  } else {
    this.cargarEmpresas(); // por defecto también se carga
  }

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
    if (this.empresasSeleccionadas.length === 0) {
      this.snackBar.open('No hay empresas seleccionadas', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!confirm('¿Estás seguro de que deseas eliminar las empresas seleccionadas?')) return;

    let errores = 0;

    this.empresasSeleccionadas.forEach((enterprise) => {
      this.enterpriseService.deleteEnterprise(enterprise.id!).subscribe({
        next: () => {
          this.enterprisesList = this.enterprisesList.filter(e => e.id !== enterprise.id);
          this.empresasSeleccionadas = this.empresasSeleccionadas.filter(e => e.id !== enterprise.id);
        },
        error: (err) => {
          console.error(`Error al eliminar empresa con ID ${enterprise.id}`, err);
          errores++;

          if (err.error?.mensaje) {
            this.snackBar.open(err.error.mensaje, 'Cerrar', { duration: 5000 });
          } else if (errores === 1) {
            this.snackBar.open('Una o más empresas no se pudieron eliminar porque tienen ofertas activas.', 'Cerrar', { duration: 5000 });
          }
        }
      });
    });
  }

  estaSeleccionada(enterprise: Enterprise): boolean {
    return this.empresasSeleccionadas.includes(enterprise);
  }

  paginaActual = 1;
  elementosPorPagina = 6;

  get totalPaginas(): number {
    return Math.ceil(this.enterprisesList.length / this.elementosPorPagina);
  }

  get empresasPaginadas() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.enterprisesList.slice(inicio, inicio + this.elementosPorPagina);
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente') {
    if (direccion === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    } else if (direccion === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

}
