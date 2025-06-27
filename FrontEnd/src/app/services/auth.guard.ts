import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles = route.data['roles'] as string[];
    const userRole = this.authService.getRole();

    if (!userRole) {
      return this.router.parseUrl('/login');
    }

    if (expectedRoles.includes(userRole)) {
      return true;
    }

    // Redirige según el rol
    if (userRole === 'admin') return this.router.parseUrl('/lista-empresas');
    if (userRole === 'enterprise') return this.router.parseUrl('/lista-ofertas');
    if (userRole === 'user') return this.router.parseUrl('/mostrar-oferta');
    return this.router.parseUrl('/login');
  }
}
