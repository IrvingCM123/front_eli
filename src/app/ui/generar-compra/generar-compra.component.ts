import { Component, OnInit } from '@angular/core';
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';
import { claseObtenerProductos } from './methods/obtenerProductos.class';
import { Router } from '@angular/router';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { Cache_Service } from 'src/app/common/services/cache.Service';

@Component({
  selector: 'app-generar-compra',
  templateUrl: './generar-compra.component.html',
  styleUrls: ['./generar-compra.component.css'],
  providers: [claseObtenerProductos, claseMostrarAlerta],
})
export class GenerarCompraComponent implements OnInit {
  constructor(
    private claseObtenerProductos: claseObtenerProductos,
    private router: Router,
    private claseMostrarAlerta: claseMostrarAlerta,
    private cacheService: Cache_Service
  ) { }

  opcionesOrdenar: any;
  sortKey: string = '';
  ordenPrecios: number = 0;
  sortField: string = '';

  categoriasProductos: any;
  categoriaSeleccionada: string = '';

  proveedoresProductos: any;
  proveedorSeleccionado: string = '';

  productoBuscar: string = '';
  productosObtenidos!: inventarioEntity[] | any;
  enviarIdProducto!: number | string;

  carritoCompras: any = [];

  async ngOnInit(): Promise<void> {

    await this.obtenerCategoriasProductos();
    await this.obtenerProveedoresProductos();
    await this.actualizarBusquedaEnlazada();

    this.opcionesOrdenar = [
      { label: 'Mayor a menor', value: '!inventario_ProductoID.producto_Precio' },
      { label: 'Menor a Mayor', value: 'inventario_ProductoID.producto_Precio' },
    ];
  }

  async enviarIdProductoSeleccionado(producto: any): Promise<void> {
    this.claseObtenerProductos.enviarIdProductoSeleccionado(producto);
    this.router.navigate(['/visualizarproducto']);
  }

  async obtenerCategoriasProductos() {
    this.categoriasProductos = await this.claseObtenerProductos.obtenerCategorias();
  }

  async obtenerProveedoresProductos() {
    this.proveedoresProductos = await this.claseObtenerProductos.obtenerProveedores();
  }

  // Método para realizar la búsqueda enlazada
  async actualizarBusquedaEnlazada(): Promise<void> {
    this.productosObtenidos = await this.claseObtenerProductos.buscarProductos(
      this.productoBuscar,
      this.categoriaSeleccionada,
      this.proveedorSeleccionado,
    );
  }

  // Actualizar cada método de filtro para aplicar la búsqueda enlazada
  async buscarCategoriaNombre(nombre: string): Promise<void> {
    this.categoriaSeleccionada = nombre;
    await this.actualizarBusquedaEnlazada();
  }

  async buscarProveedorNombre(nombre: string): Promise<void> {
    this.proveedorSeleccionado = nombre;
    await this.actualizarBusquedaEnlazada();
  }

  public async buscarProductoNombre(nombre: string): Promise<void> {
    this.productoBuscar = nombre;
    await this.actualizarBusquedaEnlazada();
  }

  OrdenarPrecios(event: any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.ordenPrecios = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.ordenPrecios = 1;
      this.sortField = value;
    }
  }

  async agregarProductoCarrito(producto: any): Promise<void> {
    console.log(producto, "producto");
    console.log(this.carritoCompras, "producto");
    const nombreProducto = producto.inventario_ProductoID.producto_Nombre;
    const imagenProducto = producto.inventario_ProductoID.producto_ImagenURL;
    const proveedorProducto = producto.inventario_ProductoID.producto_ProveedorID[0].proveedor_Nombre;

    let productoEncontrado = this.carritoCompras.find(
      (element: any) => element.producto === nombreProducto
    );

    if (productoEncontrado !== undefined) {
        productoEncontrado.cantidad += 1;
        await this.claseMostrarAlerta.mostrarAlerta('Producto agregado al carrito', `${nombreProducto}: ${productoEncontrado.cantidad}`);
    } else {
        this.carritoCompras.push({ producto: nombreProducto, cantidad: 1, imagen: imagenProducto, proveedor: proveedorProducto });
        await this.claseMostrarAlerta.mostrarAlerta('Producto agregado al carrito', `${nombreProducto}: 1`);
    }
    
    await this.cacheService.eliminar_DatoLocal('carritoCompras');
    await this.cacheService.guardar_ArregloLocal('carritoCompras', this.carritoCompras);
}


}
