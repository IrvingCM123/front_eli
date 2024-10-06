// Importación de la clase de Cache_Service para poder utilizar los métodos de almacenamiento local
import { Cache_Service } from 'src/app/common/services/cache.Service';

// Importación de la clase de inventarioUseCase para poder utilizar los métodos de obtener productos del inventario
import { inventarioUseCase } from 'src/app/domain/inventario/inventario.use-case';

// Importación de la entidad de inventario para poder utilizarla en la clase de obtener productos de inventario
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';

// Importación de la librería Injectable, para poder inyectar servicios en la clase de obtener productos de inventario
import { Injectable } from '@angular/core';

// Importación de la librería BehaviorSubject de RxJS, para poder utilizar un observable de un solo valor
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class claseObtenerProductos {

  // Constructor de la clase de obtener productos, del caso de uso de inventario y del servicio de caché
  constructor(
    private inventarioUseCase: inventarioUseCase,
    private cacheServicio: Cache_Service
  ) {}

  // Declaración de las variables necesarias para crear un observable de un solo valor, permitiendo enviar el ID del producto seleccionado a otros componentes
  private productoID = new BehaviorSubject<number | null>(null);
  public productoID$ = this.productoID.asObservable();

  // Método para retornar los productos del inventario, almacenados en el sistema o en caché
  public async devolverProductos() {

    // Declaración de la variable productos, para almacenar los productos del inventario
    let productos;

    try {

      // El sistema intenta obtener los productos del inventario almacenados en caché, almacenando el resultado en la variable productos
      productos = await this.obtenerProductosCache();
      // Si el resultado es distinto de falso, indica que existe información en caché y se retorna la información
      if (productos != false) {
        return productos;
      } else {
        // Si el método retorna un false, indica que no hay productos almacenados en caché, por lo que se hace un llamado a la API para obtener los productos
        productos = await this.obtenerProductos();
        // Retorna los productos obtenidos de la API
        return productos;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para buscar un producto por su nombre, recibe el nombre del producto y retorna un arreglo de productos
  public async buscarProductoNombre( nombre: string ): Promise<inventarioEntity[]> {

    try {

      // Se declara una variable, de tipo arreglo, para obtener los productos del inventario almacenados en caché del navegador
      const productos: inventarioEntity[] = (await this.cacheServicio.obtener_DatoLocal('productos')) ?? [];

      // Si la cantidad de productos es mayor a 0 y el nombre del producto no es nulo, se filtran los productos por el nombre del producto
      if (productos.length > 0 && nombre) {

        // Se filtran los productos por el nombre del producto, almacenando el resultado en la variable productosFiltrados
        const productosFiltrados = productos.filter((producto: any) =>
          // Se convierte el nombre del producto y el nombre ingresado a minúsculas, para poder compararlos sin importar las mayúsculas
          producto.inventario_ProductoID.producto_Nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        // Se retorna el arreglo de productos filtrados que coinciden con el nombre ingresado
        return productosFiltrados;
      } else {
        // Si no se encuentran productos o el nombre del producto es nulo, se retornan todos los productos del inventario
        return productos;
      }
    } catch (error) {
      return [];
    }
  }

  // Método para obtener las categorías de los productos del inventario
  public async obtenerCategorias() {

    try {
      // Se declara una variable, de tipo arreglo, para obtener los productos del inventario almacenados en caché del navegador
      const productos: inventarioEntity[] = (await this.cacheServicio.obtener_DatoLocal('productos')) ?? [];
      // Si la cantidad de productos es mayor a 0, se obtienen las categorías de los productos
      if (productos.length > 0) {
        // Se obtienen las categorías de los productos, almacenando el resultado en la variable categorias y se eliminan las categorías duplicadas
        const categorias = productos.map((producto: any) => producto.inventario_ProductoID.producto_Categoria);
        // Se eliminan las categorías duplicadas, almacenando el resultado en la variable categoriasUnicas
        const categoriasUnicas = categorias.filter(
          (categoria, index) => categorias.indexOf(categoria) === index
        );
        // Se retornan las categorías únicas de los productos del inventario
        return categoriasUnicas;
      } else {
        // Si no se encuentran productos, se retorna un arreglo vacío
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  // Método para obtener los productos de una categoría específica, recibe la categoría del producto y retorna un arreglo de productos
  public async obtenerProductosCategoria(categoria: string) {

    try {
      // Se declara una variable, de tipo arreglo, para obtener los productos del inventario almacenados en caché del navegador
      const productos: inventarioEntity[] = (await this.cacheServicio.obtener_DatoLocal('productos')) ?? [];
      // Si la cantidad de productos es mayor a 0 y la categoría no es nula, se filtran los productos por la categoría del producto
      if (productos.length > 0 && categoria) {
        // Se filtran los productos por la categoría del producto, almacenando el resultado en la variable productosFiltrados
        const productosFiltrados = productos.filter(
          (producto) => producto.producto_categoria === categoria
        );
        // Se retornan los productos filtrados por la categoría del producto
        return productosFiltrados;
      } else {
        // Si no se encuentran productos o la categoría es nula, se retornan todos los productos del invent
        return productos;
      }
    } catch (error) {
      return [];
    }
  }

  // Método para obtener los productos del inventario, realiza una petición a la API y retorna un arreglo de productos
  private async obtenerProductos() {

    try {
      // Se utiliza el método obtenerProductos del caso de uso de inventario, realizando un llamado a la API para obtener los productos del inventario
      const resultado: inventarioEntity[] = (await this.inventarioUseCase.obtenerProductos().toPromise()) ?? [];

      // Si la cantidad de productos es mayor a 0, se almacenan los productos en caché del navegador
      if (resultado.length > 0) {
        // Se almacenan los productos en caché del navegador con la clave 'productos'
        this.cacheServicio.guardar_DatoLocal('productos', resultado);
        // Se retorna el arreglo de productos del inventario
        return resultado;
      } else {
        // Si no se encuentran productos, se retorna un arreglo vacío
        return resultado;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para obtener los productos del inventario almacenados en caché del navegador
  private async obtenerProductosCache() {
    try {
      // Se obtienen los productos del inventario almacenados en caché del navegador, almacenando el resultado en la variable resultado
      const resultado: inventarioEntity[] = this.cacheServicio.obtener_DatoLocal('productos') ?? [];
      // Si la cantidad de productos es mayor a 0, se retornan los productos del inventario almacenados
      if (resultado.length > 0) {
        // Se retorna el arreglo de productos del inventario almacenados en caché
        return resultado;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para enviar el ID del producto seleccionado a otros componentes
  public async enviarIdProductoSeleccionado(producto: any): Promise<void> {
    this.productoID.next(producto);
    this.cacheServicio.guardar_DatoLocal('productoSeleccionado', producto);
  }

}
