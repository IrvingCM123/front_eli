import { Cache_Service } from 'src/app/common/services/cache.Service';
import { productoEntity } from 'src/app/domain/productos/productos.entity';
import { Injectable } from '@angular/core';
import { claseObtenerProductos } from '../../inventario/methods/obtenerProductos.class';
import { ProductosUseCase } from 'src/app/domain/productos/productos.use-case';

@Injectable()
export class claseVisualizarProducto {

  private productoId!: number;

  constructor(
    private cacheServicio: Cache_Service,
    private productoUseCase: ProductosUseCase,
    private obtenerProductos: claseObtenerProductos
  ) {
    this.obtenerProductos.productoID$.subscribe( async (productoId: number | null) => {
      if (productoId !== null) {
        await this.guardarIDProducto(productoId);
      }
    });
  }

  public async actualizarProducto(producto: productoEntity){
    try {
      const actualizar = await this.productoUseCase.actualizarProducto(producto);
      return actualizar;
    } catch (error) {
      return 'Ha ocurrido un error al actualizar el producto';
    }
  }

  public async eliminarProducto(){
    try {
      const eliminar = await this.productoUseCase.eliminarProducto(this.productoId);
      return eliminar;
    } catch (error) {
      return 'Ha ocurrido un error al eliminar el producto';
    }
  }

  public async obtenerProducto(){
    try {
      this.productoId = await this.cacheServicio.obtener_DatoLocal('productoId');
      const producto = await this.cacheServicio.obtener_DatoLocal('productos').find((producto: productoEntity) => producto.id_Producto === this.productoId);
      return producto;
    } catch (error) {
      return [];
    }
  }

  public async guardarIDProducto(productoId: number): Promise<void> {
    await this.cacheServicio.guardar_DatoLocal('productoId', productoId);
  }

}
