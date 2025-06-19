import { Component } from '@angular/core';
import { OfertasService } from '../services/ofertas-service.service';

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
   } // Asegúrate de importar y usar el servicio correctamente
  /*ofertasMock = [
    {
      title: 'Desarrollador Frontend',
      description: 'Buscamos dev con experiencia en Angular.',
      publicationdate: new Date(),
      active: true // Oferta activa (círculo verde)
    },
    {
      title: 'Diseñador UX/UI',
      description: 'Diseño de interfaces para plataforma móvil.',
      publicationdate: new Date(),
      active: false // Oferta inactiva (círculo rojo)
    }
  ];*/

  toggleEstado(oferta: any) {
    /*oferta.active = !oferta.active;*/
    this.ofertasService.toggleEstadoOferta(oferta.id).subscribe({
      next: (updatedOferta) => {
        console.log('Respuesta backend:', updatedOferta);
        oferta.active = updatedOferta.active;
      },
      error: (err) => {
        console.error('Error al cambiar estado', err);
      }
    })
  }

}
