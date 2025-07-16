import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  mostrarFiltro: boolean = false; // controla desplegable
  paginaActual: number = 1;
  elementosPorPagina: number = 12;
  totalPaginas: number = 0;
  usuarioRol: string | null = '';
  userId: number | null = null;
  ofertasPostuladasIds: number[] = [];

  constructor(
    private ofertasService: OfertasService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.usuarioRol = this.authService.getRole();
    this.userId = this.authService.getUserId();

    if (this.userId !== null) {
      this.ofertasService.getOfertasPostuladasPorUsuario().subscribe(ofertas => {
        this.ofertasPostuladasIds = ofertas.map(oferta => oferta.id);
        console.log('Ofertas postuladas IDs:', this.ofertasPostuladasIds);
      });
    } else {
      console.warn('⚠️ No se pudo recuperar userId de sessionStorage.');
    }

    this.ofertasService.getAllActiveOffers().subscribe(ofertas => {
      this.offerActivas = ofertas;
      this.ofertasFiltradas = []; // Sin empresas seleccionadas, no muestra ofertas
      this.totalPaginas = 0;
      this.paginaActual = 1;
      this.actualizarPaginado();
    });
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
  }

  aplicarFiltroEmpresas(): void {
    if (this.empresasSeleccionadas.length === 0) {
      this.ofertasFiltradas = [];
    } else {
      this.ofertasFiltradas = this.offerActivas.filter(oferta =>
        this.empresasSeleccionadas.includes(oferta.enterpriseName)
      );
    }
    this.totalPaginas = Math.ceil(this.ofertasFiltradas.length / this.elementosPorPagina);
    this.paginaActual = 1;
    this.actualizarPaginado();
  }

  mostrarTodo(): void {
    this.empresasSeleccionadas = this.obtenerEmpresasUnicas();
    this.aplicarFiltroEmpresas();
  }

  ocultarTodo(): void {
    this.empresasSeleccionadas = [];
    this.aplicarFiltroEmpresas();
  }

  obtenerEmpresasUnicas(): string[] {
    // Extrae lista única de empresas
    return Array.from(new Set(this.offerActivas.map(o => o.enterpriseName)));
  }

  actualizarPaginado(): void {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.ofertasPaginadas = this.ofertasFiltradas.slice(inicio, fin);
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente'): void {
    if (direccion === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    } else if (direccion === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
    this.actualizarPaginado();
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle-oferta', id]);
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
        this.ofertasService.getOfertasPostuladasPorUsuario().subscribe(ofertas => {
          this.ofertasPostuladasIds = ofertas.map(o => o.id);
        });
      },
      error: () => alert('❌ Ya estás inscrito en esta oferta.')
    });
  }
}
