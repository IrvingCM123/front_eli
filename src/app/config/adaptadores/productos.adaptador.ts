import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { ProductosPuerto } from "../puertos/productos.puerto";
import { productoEntity } from "src/app/domain/productos/productos.entity";

@Injectable({
  providedIn: "root",
})
export class productosAdaptador implements ProductosPuerto {

  apiUrl = environment.apiUrlLocal + "productos/";

  constructor( private readonly _http: HttpClient) {}

  crearProducto(producto: productoEntity): Observable<productoEntity> {
    return this._http.post<productoEntity>( this.apiUrl, producto);
  }

  actualizarProducto(producto: productoEntity): Observable<productoEntity> {
    return this._http.put<productoEntity>( this.apiUrl, producto);
  }

  eliminarProducto(productoID: number): Observable<void> {
    return this._http.delete<void>( this.apiUrl + productoID);
  }

  obtenerProductos(): Observable<productoEntity[]> {
    return this._http.get<productoEntity[]>( this.apiUrl);
  }

}
