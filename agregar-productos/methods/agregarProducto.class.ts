import { Injectable } from "@angular/core";

// Importación de la entidad crearProductoEntity para definir los campos necesarios para la creación de un producto
import { crearProductoEntity, ProductoEntity } from "src/app/domain/productos/productos.entity";

// Importación de los métodos necesarios para la creación de un producto en el inventario a través del caso de uso de productos
import { ProductosUseCase } from "src/app/domain/productos/productos.use-case";

// Importación de la clase proveedor para obtener los proveedores disponibles en el inventario, reutilizando los métodos de la clase
import { claseProveedor } from "../../proveedores/methods/proveedor.class";

// Importación del servicio de caché para almacenar las categorías de los productos y reutilizarlas en la creación de un producto
import { Cache_Service } from "src/app/common/services/cache.Service";

@Injectable()
export class claseAgregarProducto {

  // Constructor de la clase de agregar productos
  constructor(
    private productosUseCase: ProductosUseCase,
    private claseProveedor: claseProveedor,
    private cacheService: Cache_Service
  ) {}

  // Método para agregar un producto al inventario, recibiendo un objeto de tipo crearProductoEntity y retornando un objeto de tipo crearProducto
  async agregarProducto(producto: crearProductoEntity) {
    const resultado = await this.productosUseCase.crearProducto(producto).toPromise;
    return resultado;
  }

  // Método para obtener las categorías de los productos, necesarias para la creación de un producto en el inventario y estableciendo sugerencias en el campo de categoría
  async devolverCategoriaProductos() {
    // Declaración de la variable categorias
    let categorias;
    try {
      // Obtener las categorías de los productos almacenadas en caché utilizando el método obtenerCategoriasProductoCache
      categorias = await this.obtenerCategoriasProductoCache();
      // Si existen categorías almacenadas en caché, retornar las categorías almacenadas
      if (categorias != false) {
        return categorias;
      } else {
        // Si no existen categorías almacenadas en caché, obtener las categorías de los productos utilizando el método obtenerCategoriaProductos con una petición a la API
        categorias = await this.obtenerCategoriaProductos();
        // Retornar las categorías obtenidas
        return categorias;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para obtener las categorías de los productos, necesarias para la creación de un producto en el inventario y estableciendo sugerencias en el campo de categoría
  async obtenerCategoriaProductos() {
    try {
      // Obtener las categorías de los productos utilizando el método obtenerCategoriaProductos del caso de uso de productos con una petición a la API
      const resultado = (await this.productosUseCase.obtenerCategoriaProductos().toPromise()) ?? [];
      // Si existen categorías, almacenarlas en caché utilizando el método guardar_DatoLocal
      if (resultado.length > 0) {
        // Almacenar las categorías en caché
        this.cacheService.guardar_DatoLocal('categorias', resultado);
        return resultado;
      } else {
        return resultado;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para obtener las categorías de los productos almacenadas en caché
  async obtenerCategoriasProductoCache() {
    try {
      // Obtener las categorías de los productos almacenadas en caché utilizando el método obtener_DatoLocal
      const resultado = this.cacheService.obtener_DatoLocal('categorias') ?? [];
      // Si existen categorías almacenadas en caché, retornar las categorías almacenadas
      if (resultado.length > 0) {
        return resultado;
      } else {
        // Si no existen categorías almacenadas en caché, retornar false para indicar que no existen categorías almacenadas
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // Método para obtener los proveedores disponibles en el sistema reutilizando los métodos de la clase proveedor
  async obtenerProveedores() {
    // Obtener los proveedores disponibles en el sistema utilizando el método devolverProveedores de la clase proveedor
    const proveedores = await this.claseProveedor.devolverProveedores();
    // Retornar los proveedores obtenidos
    return proveedores;
  }

}
