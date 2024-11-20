import { Injectable } from '@angular/core';

// Importar el componente jwt-decode para decodificar el token de acceso recibido al iniciar sesión y obtener el rol del usuario
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Método para verificar si el usuario está autenticado, retorna un booleano, mediante el token de acceso almacenado en el local storage
  isAuthenticated(): boolean {
    // Obtener el token de acceso del local storage
    const token = localStorage.getItem('token');
    // Retornar verdadero si el token es diferente de nulo
    return !!token;
  }

  // Método para obtener el rol del usuario, retorna un string o nulo, mediante el token de acceso almacenado en el local storage
  obtenerRolUsuario(): string | null {
    // Obtener el token de acceso del local storage
    const token: string = localStorage.getItem('token') || '';

    // Decodificar el token de acceso y obtener el rol del usuario
    const decodedToken: any = jwt_decode(token);
    // Retornar el rol del usuario
    return decodedToken.role;
  }

  obtenerIdUsuario(): number | null {
    const token: string = localStorage.getItem('token') || '';
    const decodedToken: any = jwt_decode(token);
    return decodedToken.ID;
  }

}