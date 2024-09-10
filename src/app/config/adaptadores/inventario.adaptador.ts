import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { inventarioPuerto } from "../puertos/inventario.puerto";
import { inventarioEntity } from "src/app/domain/inventario/inventario.entity";

@Injectable({
  providedIn: "root",
})
export class inventarioAdaptador implements inventarioPuerto {

  apiUrl = environment.apiUrlLocal + "productos";

  constructor( private readonly _http: HttpClient) {}

  obtenerProductos(): Observable<inventarioEntity[]> {
    return this._http.get<inventarioEntity[]>( this.apiUrl);
  }

  obtenerProductoNombre(nombreProducto: string): Observable<inventarioEntity> {
    return this._http.get<inventarioEntity>( this.apiUrl + "?nombre=" + nombreProducto);
  }

}
