import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { productoEntity } from './productos.entity';
import { ProductosPuerto } from 'src/app/config/puertos/productos.puerto';

@Injectable({
  providedIn: 'root'
})
export class ProductosUseCase {
  constructor(private readonly _productosPuerto: ProductosPuerto) {}

  crearProducto(producto: productoEntity): Observable<productoEntity> {
    return this._productosPuerto.crearProducto(producto);
  }

  obtenerProductos(): Observable<productoEntity[]> {
    return this._productosPuerto.obtenerProductos();
  }

  actualizarProducto(producto: productoEntity): Observable<productoEntity> {
    return this._productosPuerto.actualizarProducto(producto);
  }

  eliminarProducto(productoID: number): Observable<void> {
    return this._productosPuerto.eliminarProducto(productoID);
  }
}
