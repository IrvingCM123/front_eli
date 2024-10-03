// Importación de la entidad de inventario, permitiendo definir los campos de los productos del inventario
import { inventarioEntity } from "src/app/domain/inventario/inventario.entity";

// Importación de la librería Observable, para poder utilizar observables en los métodos de la clase de puerto
import { Observable } from "rxjs";

// Definición de la clase de puerto de inventario, con los métodos abstractos para obtener los productos del inventario
export abstract class inventarioPuerto {

  // Método abstracto para obtener los productos del inventario, retorna un arreglo de productos de tipo inventarioEntity
  abstract obtenerProductos(): Observable<inventarioEntity[]>;

  // Método abstracto para obtener un producto del inventario por su nombre, recibe el nombre del producto y retorna un producto
  abstract obtenerProductoNombre(nombreProducto: string): Observable<inventarioEntity>

}
