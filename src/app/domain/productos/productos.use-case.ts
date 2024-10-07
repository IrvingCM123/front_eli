import { Injectable } from '@angular/core';
// Importar Observable para poder retornar un observable
import { Observable } from 'rxjs';

// Importar las entidades que se utilizaran en el caso de uso de productos, estableciendo los campos necesarios para el funcionamiento de los métodos
import { ProductoEntity, obtenerProductosInventario, crearProductoEntity } from './productos.entity';

// Importar el puerto de productos para poder utilizar los métodos definidos en la interfaz ProductosPuerto
import { ProductosPuerto } from 'src/app/config/puertos/productos.puerto';

@Injectable({
  providedIn: 'root'
})
export class ProductosUseCase {

  // Inyección del puerto de productos para utilizar los métodos definidos en la interfaz ProductosPuerto
  constructor(private readonly _productosPuerto: ProductosPuerto) {}

  // Método para crear un producto en el inventario, recibiendo un objeto de tipo crearProductoEntity y retornando un objeto de tipo crearProductoEntity
  crearProducto(producto: crearProductoEntity): Observable<crearProductoEntity> {
    return this._productosPuerto.crearProducto(producto);
  }

  // Método para obtener los productos del inventario, retornando un array de objetos de tipo obtenerProductosInventario
  obtenerProductos(): Observable<obtenerProductosInventario[]> {
    return this._productosPuerto.obtenerProductos();
  }

  // Método para actualizar un producto en el inventario, recibiendo un objeto de tipo ProductoEntity y retornando un objeto de tipo ProductoEntity
  actualizarProducto(productoID: number, producto: ProductoEntity): Observable<ProductoEntity> {
    return this._productosPuerto.actualizarProducto(productoID, producto);
  }

  // Método para eliminar un producto del inventario, recibiendo un ID de tipo number y retornando un objeto de tipo void
  eliminarProducto(productoID: number): Observable<void> {
    return this._productosPuerto.eliminarProducto(productoID);
  }

  // Método para activar un producto en el inventario, recibiendo un ID de tipo number y retornando un objeto de tipo void
  activarProducto(productoID: number): Observable<void> {
    return this._productosPuerto.activarProducto(productoID);
  }

  // Método para obtener las categorias de los productos, necesarias para la creación de un producto en el inventario y estableciendo sugerencias en el campo de categor
  obtenerCategoriaProductos(): Observable<string[]> {
    return this._productosPuerto.obtenerCategoriaProductos();
  }

}
