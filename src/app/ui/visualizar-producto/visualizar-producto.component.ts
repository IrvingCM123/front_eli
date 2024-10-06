import { Component, OnInit } from '@angular/core';
// Importación de la clase ProductosUseCase para utilizar los métodos definidos en el caso de uso de productos
import { ProductosUseCase } from 'src/app/domain/productos/productos.use-case';
// Importación de la clase de alerta para mostrar alertas en la aplicación
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
// Importación de la subclase de agregar producto para utilizar los métodos definidos en la clase
import { claseAgregarProducto } from '../agregar-productos/methods/agregarProducto.class';
import { claseVisualizarProducto } from './methods/visualizarProducto.methods';
import { Inventario, Producto, Proveedor } from 'src/app/domain/inventario/inventario.entity';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css'],
  providers: [claseMostrarAlerta, claseAgregarProducto, claseVisualizarProducto]
})
export class VisualizarProductoComponent implements OnInit {

  // Constructor de la clase de agregar productos
  constructor(
    private productosUseCase: ProductosUseCase,
    private claseAlerta: claseMostrarAlerta,
    private claseAgregarProducto: claseAgregarProducto,
    private claseVisualizarProd: claseVisualizarProducto
  ) { }

  informacionProveedor: Proveedor = {
    proveedor_ID: 0,
    proveedor_Nombre: ''
  }

  informacionProducto: Producto = {
    producto_ID: 0,
    producto_Nombre: '',
    producto_Categoria: '',
    producto_Precio: '',
    producto_Status: '',
    producto_ImagenURL: '',
    producto_ProveedorID: this.informacionProveedor
  }

  informacionInventario: Inventario = {
    inventario_ID: 0,
    inventario_Status: '',
    inventario_Cantidad: '',
    inventario_ProductoID: this.informacionProducto
  }
  
  // Método OnInit que se ejecuta al cargar la clase para obtener las categorías y proveedores de los productos
  async ngOnInit(): Promise<void> {
    await this.obtenerCategorias();
    await this.obtenerProveedores();
    await this.obtenerProducto();
  }

  // Método para mostrar la vista de la tarjeta de producto en una vista móvil para hacer la vista responsive
  isFlipped = false;

  // Declaración de la variable imagenArchivo para almacenar la imagen del producto en base64
  imagenArchivo: any;

  // Declaración de las variables categoriaProductos y proveedoresProductos para almacenar las categorías y proveedores de los productos
  categoriaProductos: any;
  proveedoresProductos: any;

  // Método para cambiar la vista de la tarjeta de producto en una vista móvil
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  // Método para obtener las categorías de los productos de la subclase
  async obtenerCategorias() {
    this.categoriaProductos = await this.claseAgregarProducto.devolverCategoriaProductos();
  }

  // Método para obtener los proveedores de los productos de la subclase
  async obtenerProveedores() {
    this.proveedoresProductos = await this.claseAgregarProducto.obtenerProveedores();
    this.proveedoresProductos = this.proveedoresProductos.resultado;
  }

  // Método para almacenar la imagen del producto en base64
  almacenarImagen(event: any) {
    // Almacenar la imagen del producto en base64 en la variable imagenArchivo desde el evento de la imagen seleccionada
    const file = event.target.files[0];
    // Almacenar la imagen del producto en base64 en la variable imagenArchivo
    this.imagenArchivo = file;
    // Leer la imagen del producto en base64 y almacenarla en la variable producto_ImagenURL
    const reader = new FileReader();

    // Utilizar el método onload para leer la imagen del producto en base64 y mostrarla en la vista
    reader.onload = () => {
      // Almacenar el resultado de la imagen del producto en base64 en la variable producto_ImagenURL
      this.informacionInventario.inventario_ProductoID.producto_ImagenURL = reader.result as string;
    };

    // Leer la imagen del producto en base64 para mostrarla en la vista
    reader.readAsDataURL(file);
  }

  // Método para agregar un producto en el inventario
  async ActualizarProducto() {

    // Mostrar un mensaje de carga mientras se agrega el producto
    const loading = await this.claseAlerta.crearLoading('Actualizando producto...');
    await loading.present();

    try {
      const resultado = await this.claseVisualizarProd.ActualizarProducto(this.informacionInventario);
      console.log(resultado); 
      // Mostrar un mensaje de alerta indicando que el producto ha sido agregado correctamente
      await loading.dismiss();
      //this.claseAlerta.mostrarAlertaRuta('Producto agregado', 'El producto ha sido agregado correctamente', '/inventario');
    } catch (error) {
      // Mostrar un mensaje de alerta en caso de error al agregar el producto
      await loading.dismiss();
      this.claseAlerta.mostrarAlerta('Error', 'Ha ocurrido un error al agregar el producto');
    }
  }

  async obtenerProducto() {
    this.informacionInventario = await this.claseVisualizarProd.ObtenerProducto();
    const proveedorInfo: any = this.informacionInventario.inventario_ProductoID.producto_ProveedorID;
    this.informacionInventario.inventario_ProductoID.producto_ProveedorID = proveedorInfo[0];
    console.log(this.informacionInventario);
  }

  async EliminarProducto() {
    const loading = await this.claseAlerta.crearLoading('Eliminando producto...');
    await loading.present();

    try {
      const resultado = await this.claseVisualizarProd.EliminarProducto(this.informacionInventario.inventario_ProductoID.producto_ID);
      await loading.dismiss();
      this.claseAlerta.mostrarAlertaRuta('Producto eliminado', 'El producto ha sido eliminado correctamente', '/inventario');
    } catch (error) {
      await loading.dismiss();
      this.claseAlerta.mostrarAlerta('Error', 'Ha ocurrido un error al eliminar el producto');
    }
  }

}