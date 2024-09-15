import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { proveedorEntity, crearProveedorEntity } from './proveedor.entity';
import { ProveedorPuerto } from 'src/app/config/puertos/proveedor.puerto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorUseCase {
  constructor(private readonly _proveedorPuerto: ProveedorPuerto) {}

  crearProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity> {
    return this._proveedorPuerto.crearProveedor(proveedor);
  }

  obtenerProveedores(): Observable<proveedorEntity[]> {
    return this._proveedorPuerto.obtenerProveedores();
  }

  actualizarProveedor(proveedor: proveedorEntity): Observable<proveedorEntity> {
    return this._proveedorPuerto.actualizarProveedor(proveedor);
  }

  eliminarProveedor(proveedorID: number): Observable<void> {
    return this._proveedorPuerto.eliminarProveedor(proveedorID);
  }
}


