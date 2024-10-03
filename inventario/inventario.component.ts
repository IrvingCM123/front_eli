import { Component, OnInit } from '@angular/core';

// Importación de la subclase definida para establecer la lógica de los métodos utilizados en este componente
import { claseObtenerProductos } from './methods/obtenerProductos.class';

// Importación la entidad del inventario para definir los campos necesarios en la utilización de los métodos
import { inventarioEntity } from 'src/app/domain/inventario/inventario.entity';

// Importación del componente Router para redireccionar a otro componente
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  // Declaración de la subclase de inventario para establecerlo como provider en el componente Inventario
  providers: [claseObtenerProductos],
})
export class InventarioComponent implements OnInit {

  // Constructor del componente Inventario
  constructor(
    private claseObtenerProductos: claseObtenerProductos,
    private router: Router
  ) {
  }

  // Declaración de las variables para el funcionamiento del template importado de PrimeNG
  opcionesOrdenar: any;
  sortKey: string = '';
  ordenPrecios: number = 0;
  sortField: string = '';

  // Declaración de la variable para almacenar el nombre del producto deseado a buscar
  productoBuscar: string = '';

  // Declaración del array que almacenará los productos del inventario, siendo de tipo InventarioEntity
  productosObtenidos!: inventarioEntity[] | any;

  // Declaración de la variable que almacenará el ID del producto a detallar en el componente MostrarProducto
  enviarIdProducto!: number | string;

  // Método que se ejecuta al iniciar el componente Inventario
  async ngOnInit(): Promise<void> {
    // Llamado al método que obtiene los productos del inventario
    await this.obtenerProductos();
    // Definición de las opciones de ordenamiento de los productos en cuanto a su precio
    this.opcionesOrdenar = [
      {label: 'Mayor a menor', value: '!inventario_ProductoID.producto_Precio'},
      {label: 'Menor a Mayor', value: 'inventario_ProductoID.producto_Precio'}
  ];
  }

  // Método que se ejecuta al seleccionar un producto del inventario
  async enviarIdProductoSeleccionado(id: number | string): Promise<void> {
    console.log(id);
    //this.claseObtenerProductos.enviarIdProductoSeleccionado(id);
    //this.router.navigate(['/visualizarProducto']);
  }

  // Método que obtiene los productos del inventario
  async obtenerProductos() {
    try {
      // Llamado al método que obtiene los productos del inventario declarado en la subclase
      this.productosObtenidos = await this.claseObtenerProductos.devolverProductos();
    } catch (error) {
      this.productosObtenidos = false;
    }
  }

  // Método que busca un producto por su nombre
  public async buscarProductoNombre(nombre: string): Promise<void> {
    // Llamado al método que busca un producto por su nombre declarado en la subclase
    this.productosObtenidos = await this.claseObtenerProductos.buscarProductoNombre(nombre);
  }

  // Método que busca un producto por su nombre, ejecutado al presionar la tecla Enter para la versión móvil
  public async realizarBusqueda(): Promise<void> {
    if (this.productoBuscar) {
      this.productosObtenidos = await this.claseObtenerProductos.buscarProductoNombre(this.productoBuscar);
    }
  }

  // Método que ordena los productos por su precio de mayor a menor o de menor a mayor
  OrdenarPrecios(event: any) {
    let value = event.value;

    // Verificación de la opción seleccionada para ordenar los productos
    if (value.indexOf('!') === 0) {
        this.ordenPrecios = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.ordenPrecios = 1;
        this.sortField = value;
    }
}

}
