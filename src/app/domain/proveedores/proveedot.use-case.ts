import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Importación de las entidades de proveedor para utilizar los campos necesarios en los métodos
import { proveedorEntity, crearProveedorEntity } from './proveedor.entity';
// Importar el puerto de proveedor para utilizar los métodos definidos en la interfaz
import { ProveedorPuerto } from 'src/app/config/puertos/proveedor.puerto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorUseCase {

  // Constructor de la clase de proveedor caso de uso
  constructor(private readonly _proveedorPuerto: ProveedorPuerto) {}

  // Método para crear un proveedor en la base de datos, recibiendo un objeto de tipo crearProveedorEntity y retornando un objeto de tipo proveedorEntity
  crearProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity> {
    // Utilizar el método de crearProveedor del puerto de proveedor
    return this._proveedorPuerto.crearProveedor(proveedor);
  }

  // Método para obtener los proveedores de la base de datos, retornando un array de objetos de tipo proveedorEntity
  obtenerProveedores(): Observable<proveedorEntity[]> {
    // Utilizar el método de obtenerProveedores del puerto de proveedor
    return this._proveedorPuerto.obtenerProveedores();
  }

  // Método para actualizar un proveedor en la base de datos, recibiendo un objeto de tipo crearProveedorEntity y retornando un objeto de tipo proveedorEntity
  actualizarProveedor(proveedor_ID: number, proveedor: crearProveedorEntity): Observable<proveedorEntity> {
    // Utilizar el método de actualizarProveedor del puerto de proveedor
    return this._proveedorPuerto.actualizarProveedor(proveedor_ID, proveedor);
  }

  // Método para eliminar un proveedor de la base de datos, recibiendo un ID de tipo number y retornando un objeto de tipo void
  eliminarProveedor(proveedorID: number): Observable<void> {
    // Utilizar el método de eliminarProveedor del puerto de proveedor
    return this._proveedorPuerto.eliminarProveedor(proveedorID);
  }

  // Metodo para obtener los tipos de transacción para registrar los valores de las transacciones, al registrar un proveedor
  obtenerTiposTransaccion(): Observable<any> {
    // Utilizar el método de obtenerTiposTransaccion del puerto de proveedor
    return this._proveedorPuerto.obtenerTiposTransaccion();
  }
}


