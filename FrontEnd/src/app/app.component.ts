import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  mostrarFooter = true;
  mostrarNavigator=true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ocultarEn = ['/register', '/login','/detalle-oferta', '/mostrar-oferta' , '/publicar-empresa','/mis-postulaciones','/publicar-empresa', '/editar-perfil', '/perfil-usuario'];
        this.mostrarFooter = !ocultarEn.includes(event.urlAfterRedirects);
      }
    });
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ocultarEn = ['/register', '/login'];
        this.mostrarNavigator = !ocultarEn.includes(event.urlAfterRedirects);
      }
    });
  }
  
}
