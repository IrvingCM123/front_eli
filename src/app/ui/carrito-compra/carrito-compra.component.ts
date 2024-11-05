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
  }

  async obtenerCarritoCompras(): Promise<void> {
    const carritoString = await this.cache_service.obtener_DatoLocal('carritoCompras');
    this.carritoCompras = JSON.parse(carritoString);
    this.carritoCompras = this.carritoCompras[0]
  }

  eliminar_VentaProducto(producto: any): void {
    const index = this.carritoCompras.indexOf(producto);
    this.carritoCompras.splice(index, 1);
  }

  async ordenarCarritoCompras_ProveedorAgrupado(): Promise<void> {
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

    console.log(carritoAgrupado);
    this.carritoCompras = carritoAgrupado;
}

}
