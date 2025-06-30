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
  tipoUsuario: string | null = null;
  esEmpresa = false;
  esAdmin = false;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.actualizarEstado();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.actualizarEstado();
      });
  }

 actualizarEstado(): void {
  this.login = this.authService.isLogged;
  this.username = this.authService.getUsername();
  const role = this.authService.getRole();

  this.tipoUsuario = role ? role.toLowerCase().trim() : null;

  this.esEmpresa = this.tipoUsuario === 'enterprise';
  this.esAdmin = this.tipoUsuario === 'admin';
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

  irAListaEmpresas(): void {
    this.router.navigate(['/lista-empresas']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
