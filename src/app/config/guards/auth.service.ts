import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
     // Valida el token (por ejemplo, revisa que no esté expirado)
    return !!token;
  }
}
