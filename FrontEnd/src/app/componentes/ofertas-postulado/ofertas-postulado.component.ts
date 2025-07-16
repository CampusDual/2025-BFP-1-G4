import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InscripcionService } from '../../services/inscription.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service.module';

@Component({
  selector: 'app-ofertas-postulado',
  templateUrl: './ofertas-postulado.component.html',
  styleUrls: ['./ofertas-postulado.component.css']
})
export class OfertasPostuladoComponent implements OnInit {
  ofertasPostuladas: any[] = [];
  ofertasPaginadas: any[] = [];
  paginaActual: number = 1;
  elementosPorPagina: number = 12;
  totalPaginas: number = 1;
  usuarioRol: string | null = '';

  constructor(
    private inscriptionService: InscripcionService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioRol = this.authService.getRole();
    console.log('🔐 Rol del usuario:', this.usuarioRol);

    const login = this.authService.getUsername();
    console.log('🔑 Login obtenido:', login);

    if (login) {
      this.usuarioService.getIdByLogin(login).subscribe({
        next: (userId: number) => {
          console.log('🆔 ID del usuario obtenido:', userId);

          this.inscriptionService.getPostulacionesUsuario(userId).subscribe({
            next: (ofertas: any[]) => {
              console.log('📄 Postulaciones recibidas del usuario:', ofertas);

              // Aquí chequeamos que cada oferta tenga el campo 'status'
              ofertas.forEach((oferta, index) => {
                console.log(`Oferta[${index}] - Título: ${oferta.title}, Status: ${oferta.status}`);
              });

              this.ofertasPostuladas = ofertas;
              this.totalPaginas = Math.ceil(ofertas.length / this.elementosPorPagina);
              this.actualizarPaginado();
            },
            error: (err) => {
              console.error('❌ Error al obtener postulaciones:', err);
              this.ofertasPostuladas = [];
              this.totalPaginas = 1;
              this.actualizarPaginado();
            }
          });
        },
        error: (err) => {
          console.error('❌ Error al obtener ID por login:', err);
          this.ofertasPostuladas = [];
          this.totalPaginas = 1;
          this.actualizarPaginado();
        }
      });
    } else {
      console.warn('⚠️ No se encontró login del usuario');
    }
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

  actualizarPaginado(): void {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.ofertasPaginadas = this.ofertasPostuladas.slice(inicio, fin);
    console.log(`📄 Ofertas paginadas para la página ${this.paginaActual}:`, this.ofertasPaginadas);
  }

  textoFiltro: string = '';
empresasFiltro: string[] = [];

get ofertasFiltradas(): any[] {
  return this.ofertasPaginadas.filter(oferta => {
    const coincideTexto = oferta.title.toLowerCase().includes(this.textoFiltro)
      || oferta.description.toLowerCase().includes(this.textoFiltro);

    const coincideEmpresa = this.empresasFiltro.length === 0
      || this.empresasFiltro.includes(oferta.enterpriseName);

    return coincideTexto && coincideEmpresa;
  });
}

onFiltroTexto(texto: string) {
  this.textoFiltro = texto;
}

onFiltroEmpresas(empresas: string[]) {
  this.empresasFiltro = empresas;
}

}

