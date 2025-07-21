import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-oferta',
  templateUrl: './mostrar-oferta.component.html',
  styleUrls: ['./mostrar-oferta.component.css']
})
export class MostrarOfertaComponent implements OnInit {
  offerActivas: any[] = [];
  ofertasFiltradas: any[] = [];
  ofertasPaginadas: any[] = [];
  empresasSeleccionadas: string[] = [];
  mostrarFiltro: boolean = false;
  paginaActual: number = 1;
  elementosPorPagina: number = 12;
  totalPaginas: number = 0;
  usuarioRol: string | null = '';
  userId: number | null = null;
  ofertasPostuladasIds: number[] = [];
  textoBusqueda: string = '';
  filtroEmpresaTexto: string = '';

  // Paginación del filtro de empresas
  empresaPaginaActual: number = 1;
  empresasPorPagina: number = 18;
  totalPaginasEmpresas: number = 0;

  constructor(
    private ofertasService: OfertasService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const savedState = sessionStorage.getItem('mostrar-oferta-state');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.paginaActual = state.paginaActual || 1;
      this.textoBusqueda = state.textoBusqueda || '';
      this.empresasSeleccionadas = state.empresasSeleccionadas || [];
    }

    this.usuarioRol = this.authService.getRole();
    this.userId = this.authService.getUserId();

    if (this.userId !== null) {
      this.ofertasService.getOfertasPostuladasPorUsuario().subscribe((ofertas: any[]) => {
        this.ofertasPostuladasIds = ofertas.map((oferta: any) => oferta.id);
      });
    }

    this.ofertasService.getAllActiveOffers().subscribe((ofertas: any[]) => {
      this.offerActivas = ofertas;

      if (this.empresasSeleccionadas.length === 0) {
        this.empresasSeleccionadas = this.obtenerEmpresasUnicas();
      }

      this.aplicarFiltroTextualEmpresas();
      this.totalPaginas = Math.ceil(this.ofertasFiltradas.length / this.elementosPorPagina);
      this.actualizarPaginado();
    });
  }

  guardarEstado() {
    sessionStorage.setItem('mostrar-oferta-state', JSON.stringify({
      paginaActual: this.paginaActual,
      textoBusqueda: this.textoBusqueda,
      empresasSeleccionadas: this.empresasSeleccionadas
    }));
  }

  toggleFiltro(): void {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  onCambiarEmpresas(event: any): void {
    const checkbox = event.target;
    const empresa = checkbox.value;

    if (checkbox.checked) {
      if (!this.empresasSeleccionadas.includes(empresa)) {
        this.empresasSeleccionadas.push(empresa);
      }
    } else {
      this.empresasSeleccionadas = this.empresasSeleccionadas.filter(e => e !== empresa);
    }

    this.aplicarFiltroEmpresas();
    this.guardarEstado();
  }

  aplicarFiltroEmpresas(): void {
    if (this.empresasSeleccionadas.length === 0) {
      this.ofertasFiltradas = [];
    } else {
      this.ofertasFiltradas = this.offerActivas.filter((oferta: any) =>
        this.empresasSeleccionadas.includes(oferta.enterpriseName)
      );
    }
    this.totalPaginas = Math.ceil(this.ofertasFiltradas.length / this.elementosPorPagina);
    this.paginaActual = 1;
    this.actualizarPaginado();
    this.guardarEstado();
  }

  mostrarTodo(): void {
    this.empresasSeleccionadas = this.obtenerEmpresasUnicas();
    this.aplicarFiltroEmpresas();
    this.guardarEstado();
  }

  ocultarTodo(): void {
    this.empresasSeleccionadas = [];
    this.aplicarFiltroEmpresas();
    this.guardarEstado();
  }

  obtenerEmpresasUnicas(): string[] {
    return Array.from(new Set(this.offerActivas.map((o: any) => o.enterpriseName)))
      .sort((a, b) => a.localeCompare(b));
  }

  actualizarPaginado(): void {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.ofertasPaginadas = this.ofertasFiltradas.slice(inicio, fin);
    this.guardarEstado();
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente'): void {
    if (direccion === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    } else if (direccion === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
    this.actualizarPaginado();
    this.guardarEstado();
  }

  verDetalle(id: number): void {
    this.guardarEstado();
    this.router.navigate(['/detalle-oferta', id], {
      queryParams: { origen: 'mostrar-oferta' }
    });
  }

  yaPostulado(idOferta: number): boolean {
    return this.ofertasPostuladasIds.includes(idOferta);
  }

  aplicarOferta(oferta: any): void {
    const username = this.authService.getUsername();
    if (!username) {
      alert('⚠️ Debes iniciar sesión para postularte.');
      return;
    }

    this.ofertasService.inscribirse(oferta.id).subscribe({
      next: () => {
        alert(`✅ Te has postulado a la oferta: ${oferta.title}`);
        this.ofertasService.getOfertasPostuladasPorUsuario().subscribe((ofertas: any[]) => {
          this.ofertasPostuladasIds = ofertas.map((o: any) => o.id);
        });
      },
      error: () => alert('❌ Ya estás inscrito en esta oferta.')
    });
  }

  aplicarFiltroTextualEmpresas(): void {
    const texto = this.textoBusqueda.toLowerCase();

    let ofertasFiltradas = this.offerActivas;

    if (this.empresasSeleccionadas.length > 0) {
      ofertasFiltradas = ofertasFiltradas.filter((oferta: any) =>
        this.empresasSeleccionadas.includes(oferta.enterpriseName)
      );
    }

    if (this.textoBusqueda.trim() !== '') {
      ofertasFiltradas = ofertasFiltradas.filter((oferta: any) =>
        oferta.title.toLowerCase().includes(texto) ||
        oferta.description.toLowerCase().includes(texto)
      );
    }

    this.ofertasFiltradas = ofertasFiltradas;
    this.totalPaginas = Math.ceil(this.ofertasFiltradas.length / this.elementosPorPagina);
    this.actualizarPaginado();
    this.guardarEstado();
  }

  obtenerEmpresasUnicasFiltradas(): string[] {
    const todas = this.obtenerEmpresasUnicas();
    if (!this.filtroEmpresaTexto.trim()) return todas;
    const texto = this.filtroEmpresaTexto.trim().toLowerCase();
    return todas.filter(e => e.toLowerCase().includes(texto));
  }

  // --- Paginación del filtro de empresas ---
  getEmpresasPaginadas(): string[] {
    const todas = this.obtenerEmpresasUnicasFiltradas();
    this.totalPaginasEmpresas = Math.ceil(todas.length / this.empresasPorPagina);
    const inicio = (this.empresaPaginaActual - 1) * this.empresasPorPagina;
    return todas.slice(inicio, inicio + this.empresasPorPagina);
  }

  cambiarPaginaEmpresas(direccion: 'anterior' | 'siguiente'): void {
    if (direccion === 'anterior' && this.empresaPaginaActual > 1) {
      this.empresaPaginaActual--;
    } else if (direccion === 'siguiente' && this.empresaPaginaActual < this.totalPaginasEmpresas) {
      this.empresaPaginaActual++;
    }
  }

  onTextoBuscar(event: any): void {
    const texto = event.target.value.trim();
    this.textoBusqueda = texto;

    if (texto === '') {
      this.aplicarFiltroEmpresas();
      this.guardarEstado();
      return;
    }

    this.ofertasService.getOfertasFiltradasPorTexto(texto).subscribe((resultados: any[]) => {
      const filtradas = this.empresasSeleccionadas.length > 0
        ? resultados.filter((oferta: any) => this.empresasSeleccionadas.includes(oferta.enterpriseName))
        : resultados;

      this.ofertasFiltradas = filtradas;
      this.totalPaginas = Math.ceil(this.ofertasFiltradas.length / this.elementosPorPagina);
      this.paginaActual = 1;
      this.actualizarPaginado();
      this.guardarEstado();
    });
  }
}
