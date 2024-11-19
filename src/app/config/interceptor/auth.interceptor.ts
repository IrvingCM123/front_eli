import { Injectable } from '@angular/core';
// Importar los módulos necesarios para implementar el interceptor HttpInterceptor
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// Importar el módulo Observable para manejar las solicitudes HTTP
import { Observable } from 'rxjs';
// Importar el servicio CacheService para eliminar los datos almacenados en la caché local
import { Cache_Service } from 'src/app/common/services/cache.Service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Inyectar el servicio CacheService
  constructor(private cacheService: Cache_Service) {}

  // Método para interceptar las solicitudes HTTP y agregar el token de autenticación a la cabecera de la solicitud
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Verificar si la solicitud no es de tipo GET y eliminar los datos almacenados en la caché local para mantener la información actualizada
    if (req.method !== 'GET') {
      // Eliminar los datos almacenados en la caché local
      this.cacheService.eliminar_DatoLocal('productos');
      this.cacheService.eliminar_DatoLocal('categorias');
      this.cacheService.eliminar_DatoLocal('proveedores');
      this.cacheService.eliminar_DatoLocal('ventas');
      this.cacheService.eliminar_DatoLocal('compras');
    }

    // Obtener el token de autenticación almacenado en la caché local
    let token = localStorage.getItem('token');

    // Verificar si el token existe y agregarlo a la cabecera de la solicitud HTTP
    if (token) {
      token = token.replace(/['"]+/g, '');

      // Clonar la solicitud y agregar el token de autenticación a la cabecera
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      // Continuar con la solicitud HTTP clonada
      return next.handle(cloned);
    } else {
      // Continuar con la solicitud HTTP original
      return next.handle(req);
    }
  }
}
