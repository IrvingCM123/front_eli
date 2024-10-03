import { Injectable } from '@angular/core';
// Importar los módulos necesarios para implementar el guard CanActivate
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
// Importar el servicio AuthService para verificar si el usuario está autenticado y obtener el rol del usuario
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyectar el servicio AuthService y el módulo Router
  constructor(private authService: AuthService, private router: Router) {}

  // Método para verificar si el usuario está autenticado y tiene el rol necesario para acceder a la ruta
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Obtener los roles necesarios para acceder a la ruta desde los datos de la ruta actual
    const roles = route.data['roles'] as Array<string>;
    // Obtener el rol del usuario autenticado
    const userRole = this.authService.obtenerRolUsuario() || '';

    // Verificar si el usuario está autenticado y tiene el rol necesario para acceder a la ruta
    if (this.authService.isAuthenticated() && (roles.length === 0 || roles.includes(userRole))) {
      return true;
    } else {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado o no tiene el rol necesario
      this.router.navigate(['/iniciarSesion']);
      return false;
    }
  }
}
