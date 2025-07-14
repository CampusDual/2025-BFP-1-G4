import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-oferta',
  templateUrl: './mostrar-oferta.component.html',
  styleUrls: ['./mostrar-oferta.component.css']
})
export class MostrarOfertaComponent implements OnInit {
  offerActivas: any[] = [];
  ofertasPaginadas: any[] = [];
  ofertasPostuladasIds: number[] = [];
  paginaActual: number = 1;
  elementosPorPagina: number = 12;
  totalPaginas: number = 1;
  usuarioRol: string | null = '';

  constructor(
    private ofertasService: OfertasService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Obtener el rol desde el token (puede ser null)
    this.usuarioRol = this.authService.getRole();

    // Obtener IDs de ofertas postuladas
    this.ofertasService.getOfertasPostuladasPorUsuario().subscribe({
      next: (ids: number[]) => {
        this.ofertasPostuladasIds = ids;
      },
      error: (err) => {
        console.error('Error al obtener ofertas postuladas:', err);
      }
    });

    // Cargar ofertas activas
    this.ofertasService.getAllActiveOffers().subscribe({
      next: (ofertas: any[]) => {
        this.offerActivas = ofertas;
        this.totalPaginas = Math.ceil(this.offerActivas.length / this.elementosPorPagina);
        this.actualizarPaginado();
      },
      error: (err) => {
        console.error('Error al cargar ofertas activas:', err);
      }
    });
  }

  yaPostulado(idOferta: number): boolean {
    return this.ofertasPostuladasIds.includes(idOferta);
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

  verDetalle(id: number): void {
    this.router.navigate(['/detalle-oferta', id]);
  }

  aplicarOferta(oferta: any): void {
    const username = this.authService.getUsername();
    if (!username) {
      alert('⚠️ Debes iniciar sesión para postularte.');
      return;
    }

    // Aquí asumimos que inscribirse devuelve Observable<any>
    this.ofertasService.inscribirse(oferta.id).subscribe({
      next: () => {
        alert(`✅ Te has postulado a la oferta: ${oferta.title}`);
        // Actualiza lista para deshabilitar botón tras postularse
        this.ofertasPostuladasIds.push(oferta.id);
      },
      error: (err) => {
        console.error('Error al postularse:', err);
        alert('❌ Ya estás inscrito en esta oferta o ocurrió un error.');
      }
    });
  }
}
