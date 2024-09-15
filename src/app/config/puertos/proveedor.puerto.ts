import { proveedorEntity, crearProveedorEntity } from "src/app/domain/proveedores/proveedor.entity";
import { Observable } from "rxjs";

export abstract class ProveedorPuerto {
  abstract obtenerProveedores(): Observable<proveedorEntity[]>;
  abstract crearProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity>;
  abstract actualizarProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity>;
  abstract eliminarProveedor(proveedorID: number): Observable<void>;
}
