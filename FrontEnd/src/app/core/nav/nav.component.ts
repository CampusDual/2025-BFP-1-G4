import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  login = false;
  username: string | null = null;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  
    this.username = sessionStorage.getItem('username');
    this.actualizarEstado();

    // Escuchar navegación para actualizar el estado del menú dinámicamente
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.actualizarEstado();
      });
  }

  actualizarEstado(): void {
    this.login = this.authService.isLogged;
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }

  irAListaOfertas(): void {
    this.router.navigate(['/lista-ofertas']);
  }

  irAPublicarOferta(): void {
    this.router.navigate(['/publicar-oferta']);
  }

  cerrarSesion(): void {
    sessionStorage.clear();  // Borra todo lo que guardaste en sesión
    this.router.navigate(['/mostrar-oferta']);  // Redirige al login
  }

}
