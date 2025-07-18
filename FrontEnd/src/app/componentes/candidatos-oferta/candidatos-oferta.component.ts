// candidatos-oferta.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertasService } from '../../services/ofertas-service.service';
import { InscripcionService } from '../../services/inscription.service';

@Component({
  selector: 'app-candidatos-oferta',
  templateUrl: './candidatos-oferta.component.html',
  styleUrls: ['./candidatos-oferta.component.css']
})
export class CandidatosOfertaComponent implements OnInit {
  ofertaid: number = 0;
  candidatos: any[] = [];

  paginaActual = 1;
  elementosPorPagina = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertasService: OfertasService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.ofertaid = +this.route.snapshot.paramMap.get('id')!;
    this.cargarCandidatos();
  }

  cargarCandidatos(): void {
    this.inscripcionService.getCandidatosPorOferta(this.ofertaid).subscribe({
      next: (data) => {
        this.candidatos = data;
      },
      error: (err) => console.error('Error al cargar candidatos', err)
    });
  }

  get totalPaginas(): number {
    return Math.ceil(this.candidatos.length / this.elementosPorPagina);
  }

  get candidatosPaginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.candidatos.slice(inicio, inicio + this.elementosPorPagina);
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente') {
    if (direccion === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    } else if (direccion === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  editarOferta(): void {
    this.router.navigate(['/editar-oferta', this.ofertaid]);
  }

  verOferta(): void {
    // Pass the offerId and an 'origen' query parameter
    this.router.navigate(['/detalle-oferta', this.ofertaid], { queryParams: { origen: 'candidatos-oferta', ofertaId: this.ofertaid } });
  }

  verPerfil(id: number): void {
    this.router.navigate(['/candidato', id], {
      queryParams: { ofertaId: this.ofertaid }
    });
  }
}
