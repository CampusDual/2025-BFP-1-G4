import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/model/user.model';
import { UsuarioService } from '../services/usuario.service.module';

@Component({
  selector: 'app-vista-candidato',
  templateUrl: './vista-candidato.component.html',
  styleUrls: ['./vista-candidato.component.css']
})
export class VistaCandidatoComponent implements OnInit {
  usuario: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
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
}
