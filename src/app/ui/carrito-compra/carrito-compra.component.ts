import { Component, OnInit } from '@angular/core';
import { Cache_Service } from 'src/app/common/services/cache.Service';


@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {

  constructor(
    private cache_service: Cache_Service
  ) { }

  carritoCompras: any = [];

  opcionesOrdenar: any;
  sortKey: string = '';
  ordenPrecios: number = 0;
  sortField: string = '';

  async ngOnInit(): Promise<void> {
    await this.obtenerCarritoCompras();
    await this.ordenarCarritoCompras_ProveedorAgrupado();
    console.log('Carrito de compras', this.carritoCompras);
  }

  async obtenerCarritoCompras(): Promise<void> {
    const carritoString = await this.cache_service.obtener_DatoLocal('carritoCompras');
    this.carritoCompras = JSON.parse(carritoString);
    this.carritoCompras = this.carritoCompras[0]
    console.log('Carrito de compras', this.carritoCompras);
  }

  eliminar_VentaProducto(producto: any): void {
    const nombreProducto = producto.producto; // Obtener el nombre del producto a eliminar

    // Iterar sobre cada proveedor en el carrito de compras
    for (let i = 0; i < this.carritoCompras.length; i++) {
      const proveedor = this.carritoCompras[i];

      // Buscar el índice del producto en el arreglo de productos del proveedor
      const index = proveedor.productos.findIndex((item: any) => item.producto === nombreProducto);

      // Si se encuentra el producto, eliminarlo
      if (index !== -1) {
        proveedor.productos.splice(index, 1); // Eliminar el producto del arreglo
        break; // Salir del bucle una vez que se elimina el producto
      }
    }

    // Actualizar el almacenamiento local
    this.cache_service.eliminar_DatoLocal('carritoCompras');
    this.cache_service.guardar_ArregloLocal('carritoCompras', this.carritoCompras);
    this.ordenarCarritoCompras_ProveedorAgrupado();
  }

  async ordenarCarritoCompras_ProveedorAgrupado(): Promise<void> {
    // Verificar si no existen las propiedades `proveedor` y `productos` en los elementos del carrito
    const requiereAgrupacion = this.carritoCompras.some((item: { proveedor?: any; productos?: any; }) => !item.proveedor || !item.productos);

    if (requiereAgrupacion) {
      // Agrupar los productos por proveedor
      const carritoAgrupado = this.carritoCompras.reduce((acc: any, producto: any) => {
        const { proveedor, producto: nombreProducto, cantidad, imagen } = producto;

        // Verificar si ya existe el proveedor en el acumulador
        const proveedorExistente = acc.find((item: any) => item.proveedor === proveedor);

        if (proveedorExistente) {
          // Si el proveedor ya existe, agregar el producto y actualizar la cantidad
          const productoExistente = proveedorExistente.productos.find((p: any) => p.producto === nombreProducto);
          if (productoExistente) {
            productoExistente.cantidad += cantidad; // Sumar cantidad si el producto ya está en la lista
          } else {
            // Si el producto no existe, agregarlo al arreglo de productos del proveedor
            proveedorExistente.productos.push({ producto: nombreProducto, cantidad, imagen });
          }
        } else {
          // Si el proveedor no existe, crear un nuevo objeto para el proveedor
          acc.push({
            proveedor,
            productos: [{ producto: nombreProducto, cantidad, imagen }]
          });
        }

        return acc;
      }, []);

      this.carritoCompras = carritoAgrupado;
      this.carritoCompras = this.carritoCompras.filter((item: any) => item.productos && Array.isArray(item.productos) && item.productos.length > 0);

    } else {
      this.carritoCompras = this.carritoCompras.filter((item: any) => item.productos && Array.isArray(item.productos) && item.productos.length > 0);
    }
  }



  async generarOrdenCompra(): Promise<void> {
    console.log('Generar orden de compra', this.carritoCompras);
  }

}
