import { Observable } from "rxjs";

// Importación del componente HttpClient para realizar peticiones HTTP
import { HttpClient } from "@angular/common/http";

// Importación del decorador Injectable para inyectar el servicio en otros componentes
import { Injectable } from "@angular/core";

// Importación del archivo environment para obtener la URL de la API
import { environment } from "src/environments/environment";

// Importación de la interfaz ProductosPuerto para definir los métodos a implementar
import { ProductosPuerto } from "../puertos/productos.puerto";

// Importación de las entidades y métodos de los productos para definir los campos necesarios en la utilización de los métodos
import { crearProductoEntity, obtenerProductosInventario, ProductoEntity } from "src/app/domain/productos/productos.entity";

@Injectable({
  providedIn: "root",
})
export class productosAdaptador implements ProductosPuerto {

  // Declaración de la URL de la API para la entidad Productos
  apiUrl = environment.apiUrlLocal + "productos/";

  // Constructor del adaptador de productos
  constructor( private readonly _http: HttpClient) {}

  // Método que crea un producto en el inventario, recibiendo un objeto de tipo crearProductoEntity y realizando una petición POST a la API
  crearProducto(producto: crearProductoEntity): Observable<crearProductoEntity> {
    return this._http.post<crearProductoEntity>( this.apiUrl, producto);
  }

  // Método que actualiza un producto en el inventario, recibiendo un objeto de tipo ProductoEntity y realizando una petición PUT a la API
  actualizarProducto(productoID: number, producto: ProductoEntity): Observable<ProductoEntity> {
    return this._http.put<ProductoEntity>( this.apiUrl + productoID, producto);
  }

  // Método que elimina un producto del inventario, recibiendo un ID de tipo number y realizando una petición DELETE a la API
  eliminarProducto(productoID: number): Observable<void> {
    return this._http.delete<void>( this.apiUrl + productoID);
  }

  // Método que obtiene los productos del inventario realizando una petición GET a la API y retornando un array de objetos de tipo obtenerProductosInventario
  obtenerProductos(): Observable<obtenerProductosInventario[]> {
    return this._http.get<obtenerProductosInventario[]>( this.apiUrl);
  }

  // Método para obtener las categorias de los productos, necesarias para la creación de un producto en el inventario y estableciendo sugerencias en el campo de categoría
  obtenerCategoriaProductos(): Observable<string[]> {
    return this._http.get<string[]>( environment.apiUrlLocal + "categorias-productos");
  }

}
