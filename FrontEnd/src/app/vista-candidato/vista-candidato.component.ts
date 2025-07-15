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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ofertaId = Number(this.route.snapshot.queryParamMap.get('ofertaId')) || 0;

    if (id) {
      this.usuarioService.getUserById(id).subscribe({
        next: (data) => {
          console.log('🟢 Datos del candidato cargados:', data);
          this.usuario = data;
        },
        error: (err) => {
          console.error('🔴 Error al cargar datos del candidato:', err);
        }
      });
    } else {
      console.warn('⚠️ ID de candidato no especificado en la URL.');
    }
  }

  cambiarEstadoNuevo(estado: 'pendiente' | 'aceptado' | 'rechazado'): void {
    if (!this.usuario || !this.ofertaId) {
      console.error('No hay usuario u ofertaId para cambiar estado');
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
