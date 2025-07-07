import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mostrar-oferta',
  templateUrl: './mostrar-oferta.component.html',
  styleUrls: ['./mostrar-oferta.component.css']
})
export class MostrarOfertaComponent implements OnInit {
  offerActivas: any[] = [];
  ofertasPaginadas: any[] = [];
  paginaActual: number = 1;
  elementosPorPagina: number = 4;
  totalPaginas: number = 1;

  constructor(private ofertasService: OfertasService, private authService: AuthService) {}

  ngOnInit(): void {
    this.ofertasService.getAllActiveOffers().subscribe(ofertas => {
      this.offerActivas = ofertas;
      this.totalPaginas = Math.ceil(ofertas.length / this.elementosPorPagina);
      this.actualizarPaginado();
    });
  }

  actualizarPaginado(): void {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.ofertasPaginadas = this.offerActivas.slice(inicio, fin);
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente'): void {
    if (direccion === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    } else if (direccion === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
    this.actualizarPaginado();
  }

  aplicarOferta(oferta: any): void {
    const username = this.authService.getUsername();
    if (!username) {
      alert('⚠️ Debes iniciar sesión para postularte.');
      return;
    }

    this.ofertasService.inscribirse(oferta.id).subscribe({
      next: () => alert(`✅ Te has postulado a la oferta: ${oferta.title}`),
      error: () => alert('❌ Ya estás inscrito en esta oferta.')
    });
  }
}
