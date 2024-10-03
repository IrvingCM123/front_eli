import { Injectable } from '@angular/core';

// Decorador Injectable para inyectar servicios en otros componentes o servicios
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cache_Service {

  // Crear un observable para el estado del login y un subject para actualizar el estado del login en el observable, permite saber si el usuario está logueado o no
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  // Método para obtener un dato del local storage, recibe el índice y retorna el valor del índice
  obtener_DatoLocal(indice: string): any | null {
    // Obtener el valor del índice del local storage
    const valorString = localStorage.getItem(indice);
    // Si el valor es diferente de nulo
    if (valorString) {
      // Intentar parsear el valor a JSON y retornarlo, si hay un error retornar nulo
      try {
        return JSON.parse(valorString);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Método para guardar un dato en el local storage, recibe el índice y el valor
  guardar_DatoLocal(indice: string, valor: any): void {
    // Convertir el valor a string y guardarlo en el local storage
    const valorString = JSON.stringify(valor);
    // Guardar el valor en el local storage
    localStorage.setItem(indice, valorString);
  }

  // Método para eliminar un dato del local storage, recibe el índice
  eliminar_DatoLocal(indice: string): void {
    localStorage.removeItem(indice);
  }

  // Método para actualizar un dato del local storage, recibe el índice y el valor
  actualizar_DatoLocal(indice: string, valor: any) {
    localStorage.setItem(indice, JSON.stringify(valor));
  }

  // Método para guardar un arreglo en el local storage, recibe el índice y el valor
  guardar_ArregloLocal(indice: string, valor: any): void {
    const arreglo_Local = JSON.parse(this.obtener_DatoLocal(indice)) || [];
    arreglo_Local.push(valor);
    this.guardar_DatoLocal(indice, JSON.stringify(arreglo_Local));
  }

  // Método para actualizar el estado del login, recibe un booleano y actualiza el estado del login en el observable
  Actualizar_Login(loggedIn: boolean) {
    // Guardar el estado del login en el local storage y en el observable
    this.guardar_DatoLocal('loggedIn', loggedIn);
    this.loggedInSubject.next(loggedIn);
  }

  // Método para eliminar todos los datos del local storage y de la sesión del navegador, permitiendo cerrar la sesión sin dejar valores en el navegador
  eliminarCacheNavegador() {
    // Verificar si el navegador soporta caches y si hay caches
    if (caches && caches.keys) {
      //Obtener las keys de los caches y eliminarlas
      caches.keys().then(function (keys) {
        // Recorrer las keys y eliminarlas
        keys.forEach(function (key) {
          // Eliminar la key
          caches.delete(key);
        });
      });
    }

    // Eliminar todos los datos del local storage y de la sesión del navegador
    localStorage.clear();
    sessionStorage.clear();
  }

}
