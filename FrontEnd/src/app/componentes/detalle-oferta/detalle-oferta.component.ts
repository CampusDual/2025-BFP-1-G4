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
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.usuarioRol = this.authService.getRole();
    this.userId = this.authService.getUserId();

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

  get isUserRole(): boolean {
    return this.usuarioRol === 'user';
  }

  yaPostulado(idOferta: number): boolean {
    return this.ofertasPostuladasIds.includes(idOferta);
  }

  postularse(): void {
    if (!this.oferta || !this.isUserRole) {
      return;
    }

    const username = this.authService.getUsername();
    if (!username) {
      alert('⚠️ Debes iniciar sesión para postularte.');
      return;
    }

    this.ofertasService.inscribirse(this.oferta.id).subscribe({
      next: () => {
        alert(`✅ Te has postulado a la oferta: ${this.oferta.title}`);
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
    if (origen === 'candidatos-oferta' && ofertaId) {
      this.router.navigate(['/candidatos-oferta', ofertaId]);
    } else if (origen === 'mis-postulaciones') {
      this.router.navigate(['/mis-postulaciones']);
    } else {
      this.router.navigate(['/mostrar-oferta']);
    }
  }

  parseToList(texto: string): string[] {
    return texto.split('\n').filter(linea => linea.trim() !== '');
  }
}
