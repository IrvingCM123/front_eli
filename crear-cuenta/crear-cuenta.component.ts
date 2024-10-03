import { Component, OnInit } from '@angular/core';

// Importación de la función firstValueFrom para la obtención de un valor de un observable en una sola emisión
import { firstValueFrom } from 'rxjs';

// Importación del enum tiposRol para la definición de los roles de usuario
import { tiposRol } from 'src/app/common/enums/tiposRol.enum';

// Importación de los servicios de  los mensajes de alerta en la pantalla
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';

// Importación de una subclase para los métodos de la creación de una cuenta
import { claseCrearCuenta } from './methods/crear-cuenta.class';

// Importación de la interfaz para la creación de una cuenta de usuario
import { crearCuentaInterface } from 'src/app/common/interfaces/crearCuenta.interface';

// Importación del caso de uso para la creación de una cuenta de usuario con la utilización de los métodos definidos
import { crearCuentaUseCase } from 'src/app/domain/registro/crearCuenta.use-case';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
  // Implementación de los proveedores de los servicios de la creación de una cuenta y los mensajes de alerta
  providers: [claseCrearCuenta, claseMostrarAlerta]
})
export class CrearCuentaComponent implements OnInit {

  // Método constructor para la creación de una cuenta de usuario, utilizando el caso de uso, la subclase y los mensajes de alerta
  constructor(
    private crearCuentaUseCase: crearCuentaUseCase,
    private claseCrearCuenta: claseCrearCuenta,
    private claseMostrarAlerta: claseMostrarAlerta,
  ) {}

  // Declaración de un objeto para la creación de una cuenta de usuario, utilizando la interfaz definida para evitar errores de tipado en los campos
  objeto_Cuenta: crearCuentaInterface = {
    Nombre: '',
    Apellidos: '',
    Correo_electronico: '',
    Contrasena: '',
    cuenta_rol: '',
  };

  // Declaración de un arreglo para los roles de usuario, utilizando el enum definido
  tiposRol: string[] = Object.values(tiposRol);

  // Declaración de un string para el código de validación y permitir la creación de la cuenta
  codigoValidacion: string = '';

  async ngOnInit() {
    // Llamada al método para la obtención del código de validación al iniciar la pantalla
    await this.obtenerCodigoValidacion();
  }

  // Método asíncrono para la creación de una cuenta de usuario
  async crearCuenta() {

    // Instanciar un mensaje de carga para la creación de la cuenta
    const loading = await this.claseMostrarAlerta.crearLoading('Creando cuenta...');

    try {
      // Llamada al método de una alerta de validación, permitiendo que el usuario ingrese el código de validación y autorizar la creación de la cuenta
      const alerta: any = await this.claseMostrarAlerta.mostrarAlertaValidacion('Validación', this.codigoValidacion);

      // Si el usuario ingresa el código de validación correspondiente, se procede a la creación de la cuenta
      if (alerta == true ){

        // Presentar el mensaje de carga para la creación de la cuenta para indicar al usuario que se está procesando la solicitud
        await loading.present();
        console.log(this.objeto_Cuenta, 'objeto cuenta');
        // Llamada al método para la creación de la cuenta, utilizando el objeto de la cuenta con los datos ingresados por el usuario
        const resultado: any = await this.claseCrearCuenta.crearCuenta( this.objeto_Cuenta );

        // Si la creación de la cuenta es exitosa, se muestra un mensaje de alerta indicando que la cuenta ha sido creada con éxito
        if (resultado.status == true) {

          // Vaciar los datos de la cuenta para permitir al usuario ingresar nuevos datos
          this.vaciarDatos();

          // Mostrar un mensaje de alerta indicando que la cuenta ha sido creada con éxito
          await this.claseMostrarAlerta.mostrarAlertaRuta('Cuenta creada', 'La cuenta ha sido creada con éxito', 'iniciarSesion');
        }
          await this.claseMostrarAlerta.mostrarAlerta('Error', resultado.message);
        // Ocultar el mensaje de carga al finalizar la creación de la cuenta
        loading.dismiss();
      } else {

        // Si el usuario no ingresa el código de validación correspondiente, se muestra un mensaje de alerta indicando que la cuenta no ha sido creada
        await alerta.body;
      }
    } catch (error) {

      // Si ocurre un error al crear la cuenta, se muestra un mensaje de alerta indicando que ha ocurrido un error
      loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta('Error', 'Error al crear la cuenta');
    }
  }

  // Método asíncrono para vaciar los datos de la cuenta
  async vaciarDatos() {
    this.objeto_Cuenta.Nombre = '';
    this.objeto_Cuenta.Apellidos = '';
    this.objeto_Cuenta.Correo_electronico = '';
    this.objeto_Cuenta.Contrasena = '';
    this.objeto_Cuenta.cuenta_rol = '';
  }

  // Método asíncrono para obtener el código de validación al iniciar la pantalla
  async obtenerCodigoValidacion(){
    this.codigoValidacion = await firstValueFrom(this.crearCuentaUseCase.obtenerCodigoValidacion());
  }

  // Métodos para almacenar los datos ingresados por el usuario en los campos correspondientes y asignarlos al objeto de la cuenta
  almacenarNombre(event: Event) { this.objeto_Cuenta.Nombre = (event.target as HTMLInputElement).value; }

  almacenarApellidos(event: Event) { this.objeto_Cuenta.Apellidos = (event.target as HTMLInputElement).value; }

  almacenarCorreo(event: Event) { this.objeto_Cuenta.Correo_electronico = ( event.target as HTMLInputElement ).value; }

  almacenarContrasena(event: Event) { this.objeto_Cuenta.Contrasena = (event.target as HTMLInputElement).value; }

  almacenarRol(event: Event) { this.objeto_Cuenta.cuenta_rol = (event.target as HTMLInputElement).value; }

  
  // Método para cambiar el color del borde del campo de texto al seleccionar un valor en el campo de selección, indicando que el campo tiene un valor en el css
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value !== 'Rol Cuenta') {
      selectElement.classList.add('has-value');
    } else {
      selectElement.classList.remove('has-value');
    }
  }
  
}
