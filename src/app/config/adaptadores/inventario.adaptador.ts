import { Observable } from "rxjs";

// Importación del módulo HttpClient para poder realizar peticiones HTTP
import { HttpClient } from "@angular/common/http";

// Importación del decorador Injectable para poder inyectar servicios en la clase de inventarioAdaptador
import { Injectable } from "@angular/core";

// Importación del archivo de variables de entorno para poder utilizar la URL de la API
import { environment } from "src/environments/environment";

// Importación del puerto de inventario para poder implementar los métodos definidos en él
import { inventarioPuerto } from "../puertos/inventario.puerto";

// Importación de la entidad de inventario para poder utilizarla en la clase de inventarioAdaptador
import { inventarioEntity } from "src/app/domain/inventario/inventario.entity";

@Injectable({
  providedIn: "root",
})
export class inventarioAdaptador implements inventarioPuerto {

  // URL de la API de inventario
  apiUrl = environment.apiUrlLocal + "inventario";

  // Constructor de la clase de inventarioAdaptador, del módulo HttpClient
  constructor( private readonly _http: HttpClient) {}

  // Método para obtener los productos del inventario, retorna un arreglo de productos
  obtenerProductos(): Observable<inventarioEntity[]> {
    // Se realiza una petición GET a la API de inventario, obteniendo un arreglo de productos de tipo inventarioEntity
    return this._http.get<inventarioEntity[]>( this.apiUrl);
  }

  // Método para obtener un producto del inventario por su nombre, recibe el nombre del producto y retorna un producto
  obtenerProductoNombre(nombreProducto: string): Observable<inventarioEntity> {
    return this._http.get<inventarioEntity>( this.apiUrl + "?nombre=" + nombreProducto);
  }

}
