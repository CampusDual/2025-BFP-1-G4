import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Oferta {
  titulo: string;
  descripcion: string;
  empresa: string;
  salario: number;
  ubicacion: string;
  tipoContrato: string;
  fechaLimite: Date;
  requisitos: string[];
  beneficios?: string[];
}

@Component({
  selector: 'app-detalle-oferta',
  templateUrl: './detalle-oferta.component.html',
  styleUrls: ['./detalle-oferta.component.css']
})
export class DetalleOfertaComponent {
  @Input() oferta!: Oferta;
  @Output() postularEvento = new EventEmitter<void>();

  postular() {
    this.postularEvento.emit();
  }
}
