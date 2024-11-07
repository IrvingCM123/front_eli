import { Component, OnInit } from '@angular/core';
// Importación de la clase para mostrar alertas en la aplicación
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
// Importación de la subclase de agregar proveedor para utilizar los métodos de agregar proveedor
import { claseAgregarProveedor } from './methods/agregarProveedor.class';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css'],
  // Declaración de los proveedores de la clase para utilizar los métodos de agregar proveedor y mostrar alertas
  providers: [claseAgregarProveedor, claseMostrarAlerta]
})
export class AgregarProveedorComponent implements OnInit {

  // Constructor de la clase de agregar proveedor
  constructor(
    private claseAgregarProveedor: claseAgregarProveedor,
    private claseMostrarAlerta: claseMostrarAlerta
  ) {
    // Declaración de las opciones para mostrar o no mostrar los datos de la cuenta bancaria del proveedor
    this.stateOptions = [{ label: 'Mostrar', value: true }, { label: 'No Mostrar', value: false }];
  }

  // Método para inicializar la clase de agregar proveedor y obtener los tipos de transacción
  ngOnInit(): void {
    this.obtenerTiposTransaccion();
  }

  // Declaración de la variable isFlipped para mostrar u ocultar los datos de la cuenta bancaria del proveedor
  isFlipped = false;

  // Declaración de las variables para almacenar los tipos de transacción y mostrar u ocultar los datos de la cuenta bancaria del proveedor
  tipoTransaccion: any;

  // Declaración de las opciones correspondientes al template de PrimeNG
  stateOptions: any[] = [];

  // Declaración de la variable para mostrar u ocultar los datos de la cuenta bancaria del proveedor
  mostrarBoolean: boolean = false;

  // Método para mostrar u ocultar los datos de la cuenta bancaria del proveedor
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  // Declaración de los datos del formulario para agregar un proveedor con los campos correspondientes
  datosFormulario = {
    proveedor_Nombre: '',
    proveedor_Direccion: '',
    proveedor_Telefono: '',
    proveedor_Email: '',
    proveedor_Catalogo: null,
    proveedorBanco_CuentaBancaria: null,
    proveedorBanco_NombreBanco: null,
    proveedorBanco_NombreBeneficiario: null,
    proveedorBanco_TipoTransaccion: null
  };

  // Método para obtener los tipos de transacción de la base de datos
  async obtenerTiposTransaccion() {
    // Obtener los tipos de transacción de la base de datos con una petición GET a la API en la subclase de agregar proveedor
    this.tipoTransaccion = await this.claseAgregarProveedor.devolverTiposTransaccion();
  }

  // Método para agregar un proveedor a la base de datos
  async agregarProveedor() {
    // Mostrar un mensaje de carga mientras se agrega el proveedor
    const loading = await this.claseMostrarAlerta.crearLoading('Agregando proveedor...');
    await loading.present();
    console.log(this.datosFormulario);
    try {
      // Agregar un proveedor a la base de datos con los datos del formulario en la subclase de agregar proveedor
      await this.claseAgregarProveedor.agregarProveedor(this.datosFormulario);
      await loading.dismiss();
      // Mostrar un mensaje de alerta de éxito al agregar el proveedor
      await this.claseMostrarAlerta.mostrarAlertaRuta('Éxito', 'Proveedor agregado correctamente', '/proveedores');
    } catch (error) {
      await loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta('Error', 'Error al agregar el proveedor');
    }

  }

}

