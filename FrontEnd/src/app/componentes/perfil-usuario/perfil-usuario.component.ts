import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service.module';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarUser();
  }

  cargarUser(): void {
    const id = this.authService.getUserId();
    console.log('🧾 ID del usuario extraído del token:', id);

    if (!id) {
      alert('❌ No se pudo obtener tu ID. Por favor inicia sesión de nuevo.');
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.getUserById(id).subscribe({
      next: (data) => {
        console.log('✅ Datos del usuario recibidos:', data);
        this.usuario = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar el perfil:', err);
        alert('⚠️ No se pudo cargar tu perfil. Intenta más tarde.');
        this.router.navigate(['/login']);
      }
    });
  }
}
