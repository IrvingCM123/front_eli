import { Component, OnInit } from '@angular/core';
import { Cache_Service } from 'src/app/common/services/cache.Service';
import { generarOrdenCompra, generarDetalleCompra, generarProductoCompra } from 'src/app/domain/compras/compras.entity';
import { generarCompraUseCase } from 'src/app/domain/compras/compras.use-case';
import { tipoCompras } from 'src/app/common/enums/tipoCompras.enum';
import { AuthService } from 'src/app/config/guards/auth.service';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css'],
  providers: [claseMostrarAlerta],

})
export class CarritoCompraComponent implements OnInit {

  constructor(
    private cache_service: Cache_Service,
    private compraUseCase: generarCompraUseCase,
    private authService: AuthService,
    private claseMostrarAlerta: claseMostrarAlerta,

  ) { }

  productoCompraGenerada: generarProductoCompra = {
    productoOC_Cantidad_Producto: 0,
    productoOC_Nombre_Producto: '',
    productoOC_Producto_ID: 0
  }

  detalleCompraGenerada: generarDetalleCompra = {
    detalleOC_Cantidad_Producto: 0,
    detalleOC_Proveedor_ID: 0,
    detalleOC_Cuenta_ID: 0,
    detalleOC_ProductoOC: [this.productoCompraGenerada]
  }

  ordenCompraGenerada: generarOrdenCompra = {
    orden_compra_estado: tipoCompras.PENDIENTE,
    detalle_orden_compra: [this.detalleCompraGenerada]
  }

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
    this.carritoCompras = this.carritoCompras[0] ?? [];
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

        // Si el proveedor ya no tiene productos, eliminarlo también
        if (proveedor.productos.length === 0) {
          this.carritoCompras.splice(i, 1); // Eliminar el proveedor del carrito
        }

        break; // Salir del bucle una vez que se procesa el producto
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
        const { proveedor, producto: nombreProducto, cantidad, imagen, proveedorID, productoID } = producto;

        // Verificar si ya existe el proveedor en el acumulador
        const proveedorExistente = acc.find((item: any) => item.proveedor === proveedor);

        if (proveedorExistente) {
          // Si el proveedor ya existe, agregar el producto y actualizar la cantidad
          const productoExistente = proveedorExistente.productos.find((p: any) => p.producto === nombreProducto);
          if (productoExistente) {
            productoExistente.cantidad += cantidad; // Sumar cantidad si el producto ya está en la lista
          } else {
            // Si el producto no existe, agregarlo al arreglo de productos del proveedor
            proveedorExistente.productos.push({ producto: nombreProducto, cantidad, imagen, productoID });
          }
        } else {
          // Si el proveedor no existe, crear un nuevo objeto para el proveedor
          acc.push({
            proveedor,
            proveedorID,
            productos: [{ producto: nombreProducto, cantidad, imagen, productoID }]
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

    let loading = await this.claseMostrarAlerta.crearLoading('Generando Orden de Compra...');
    loading.present();
    try {
      let ordenes = [];

      for (let i = 0; i < this.carritoCompras.length; i++) {
        // Crear una nueva instancia de detalleCompraGenerada y limpiar el array de productos
        let detalleCompra = JSON.parse(JSON.stringify(this.detalleCompraGenerada));
        detalleCompra.detalleOC_ProductoOC = []; // Limpiar productos iniciales
        detalleCompra.detalleOC_Proveedor_ID = this.carritoCompras[i].proveedorID;

        for (let j = 0; j < this.carritoCompras[i].productos.length; j++) {
          // Crear una nueva instancia de productoCompraGenerada
          let productoCompra = JSON.parse(JSON.stringify(this.productoCompraGenerada));
          productoCompra.productoOC_Cantidad_Producto = this.carritoCompras[i].productos[j].cantidad;
          productoCompra.productoOC_Nombre_Producto = this.carritoCompras[i].productos[j].producto;
          productoCompra.productoOC_Producto_ID = this.carritoCompras[i].productos[j].productoID;

          // Agregar el producto al detalle de compra
          detalleCompra.detalleOC_ProductoOC.push(productoCompra);

          // Actualizar los totales del detalle de compra
          detalleCompra.detalleOC_Cantidad_Producto += productoCompra.productoOC_Cantidad_Producto;
          detalleCompra.detalleOC_Cuenta_ID = this.authService.obtenerIdUsuario() || 0;
        }

        // Crear una nueva instancia de ordenCompraGenerada
        let ordenCompra = JSON.parse(JSON.stringify(this.ordenCompraGenerada));
        ordenCompra.detalle_orden_compra = [detalleCompra];

        // Agregar la orden de compra al arreglo
        ordenes.push(ordenCompra);
      }

      // Envolver el arreglo de órdenes en un objeto con título "ordenes_compra"
      const resultadoFinal: any = {
        ordenes_compra: ordenes,
      };


      const resultado = await this.compraUseCase.registrarOrdenCompra(resultadoFinal).toPromise();
      loading.dismiss();

      if (resultado.status == 201) {
        this.claseMostrarAlerta.mostrarAlertaRuta('Éxito', 'La orden de compra se ha generado correctamente', 'inventario')
        this.cache_service.eliminar_DatoLocal('carritoCompras');
      } else {
        this.claseMostrarAlerta.mostrarAlerta('Error', 'No se pudo enviar la orden de compra')
      }

    } catch (error) {
      loading.dismiss();
      this.claseMostrarAlerta.mostrarAlerta('Error', 'No se pudo enviar la orden de compra')
    }


  }

}
