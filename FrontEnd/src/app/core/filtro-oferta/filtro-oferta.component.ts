import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-oferta',
  templateUrl: './filtro-oferta.component.html'
})
export class FiltroOfertasComponent {
  @Input() mostrarFiltroEmpresa: boolean = false;  // true solo si es candidato
  @Input() listaEmpresas: string[] = [];

  @Output() filtroTexto = new EventEmitter<string>();
  @Output() filtroEmpresas = new EventEmitter<string[]>();

  textoBusqueda: string = '';
  empresasSeleccionadas: string[] = [];

  onBuscarTexto() {
    this.filtroTexto.emit(this.textoBusqueda.toLowerCase());
  }

  onCambiarEmpresas(event: any) {
    const opciones = Array.from(event.target.selectedOptions).map((opt: any) => opt.value);
    this.empresasSeleccionadas = opciones;
    this.filtroEmpresas.emit(this.empresasSeleccionadas);
  }
}
