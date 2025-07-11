import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service.module';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
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
            this.snackBar.open('⚠️ No se pudo cargar tu perfil.', 'Cerrar', {
              duration: 3000
            });
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
        this.snackBar.open('✅ Perfil actualizado correctamente.', 'Cerrar', {
          duration: 3000
        });
        this.router.navigate(['/perfil-usuario']);
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        this.snackBar.open('❌ Hubo un error al guardar los cambios.', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/perfil-usuario']);
  }
}
