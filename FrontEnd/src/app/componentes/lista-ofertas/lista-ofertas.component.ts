import { Component } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';

@Component({
  selector: 'app-lista-ofertas',
  templateUrl: './lista-ofertas.component.html',
  styleUrls: ['./lista-ofertas.component.css']
})
export class ListaOfertasComponent {
  
  offerList: any[] =[];

  showView:string[] = ['titulo', 'descripcion', 'fecha', 'estado', 'acciones'];

  constructor(private ofertasService: OfertasService) { }
  
  ngOnInit(): void {
    this.ofertasService.getOfferById().subscribe({
      next: (data) => {
        this.offerList = data;
      },
      error: (err) => {
        console.error('Error al obtener ofertas', err);
      }
    });
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
}
