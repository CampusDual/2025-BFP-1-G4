import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-ofertas',
  templateUrl: './lista-ofertas.component.html',
  styleUrls: ['./lista-ofertas.component.css']
})
export class ListaOfertasComponent {
  ofertasMock = [
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
  ];

  toggleEstado(oferta: any) {
    oferta.activa = !oferta.activa;
  }

  // dataSource: any; // Úsalo solo si empleas <mat-table>
}
