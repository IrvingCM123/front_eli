// Importación de las entidades y métodos de los productos para definir los campos necesarios en la utilización de los métodos
import { crearProductoEntity, ProductoEntity, obtenerProductosInventario } from "src/app/domain/productos/productos.entity";
// Importación del método Observable de la librería rxjs para la utilización de observables
import { Observable } from "rxjs";

// Definición de la interfaz ProductosPuerto para definir los métodos a implementar
export abstract class ProductosPuerto {
  // Método que obtiene los productos del inventario, retornando un array de objetos de tipo obtenerProductosInventario
  abstract obtenerProductos(): Observable<obtenerProductosInventario[]>;
  // Método que crea un producto en el inventario, recibiendo un objeto de tipo crearProductoEntity y retornando un objeto de tipo crearProductoEntity
  abstract crearProducto(producto: crearProductoEntity): Observable<crearProductoEntity>;
  // Método que actualiza un producto en el inventario, recibiendo un objeto de tipo ProductoEntity y retornando un objeto de tipo ProductoEntity
  abstract actualizarProducto(productoID: number, producto: ProductoEntity): Observable<ProductoEntity>;
  // Método que elimina un producto del inventario, recibiendo un ID de tipo number y retornando un objeto de tipo void
  abstract eliminarProducto(productoID: number): Observable<void>;
  // Método para obtener las categorias de los productos, necesarias para la creación de un producto en el inventario y estableciendo sugerencias en el campo de categoría
  abstract obtenerCategoriaProductos(): Observable<string[]>;
}
