import { Component } from '@angular/core';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent {
  ofertas = [
    { titulo: 'Frontend Angular', descripcion: 'Experiencia con Angular, TypeScript y Material UI.' },
    { titulo: 'Backend Node.js', descripcion: 'Buscamos programador con conocimientos en Express y MongoDB.' },
    { titulo: 'Diseñador UX/UI', descripcion: 'Fuerte sentido estético y conocimiento en Figma o Adobe XD.' },
    { titulo: 'Técnico de soporte', descripcion: 'Atención al cliente y resolución de incidencias básicas.' },
    { titulo: 'Data Analyst', descripcion: 'Conocimientos en SQL, Power BI y Python.' },
  ];

  aplicar(oferta: any) {
    alert(`Has aplicado a la oferta: ${oferta.titulo}`);
  }
}
