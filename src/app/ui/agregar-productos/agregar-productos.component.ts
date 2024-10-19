import { Component, OnInit } from '@angular/core';
// Importación de la clase ProductosUseCase para utilizar los métodos definidos en el caso de uso de productos
import { ProductosUseCase } from 'src/app/domain/productos/productos.use-case';
// Importación de la clase de alerta para mostrar alertas en la aplicación
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
// Importación de la subclase de agregar producto para utilizar los métodos definidos en la clase
import { claseAgregarProducto } from './methods/agregarProducto.class';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css'],
  // Definición de los proveedores y servicios a utilizar en la clase
  providers: [claseMostrarAlerta, claseAgregarProducto]
})
export class AgregarProductosComponent implements OnInit {

  // Constructor de la clase de agregar productos
  constructor(
    private productosUseCase: ProductosUseCase,
    private claseAlerta: claseMostrarAlerta,
    private claseAgregarProducto: claseAgregarProducto
  ) { }

  // Método OnInit que se ejecuta al cargar la clase para obtener las categorías y proveedores de los productos
  async ngOnInit(): Promise<void> {
    await this.obtenerCategorias();
    await this.obtenerProveedores();
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

  // Declaración de la variable datosFormulario para almacenar los datos del formulario de creación de un producto
  datosFormulario = {
    producto_Nombre: '',
    producto_Categoria: '',
    producto_ProveedorID: '',
    producto_Precio: 0,
    producto_stock: 0,
    producto_ImagenURL: ''
  };

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
      this.datosFormulario.producto_ImagenURL = reader.result as string;
    };

    // Leer la imagen del producto en base64 para mostrarla en la vista
    reader.readAsDataURL(file);
  }

  // Método para agregar un producto en el inventario
  async AgregarProducto() {

    // Mostrar un mensaje de carga mientras se agrega el producto
    const loading = await this.claseAlerta.crearLoading('Agregando producto...');
    await loading.present();

    try {
      // Convertir los campos de stock y precio del producto a tipo número para almacenarlos en la base de datos
      this.datosFormulario.producto_stock = Number(this.datosFormulario.producto_stock);
      this.datosFormulario.producto_Precio = Number(this.datosFormulario.producto_Precio);
      // Llamar al método crearProducto del caso de uso de productos para agregar un producto en el inventario
      await this.productosUseCase.crearProducto(this.datosFormulario).toPromise();
      // Mostrar un mensaje de alerta indicando que el producto ha sido agregado correctamente
      await loading.dismiss();
      this.claseAlerta.mostrarAlertaRuta('Producto agregado', 'El producto ha sido agregado correctamente', '/inventario');
    } catch (error: any) {
      // Mostrar un mensaje de alerta en caso de error al agregar el producto
      await loading.dismiss();
      this.claseAlerta.mostrarAlerta('Error', error?.error?.message || error?.message);
    }
  }
}
