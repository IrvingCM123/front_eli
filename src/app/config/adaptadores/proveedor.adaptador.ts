import { Observable } from "rxjs";
// Importar HttpClient para poder realizar peticiones HTTP
import { HttpClient } from "@angular/common/http";
// Importar Injectable para poder inyectar el servicio
import { Injectable } from "@angular/core";
// Importar environment para obtener la URL de la API
import { environment } from "src/environments/environment";
// Importación del puerto de proveedor para utilizar los métodos definidos en la interfaz
import { ProveedorPuerto } from "../puertos/proveedor.puerto";
// Importación de las entidades de proveedor para utilizar los campos necesarios en los métodos
import { crearProveedorEntity, proveedorEntity } from "src/app/domain/proveedores/proveedor.entity";

@Injectable({
  providedIn: "root",
})
export class proveedorAdaptador implements ProveedorPuerto {

  // Declaración de la variable apiUrl para almacenar la URL de la API
  apiUrl = environment.apiUrlLocal + "proveedores/";

  // Constructor de la clase de proveedor adaptador
  constructor( private readonly _http: HttpClient) {}

  // Método para crear un proveedor en la base de datos, recibiendo un objeto de tipo crearProveedorEntity y retornando un objeto de tipo proveedorEntity
  crearProveedor(proveedor: crearProveedorEntity): Observable<proveedorEntity> {
    // Realizar una petición POST a la API para crear un proveedor
    return this._http.post<proveedorEntity>( this.apiUrl, proveedor);
  }

  // Método para actualizar un proveedor en la base de datos, recibiendo un objeto de tipo crearProveedorEntity y retornando un objeto de tipo proveedorEntity
  actualizarProveedor(proveedorID: number, proveedor: crearProveedorEntity): Observable<proveedorEntity> {
    // Realizar una petición PUT a la API para actualizar un proveedor
    return this._http.put<proveedorEntity>( this.apiUrl + proveedorID, proveedor);
  }

  // Método para eliminar un proveedor de la base de datos, recibiendo un ID de tipo number y retornando un objeto de tipo void
  eliminarProveedor(proveedorID: number): Observable<void> {
    // Realizar una petición DELETE a la API para eliminar un proveedor
    return this._http.delete<void>( this.apiUrl + proveedorID);
  }

  // Método para obtener los proveedores de la base de datos, retornando un array de objetos de tipo proveedorEntity
  obtenerProveedores(): Observable<proveedorEntity[]> {
    // Realizar una petición GET a la API para obtener los proveedores
    return this._http.get<proveedorEntity[]>( this.apiUrl);
  }

  // Método para obtener los tipos de transacción para registrar los valores de las transacciones, al registrar un proveedor
  obtenerTiposTransaccion(): Observable<any> {
    // Realizar una petición GET a la API para obtener los tipos de transacción
    return this._http.get<any>( environment.apiUrlLocal + 'tipos-transaccion' );
  }
}
