import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { inventarioEntity } from "./inventario.entity";
import { inventarioPuerto } from "src/app/config/puertos/inventario.puerto";

@Injectable ({
  providedIn : "root"
})
export class inventarioUseCase {

  constructor (private readonly _inventarioPuerto: inventarioPuerto) {}

  obtenerProductos(): Observable<inventarioEntity[]> {
    return this._inventarioPuerto.obtenerProductos();
  }

  obtenerProductoNombre(nombreProducto: string): Observable<inventarioEntity> {
    return this._inventarioPuerto.obtenerProductoNombre(nombreProducto);
  }

}
