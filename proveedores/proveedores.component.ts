import { Component, OnInit } from '@angular/core';
// Importación de la subclase de proveedor para utilizar los métodos de la clase
import { claseProveedor } from './methods/proveedor.class';
// Importación de la entidad de proveedor para utilizar los campos de la entidad
import { proveedorEntity } from 'src/app/domain/proveedores/proveedor.entity';
// Importación de la clase de router para navegar a otras rutas
import { Router } from '@angular/router';
// Importación de la clase de alerta para utilizar los métodos de alerta
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { LazyLoadEvent, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  // Se añade la subclase de proveedor a los providers para utilizar los métodos de la clase
  providers: [claseProveedor, claseMostrarAlerta]
})
export class ProveedoresComponent implements OnInit {

  // Constructor de la clase de proveedores para utilizar los métodos de la clase de proveedor, router, loading controller y alerta
  constructor(
    private claseProveedor: claseProveedor,
    private router: Router,
    private claseMostrarAlerta: claseMostrarAlerta
  ) { }

  // Variable para almacenar los proveedores obtenidos de la base de datos
  proveedoresObtenidos!: proveedorEntity[] | any;
  // Variable para almacenar el ID del proveedor seleccionado
  enviarIdProveedor!: number | string;
  // Variable para almacenar el nombre del proveedor a buscar
  proveedorBuscar: string = '';

  // Método para inicializar la vista de los proveedores y obtener los proveedores de la base de datos
  async ngOnInit(): Promise<void> {
    await this.obtenerProveedores();
    console.log(this.proveedoresObtenidos);
  }

  // Método para obtener los proveedores de la base de datos
  async obtenerProveedores() {
    // Crear un loading controller para mostrar un mensaje de carga mientras se obtienen los proveedores
    const loading = await this.claseMostrarAlerta.crearLoading('Obteniendo proveedores...');
    await loading.present();

    try {
      // Obtener los proveedores de la base de datos con el método devolverProveedores de la clase de proveedor
      this.proveedoresObtenidos = await this.claseProveedor.devolverProveedores();
      // Acceder a la variable resultado de la respuesta de la petición y almacenar los proveedores en la variable proveedoresObtenidos
      this.proveedoresObtenidos = this.proveedoresObtenidos.resultado;
      // Cerrar el loading controller
      await loading.dismiss();
    } catch (error) {
      // Cerrar el loading controller y mostrar un mensaje de alerta si ocurre un error al obtener los proveedores
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta("Erorr", "Ha ocurrido un error al obtener los proveedores");
    }
  }

  // Método para buscar un proveedor por su nombre en la subclase de proveedor
  public async buscarProveedorNombre(nombre: string): Promise<void> {
    // Enviar el nombre del proveedor a buscar a la subclase de proveedor y almacenar los proveedores obtenidos en la variable proveedoresObtenidos
    this.proveedoresObtenidos = await this.claseProveedor.buscarProveedorNombre(nombre);
  }

  // Método para enviar el ID del proveedor seleccionado a la subclase de proveedor y navegar a la vista de visualizar proveedor
  async enviarProveedorSeleccionado(proveedor: any) {
    this.claseProveedor.enviarIdProveedorSeleccionado(proveedor);
    this.router.navigate(['/visualizarproveedor']);
  }

}
