import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UsuarioService } from 'src/app/services/usuario.service.module';
import { InscripcionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-vista-candidato',
  templateUrl: './vista-candidato.component.html',
  styleUrls: ['./vista-candidato.component.css']
})
export class VistaCandidatoComponent implements OnInit {
  usuario: User | null = null;
  ofertaId: number = 0;
  inscriptionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private inscripcionService: InscripcionService
  ) { }

ngOnInit(): void {
  const userId = Number(this.route.snapshot.paramMap.get('id'));
  this.ofertaId = Number(this.route.snapshot.queryParamMap.get('ofertaId')) || 0;

  if (userId && this.ofertaId) {
    this.usuarioService.getUserById(userId).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        console.error('🔴 Error al cargar datos del candidato:', err);
      }
    });

    this.inscripcionService
      .getInscripcionPorUsuarioYOferta(userId, this.ofertaId)
      .subscribe({
        next: (inscripcion) => {
          if (inscripcion && inscripcion.id) {
            this.inscriptionId = inscripcion.id;
            console.log('🟢 Inscription ID:', this.inscriptionId);
          } else {
            console.warn('⚠️ Inscripción no encontrada en backend');
          }
        },
        error: (err) => {
          console.error('🔴 Error al obtener inscripción:', err);
        }
      });
  }
}

cambiarEstadoNuevo(estado: 'pendiente' | 'aceptado' | 'rechazado'): void {
  if (!this.inscriptionId || !this.usuario || !this.ofertaId) {
    console.error('Faltan datos: inscripción, usuario u oferta');
    return;
  }

  this.inscripcionService.cambiarEstado(this.inscriptionId, estado).subscribe({
    next: (resp) => {
      console.log(`✅ Estado cambiado a ${estado}`, resp);
    },
    error: (err) => {
      console.error('Error al cambiar estado:', err);
    }
  });
}
}
