// Importación de las entidades de proveedor para utilizar los campos necesarios en los métodos
import { proveedorEntity, crearProveedorEntity } from "src/app/domain/proveedores/proveedor.entity";
// importar el observable de rxjs para poder utilizarlo en los métodos
import { Observable } from "rxjs";

// Definición de la interfaz ProveedorPuerto para definir los métodos necesarios para el puerto de proveedor
export abstract class ProveedorPuerto {
  // Método para obtener los proveedores de la base de datos, retornando un array de objetos de tipo proveedorEntity
  abstract obtenerProveedores(): Observable<proveedorEntity[]>;
  // Método para crear un proveedor en la base de datos, recibiendo un objeto de tipo crearProveedorEntity y retornando un objeto de tipo proveedorEntity
  abstract crearProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity>;
  // Método para actualizar un proveedor en la base de datos, recibiendo un objeto de tipo crearProveedorEntity y retornando un objeto de tipo proveedorEntity
  abstract actualizarProveedor(proveedorID: number, proveedor: crearProveedorEntity): Observable<proveedorEntity>;
  // Método para eliminar un proveedor de la base de datos, recibiendo un ID de tipo number y retornando un objeto de tipo void
  abstract eliminarProveedor(proveedorID: number): Observable<void>;
  // Método para obtener los tipos de transacción para registrar los valores de las transacciones, al registrar un proveedor
  abstract obtenerTiposTransaccion(): Observable<any>;
}
