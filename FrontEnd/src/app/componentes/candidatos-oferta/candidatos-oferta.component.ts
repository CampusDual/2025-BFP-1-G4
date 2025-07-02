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
  ofertaId: number = 0;
  candidatos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertasService: OfertasService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.ofertaId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarCandidatos();
  }

  cargarCandidatos(): void {
    this.inscripcionService.getCandidatosPorOferta(this.ofertaId).subscribe({
      next: (data) => this.candidatos = data,
      error: (err) => console.error('Error al cargar candidatos', err)
    });
  }

  editarOferta(): void {
    this.router.navigate(['/publicar-oferta', this.ofertaId]);
  }
}
