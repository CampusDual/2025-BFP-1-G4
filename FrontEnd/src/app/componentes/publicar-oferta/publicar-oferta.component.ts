import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Oferta } from '../../model/oferta.model';
import { OfertasService } from '../../services/ofertas-service.service';

@Component({
  selector: 'app-publicar-oferta',
  templateUrl: './publicar-oferta.component.html',
  styleUrls: ['./publicar-oferta.component.css']
})
export class PublicarOfertaComponent implements OnInit {
  oferta: Oferta = {
    id: 1,
    title: '',
    description: '',
    publicationdate: new Date(),
    active: true,
    enterpriseName: '',
    enterpriseId: 0,
    enterpriseEmail: ''
  };

  modoEditar: boolean = false;

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEditar = true;
      this.cargarOfertaParaEditar(+id);
    }
  }

  cargarOfertaParaEditar(id: number): void {
    this.ofertasService.obtenerOfertaPorId(id).subscribe({
      next: (data) => {
        this.oferta = data;
      },
      error: (err) => {
        console.error('Error al cargar oferta para editar', err);
      }
    });
  }

  onSubmit(): void {
    if (this.modoEditar) {
      this.actualizarOferta();
    } else {
      this.publicarOferta();
    }
  }

  publicarOferta(): void {
    this.ofertasService.crearOferta(this.oferta).subscribe({
      next: () => {
        alert('Oferta publicada con éxito');
        this.router.navigate(['/lista-ofertas']);
      },
      error: (err) => {
        console.error('Error al publicar oferta', err);
      }
    });
  }

  actualizarOferta(): void {
    this.ofertasService.actualizarOferta(this.oferta).subscribe({
      next: () => {
        alert('Oferta actualizada con éxito');
        this.router.navigate(['/lista-ofertas']);
      },
      error: (err) => {
        console.error('Error al actualizar oferta', err);
      }
    });
  }
}
