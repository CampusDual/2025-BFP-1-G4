import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  textoBusqueda: string = '';
  listaFiltrada: Enterprise[] = [];

  paginaActual = 1;
  elementosPorPagina = 6;

  constructor(
    private enterpriseService: EnterpriseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarEmpresas();

    // Recarga empresas cada vez que se navega a esta ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/lista-empresas') {
        this.cargarEmpresas();
      }
    });
  }

cargarEmpresas(): void {
  this.enterpriseService.getAllEnterprises().subscribe({
    next: (data) => {
      this.enterprisesList = data.sort((a, b) =>
        a.name.toString().localeCompare(b.name.toString())
      );
      this.listaFiltrada = [...this.enterprisesList];
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
      alert('No hay empresas seleccionadas');
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
            alert(err.error.mensaje);
          } else if (errores === 1) {
            alert('Una o más empresas no se pudieron eliminar porque tienen ofertas activas.');
          }
        }
      });
    });
  }


  estaSeleccionada(enterprise: Enterprise): boolean {
    return this.empresasSeleccionadas.includes(enterprise);
  }

 get totalPaginas(): number {
   return Math.ceil(this.listaFiltrada.length / this.elementosPorPagina);
 }

 get empresasPaginadas() {
   const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
   return this.listaFiltrada.slice(inicio, inicio + this.elementosPorPagina);
 }

  cambiarPagina(direccion: 'anterior' | 'siguiente') {
    if (direccion === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    } else if (direccion === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

filtrarEmpresas(): void {
  const texto = this.textoBusqueda.trim().toLowerCase();
  this.listaFiltrada = this.enterprisesList.filter(e =>
    e.name.toLowerCase().includes(texto)
  );
  this.paginaActual = 1;
}
}
