import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  usuario: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarioActual();
  }

  cargarUsuarioActual(): void {
    const login = this.authService.getUsername();

    if (!login) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.getIdByLogin(login).subscribe({
      next: (id: number) => {
        this.usuarioService.getUserById(id).subscribe({
          next: (data) => {
            this.usuario = data;
          },
          error: (err) => {
            console.error('Error al cargar usuario:', err);
            alert('⚠️ No se pudo cargar tu perfil.');
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener ID:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  guardarCambios(): void {
    this.usuarioService.updateUserProfile(this.usuario).subscribe({
      next: () => {
        alert('✅ Perfil actualizado correctamente.');
        this.router.navigate(['/perfil-usuario']);
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        alert('❌ Hubo un error al guardar los cambios.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/perfil-usuario']);
  }
}
