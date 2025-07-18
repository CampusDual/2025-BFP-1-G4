import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OfertasService } from '../../services/ofertas-service.service';

@Component({
  selector: 'app-detalle-oferta',
  templateUrl: './detalle-oferta.component.html',
  styleUrls: ['./detalle-oferta.component.css']
})
export class DetalleOfertaComponent implements OnInit {
  oferta: any = null;
  usuarioRol: string | null = '';
  userId: number | null = null;
  ofertasPostuladasIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertasService: OfertasService,
    private authService: AuthService, // Inyecta AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioRol = this.authService.getRole(); // Obtener el rol del usuario al inicializar
    this.userId = this.authService.getUserId(); // Obtener el ID del usuario

    // Obtener las ofertas a las que el usuario ya se ha postulado
    if (this.userId !== null) {
      this.ofertasService.getOfertasPostuladasPorUsuario().subscribe(ofertas => {
        this.ofertasPostuladasIds = ofertas.map(oferta => oferta.id);
      });
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.ofertasService.obtenerOfertaPorId(id).subscribe({
        next: (data) => {
          this.oferta = data;
        },
        error: (err) => {
          console.error('Error al obtener la oferta:', err);
        }
      });
    }
  }

  // Getter para verificar si el usuario tiene el rol 'user'
  get isUserRole(): boolean {
    return this.usuarioRol === 'user';
  }

  // Método para verificar si el usuario ya se ha postulado a esta oferta
  yaPostulado(idOferta: number): boolean {
    return this.ofertasPostuladasIds.includes(idOferta);
  }

  // Método para postularse a la oferta
  postularse(): void {
    if (!this.oferta || !this.isUserRole) {
      return; // No se puede postular si no hay oferta o el rol no es de usuario
    }

    const username = this.authService.getUsername();
    if (!username) {
      alert('⚠️ Debes iniciar sesión para postularte.');
      return;
    }

    this.ofertasService.inscribirse(this.oferta.id).subscribe({
      next: () => {
        alert(`✅ Te has postulado a la oferta: ${this.oferta.title}`);
        // Actualizar la lista de ofertas postuladas después de una postulación exitosa
        if (this.userId !== null) {
          this.ofertasService.getOfertasPostuladasPorUsuario().subscribe(ofertas => {
            this.ofertasPostuladasIds = ofertas.map(o => o.id);
          });
        }
      },
      error: (err) => {
        console.error('Error al postularse:', err);
        alert('❌ Ya estás inscrito en esta oferta o ha ocurrido un error.');
      }
    });
  }

  volver() {
    const origen = this.route.snapshot.queryParamMap.get('origen');
    const ofertaId = this.route.snapshot.queryParamMap.get('ofertaId');

    if (origen === 'mis-postulaciones') {
      this.router.navigate(['/mis-postulaciones'], { queryParamsHandling: 'preserve' });
    } else if (origen === 'candidatos-oferta' && ofertaId) {
      this.router.navigate(['/candidatos-oferta', ofertaId], { queryParamsHandling: 'preserve' });
    }
    else {
      this.router.navigate(['/mostrar-oferta'], { queryParamsHandling: 'preserve' });
    }
  }

  parseToList(texto: string): string[] {
    return texto.split('\n').filter(linea => linea.trim() !== '');
  }
}
