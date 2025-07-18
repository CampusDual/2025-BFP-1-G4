import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OfertasService } from '../../services/ofertas-service.service';

@Component({
  selector: 'app-lista-ofertas',
  templateUrl: './lista-ofertas.component.html',
  styleUrls: ['./lista-ofertas.component.css']
})
export class ListaOfertasComponent {
  offerList: any[] = [];
  offerListFiltrada: any[] = [];
  paginaActual = 1;
  elementosPorPagina = 4;
  textoBusqueda: string = '';

  constructor(
    private ofertasService: OfertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas(): void {
    this.ofertasService.getOfferById().subscribe({
      next: (data) => {
        this.offerList = data;
        this.offerListFiltrada = data;
        this.paginaActual = 1;
      },
      error: (err) => {
        console.error('Error al obtener ofertas', err);
      }
    });
  }

  filtrarOfertas(): void {
    const texto = this.textoBusqueda.trim();
    if (texto === '') {
      this.offerListFiltrada = this.offerList;
      this.paginaActual = 1;
    } else {
      this.ofertasService.buscarOfertasPorTexto(texto).subscribe({
        next: (data) => {
          this.offerListFiltrada = data;
          this.paginaActual = 1;
        },
        error: (err) => {
          console.error('Error buscando ofertas', err);
        }
      });
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.offerListFiltrada.length / this.elementosPorPagina);
  }

  get ofertasPaginadas() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.offerListFiltrada.slice(inicio, inicio + this.elementosPorPagina);
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente') {
    if (direccion === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    } else if (direccion === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  toggleEstado(oferta: any) {
    this.ofertasService.toggleEstadoOferta(oferta.id).subscribe({
      next: (updatedOferta) => {
        console.log('Respuesta backend:', updatedOferta);
        oferta.active = updatedOferta.active;
      },
      error: (err) => {
        console.error('Error al cambiar estado', err);
      }
    });
  }

  irANuevaOferta(): void {
    this.router.navigate(['/publicar-oferta']);
  }

  editarOferta(id: number): void {
    this.router.navigate(['/editar-oferta', id]);
  }

  verCandidatos(id: number) {
    this.router.navigate(['/candidatos-oferta', id]);
  }

  verInscritos(ofertaId: number) {
    this.router.navigate(['/oferta', ofertaId, 'candidatos']);
  }
}
