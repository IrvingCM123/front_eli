import { productoEntity } from "src/app/domain/productos/productos.entity";
import { Observable } from "rxjs";

export abstract class ProductosPuerto {
  abstract obtenerProductos(): Observable<productoEntity[]>;
  abstract crearProducto(producto: productoEntity): Observable<productoEntity>;
  abstract actualizarProducto(producto: productoEntity): Observable<productoEntity>;
  abstract eliminarProducto(productoID: number): Observable<void>;
}
