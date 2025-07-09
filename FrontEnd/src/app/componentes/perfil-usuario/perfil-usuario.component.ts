import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const rolStr = this.authService.getRole();
    const rol = Number(rolStr);

    // Datos mock estáticos para mostrar
    this.usuario = {
      nombre: 'Xoán González',
      titulo: 'Full Stack Developer',
      localidad: 'Ourense',
      experiencia: 3,
      situacion: 'Desempregado',
      disponibilidad: 'Inmediata',
      modalidad: 'Híbrido',
      presentacion: `Dedícome ao desenvolvemento Full Stack con 3 anos de experiencia no desenvolvemento de aplicacións web e móbiles. 
        O meu obxectivo é crear solucións tecnolóxicas eficientes que melloren a experiencia de usuario e aporten valor real ás empresas.`,
      linkedin: 'https://linkedin.com/in/xoangonzalez',
      github: 'https://github.com/xoangonzalez',
      web: 'https://blog.xoangonzalez.dev'
    };
  }
}
