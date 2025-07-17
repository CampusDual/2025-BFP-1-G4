import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  mostrarFooter = true;
  mostrarNavigator = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ocultarFooterExacto = [
          '/register',
          '/login',
          '/mostrar-oferta',
          '/publicar-empresa',
          '/mis-postulaciones',
          '/editar-perfil',
          '/perfil-usuario',
          '/publicar-oferta',
          '/editar-oferta/:id',
          '/editar-oferta',
          '/lista-ofertas',
        ];

        const ocultarFooterPatrones = [
          '/detalle-oferta/',
          '/publicar-oferta/',
          '/editar-oferta/',
          '/candidato/'
        ];

        const ocultarFooter = ocultarFooterExacto.includes(event.urlAfterRedirects) ||
          ocultarFooterPatrones.some(ruta => event.urlAfterRedirects.startsWith(ruta));

        this.mostrarFooter = !ocultarFooter;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ocultarNavigator = ['/register', '/login'];

        this.mostrarNavigator = !ocultarNavigator.includes(event.urlAfterRedirects);
      }
    });
  }
}
