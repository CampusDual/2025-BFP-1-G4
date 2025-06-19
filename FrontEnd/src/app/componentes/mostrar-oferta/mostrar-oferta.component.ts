import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';

@Component({
  selector: 'app-mostrar-oferta',
  templateUrl: './mostrar-oferta.component.html',
  styleUrls: ['./mostrar-oferta.component.css']
})
export class MostrarOfertaComponent implements OnInit {
offerList: any[] = [];

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(): void {
    this.ofertasService.getOfferById().subscribe({
      next: (data: any[]) => {
        // Aquí filtro solo las activas para mostrar a candidatos
        this.offerList = data.filter(oferta => oferta.active);
      },
      error: (error) => {
        console.error('Error al cargar ofertas', error);
      }
    });
  }
}
