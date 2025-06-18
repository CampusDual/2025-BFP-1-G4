import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-ofertas',
  templateUrl: './lista-ofertas.component.html',
  styleUrls: ['./lista-ofertas.component.css']
})
export class ListaOfertasComponent {
  ofertasMock = [
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
  ];

  toggleEstado(oferta: any) {
    oferta.activa = !oferta.activa;
  }

  // dataSource: any; // Úsalo solo si empleas <mat-table>
}
