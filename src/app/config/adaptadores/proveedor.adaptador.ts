import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { ProveedorPuerto } from "../puertos/proveedor.puerto";
import { crearProveedorEntity, proveedorEntity } from "src/app/domain/proveedores/proveedor.entity";

@Injectable({
  providedIn: "root",
})
export class proveedorAdaptador implements ProveedorPuerto {

  apiUrl = environment.apiUrlLocal + "proveedores/";

  constructor( private readonly _http: HttpClient) {}

  crearProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity> {
    return this._http.post<proveedorEntity>( this.apiUrl, proveedor);
  }

  actualizarProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity> {
    return this._http.put<proveedorEntity>( this.apiUrl, proveedor);
  }

  eliminarProveedor(proveedorID: number): Observable<void> {
    return this._http.delete<void>( this.apiUrl + proveedorID);
  }

  obtenerProveedores(): Observable<proveedorEntity[]> {
    return this._http.get<proveedorEntity[]>( this.apiUrl);
  }

}
