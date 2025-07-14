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
    // Obtener el rol desde el token
    this.usuarioRol = this.authService.getRole();

    // Obtener las ofertas en las que ya se postuló el usuario
    this.ofertasService.getOfertasPostuladasPorUsuario().subscribe(ids => {
      this.ofertasPostuladasIds = ids;
      console.log('IDs de ofertas ya postuladas:', ids);
    });


    // Cargar ofertas activas
    this.ofertasService.getAllActiveOffers().subscribe(ofertas => {
      this.offerActivas = ofertas;
      this.totalPaginas = Math.ceil(ofertas.length / this.elementosPorPagina);
      this.actualizarPaginado();
    });
  }

  yaPostulado(idOferta: number): boolean {
    const postulado = this.ofertasPostuladasIds.includes(idOferta);
    console.log('Oferta:', idOferta, '→ Ya postulado?', postulado);
    return postulado;
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

    this.ofertasService.inscribirse(oferta.id).subscribe({
      next: () => alert(`✅ Te has postulado a la oferta: ${oferta.title}`),
      error: () => alert('❌ Ya estás inscrito en esta oferta.')
    });
  }
}
