import { Cache_Service } from 'src/app/common/services/cache.Service';
import { inventarioUseCase } from 'src/app/domain/inventario/inventario.use-case';
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class claseObtenerProductos {
  constructor(
    private inventarioUseCase: inventarioUseCase,
    private cacheServicio: Cache_Service
  ) {}

  private productoID = new BehaviorSubject<number | null>(null);
  public productoID$ = this.productoID.asObservable();

  public async devolverProductos() {
    let productos;

    try {
      productos = await this.obtenerProductosCache();
      if (productos != false) {
        return productos;
      } else {
        productos = await this.obtenerProductos();
        return productos;
      }
    } catch (error) {
      return false;
    }
  }

  public async buscarProductoNombre( nombre: string ): Promise<inventarioEntity[]> {
    try {
      const productos: inventarioEntity[] = (await this.cacheServicio.obtener_DatoLocal('productos')) ?? [];
      if (productos.length > 0 && nombre) {
        const productosFiltrados = productos.filter((producto) =>
          producto.producto_nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        return productosFiltrados;
      } else {
        return productos;
      }
    } catch (error) {
      return [];
    }
  }

  public async obtenerCategorias() {
    try {
      const productos: inventarioEntity[] = (await this.cacheServicio.obtener_DatoLocal('productos')) ?? [];
      if (productos.length > 0) {
        const categorias = productos.map((producto) => producto.producto_categoria);
        const categoriasUnicas = categorias.filter(
          (categoria, index) => categorias.indexOf(categoria) === index
        );
        return categoriasUnicas;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  public async obtenerProductosCategoria(categoria: string) {
    try {
      const productos: inventarioEntity[] = (await this.cacheServicio.obtener_DatoLocal('productos')) ?? [];
      if (productos.length > 0 && categoria) {
        const productosFiltrados = productos.filter(
          (producto) => producto.producto_categoria === categoria
        );
        return productosFiltrados;
      } else {
        return productos;
      }
    } catch (error) {
      return [];
    }
  }


  private async obtenerProductos() {
    try {
      const resultado: inventarioEntity[] = (await this.inventarioUseCase.obtenerProductos().toPromise()) ?? [];
      if (resultado.length > 0) {
        this.cacheServicio.guardar_DatoLocal('productos', resultado);
        return resultado;
      } else {
        return resultado;
      }
    } catch (error) {
      return false;
    }
  }

  private async obtenerProductosCache() {
    try {
      const resultado: inventarioEntity[] = this.cacheServicio.obtener_DatoLocal('productos') ?? [];
      if (resultado.length > 0) {
        return resultado;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public async enviarIdProductoSeleccionado(id: number | string): Promise<void> {
    this.productoID.next(id as number);
  }


}
