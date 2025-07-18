import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OfertasService } from '../../services/ofertas-service.service';

@Component({
  selector: 'app-detalle-oferta',
  templateUrl: './detalle-oferta.component.html',
  styleUrls: ['./detalle-oferta.component.css']
})
export class DetalleOfertaComponent implements OnInit {
  oferta: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertasService: OfertasService,
  
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.ofertasService.obtenerOfertaPorId(id).subscribe({
        next: (data) => {
          this.oferta = data;
        },
        error: (err) => {
          console.error('Error al obtener la oferta:', err);
        }
      });
    }
  }

volver() {
  const queryParams = this.route.snapshot.queryParams;
  this.router.navigate(['/mostrar-oferta'], { queryParams, replaceUrl: true });
}

  parseToList(texto: string): string[] {
  return texto.split('\n').filter(linea => linea.trim() !== '');
}

}
