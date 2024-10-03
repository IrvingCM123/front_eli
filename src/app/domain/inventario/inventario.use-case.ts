// Importación del Injectable, para poder inyectar servicios en la clase de inventarioUseCase
import { Injectable } from "@angular/core";

// Importación de la librería Observable, para poder utilizar observables en los métodos de la clase de inventarioUseCase
import { Observable } from "rxjs";

// Importación de la entidad de inventario, permitiendo definir los campos de los productos del inventario en la clase de inventarioUseCase
import { inventarioEntity } from "./inventario.entity";

// Importación del puerto de inventario, para poder implementar los métodos definidos en él en la clase de inventarioUseCase
import { inventarioPuerto } from "src/app/config/puertos/inventario.puerto";

@Injectable ({
  providedIn : "root"
})
export class inventarioUseCase {

  // Constructor de la clase de inventarioUseCase, del puerto de inventario
  constructor (private readonly _inventarioPuerto: inventarioPuerto) {}

  // Método para obtener los productos del inventario, retorna un arreglo de productos de tipo inventarioEntity
  obtenerProductos(): Observable<inventarioEntity[]> {
    // Se ejecuta el método de obtener productos del puerto de inventario
    return this._inventarioPuerto.obtenerProductos();
  }

  // Método para obtener un producto del inventario por su nombre, recibe el nombre del producto y retorna un producto
  obtenerProductoNombre(nombreProducto: string): Observable<inventarioEntity> {
    // Se ejecuta el método de obtener producto por nombre del puerto de inventario
    return this._inventarioPuerto.obtenerProductoNombre(nombreProducto);
  }

}
