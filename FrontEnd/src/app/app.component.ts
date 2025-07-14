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
        // Rutas donde ocultar el footer (rutas estáticas)
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
        ];

        // Rutas donde ocultar el footer que tienen parámetros (rutas dinámicas)
        const ocultarFooterPatrones = [
          '/detalle-oferta/',
          '/publicar-oferta/',
          '/editar-oferta/'
        ];

        // Comprobar si la ruta actual está en la lista exacta
        const ocultarFooter = ocultarFooterExacto.includes(event.urlAfterRedirects) ||
          // O si la ruta actual empieza por alguno de los patrones
          ocultarFooterPatrones.some(ruta => event.urlAfterRedirects.startsWith(ruta));

        this.mostrarFooter = !ocultarFooter;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Rutas donde ocultar el navigator
        const ocultarNavigator = ['/register', '/login'];

        this.mostrarNavigator = !ocultarNavigator.includes(event.urlAfterRedirects);
      }
    });
  }
}
