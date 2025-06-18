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
      titulo: 'Desarrollador Frontend',
      descripcion: 'Buscamos dev con experiencia en Angular.',
      fecha: new Date(),
      activa: true // Oferta activa (círculo verde)
    },
    {
      titulo: 'Diseñador UX/UI',
      descripcion: 'Diseño de interfaces para plataforma móvil.',
      fecha: new Date(),
      activa: false // Oferta inactiva (círculo rojo)
    }
  ];*/

  toggleEstado(oferta: any) {
    oferta.active = !oferta.active;
  }

  // dataSource: any; // Úsalo solo si empleas <mat-table>
}
