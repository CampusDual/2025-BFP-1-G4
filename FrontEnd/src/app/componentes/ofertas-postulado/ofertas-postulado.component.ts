import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfertasService } from '../../services/ofertas-service.service';
import { AuthService } from '../../services/auth.service';
import { InscripcionService } from '../../services/inscription.service';
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

    const login = this.authService.getUsername();
    if (login) {
      this.usuarioService.getIdByLogin(login).subscribe({
        next: (userId: number) => {
          console.log('🔑 ID obtenido desde login:', userId);
          this.inscriptionService.getPostulacionesUsuario(userId).subscribe(ofertas => {
            this.ofertasPostuladas = ofertas;
            this.totalPaginas = Math.ceil(ofertas.length / this.elementosPorPagina);
            this.actualizarPaginado();
          });
        },
        error: (err) => {
          console.error('Error al obtener ID por login:', err);
          this.ofertasPostuladas = [];
          this.totalPaginas = 1;
          this.actualizarPaginado();
        }
      });
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
    this.router.navigate(['/detalle-oferta']);
  }

  actualizarPaginado(): void {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.ofertasPaginadas = this.ofertasPostuladas.slice(inicio, fin);
  }
}
