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
      console.log('🟢 Candidatos recibidos:', data); // Asegúrate que aquí aparece "status"
      this.candidatos = data;
    },
    error: (err) => console.error('Error al cargar candidatos', err)
  });
}

  editarOferta(): void {
    this.router.navigate(['/editar-oferta', this.ofertaid]);
  }
verPerfil(id: number): void {
  this.router.navigate(['/candidato', id], {
    queryParams: { ofertaId: this.ofertaid }
  });
}

}
