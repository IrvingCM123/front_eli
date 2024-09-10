import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cache_Service {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  obtener_DatoLocal(indice: string): any | null {
    const valorString = localStorage.getItem(indice);
    if (valorString) {
      try {
        return JSON.parse(valorString);
      } catch (error) {
        return null;
      }
    }
    return null;
  }


  guardar_DatoLocal(indice: string, valor: any): void {
    const valorString = JSON.stringify(valor);
    localStorage.setItem(indice, valorString);
  }

  eliminar_DatoLocal(indice: string): void {
    localStorage.removeItem(indice);
  }

  actualizar_DatoLocal(indice: string, valor: any) {
    localStorage.setItem(indice, JSON.stringify(valor));
  }

  guardar_ArregloLocal(indice: string, valor: any): void {
    const arreglo_Local = JSON.parse(this.obtener_DatoLocal(indice)) || [];
    arreglo_Local.push(valor);
    this.guardar_DatoLocal(indice, JSON.stringify(arreglo_Local));
  }

  Actualizar_Login(loggedIn: boolean) {
    this.loggedInSubject.next(loggedIn);
  }


  eliminarCacheNavegador() {
    if (caches && caches.keys) {
      caches.keys().then(function (keys) {
        keys.forEach(function (key) {
          caches.delete(key);
        });
      });
    }

    localStorage.clear();

    sessionStorage.clear();
  }

}
