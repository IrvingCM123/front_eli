import { crearCuentaInterface } from 'src/app/common/interfaces/crearCuenta.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { crearCuentaUseCase } from 'src/app/domain/registro/crearCuenta.use-case';
import { mensajeCrearCuenta } from 'src/app/common/enums/mensajes.enum';
import { enumTipoAlerta } from 'src/app/common/enums/tipoAlerta.enum';
import { Subject } from 'rxjs';
import { claseCrearCuenta } from './methods/crear-cuenta.class';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
})
export class CrearCuentaComponent {

  constructor(
    private router: Router,
    private crearCuentaUseCase: crearCuentaUseCase,
    private claseCrearCuenta: claseCrearCuenta
  ) {}

  objeto_Cuenta: crearCuentaInterface = {
    Nombre: '',
    Apellidos: '',
    Correo_electronico: '',
    Contrasena: '',
    cuenta_rol: '',
  };

  private consultaTerminada = new Subject<boolean>();

  mostrarAlertaPantalla: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: enumTipoAlerta = enumTipoAlerta.alertaConfirmacion;
  ocultarPantalla: boolean = false;

  async crearCuenta() {

    try {

      const resultado = await this.claseCrearCuenta.crearCuenta( this.objeto_Cuenta );

      if (resultado) {
        this.mostrarAelrta(mensajeCrearCuenta.crearCuentaExitoso, enumTipoAlerta.alertaConfirmacion, true, true);
        this.consultaTerminada.next(true);
        this.vaciarDatos();
        this.router.navigate(['/iniciar-sesion']);
      } else {
        this.mostrarAelrta(mensajeCrearCuenta.crearCuentaFallido, enumTipoAlerta.alertaError, true, true);
        this.consultaTerminada.next(true);
      }

    } catch (error) {

      setTimeout(() => { this.mostrarAelrta(mensajeCrearCuenta.crearCuentaFallido, enumTipoAlerta.alertaError, true, false); }, 1500);

    } finally {

      this.consultaTerminada.subscribe(() => { this.mostrarAelrta('', enumTipoAlerta.alertaConfirmacion, false, false); });

    }
  }

  async vaciarDatos() {
    this.objeto_Cuenta.Nombre = '';
    this.objeto_Cuenta.Apellidos = '';
    this.objeto_Cuenta.Correo_electronico = '';
    this.objeto_Cuenta.Contrasena = '';
    this.objeto_Cuenta.cuenta_rol = '';
  }

  async validarDatosLlenos() {

    if (
      this.objeto_Cuenta.Nombre !== '' &&
      this.objeto_Cuenta.Apellidos !== '' &&
      this.objeto_Cuenta.Correo_electronico !== '' &&
      this.objeto_Cuenta.Contrasena !== '' &&
      this.objeto_Cuenta.cuenta_rol !== ''
    ) {
      return true;
    } else {
      return false;
    }

  }

  private mostrarAelrta( mensaje: string, tipoAlerta: enumTipoAlerta, mostrarAlerta: boolean, ocultarPantalla: boolean ) {
    this.mostrarAlertaPantalla = mostrarAlerta;
    this.mensajeAlerta = mensaje;
    this.tipoAlerta = tipoAlerta;
    this.ocultarPantalla = ocultarPantalla;
  }

  almacenarNombre(event: Event) { this.objeto_Cuenta.Nombre = (event.target as HTMLInputElement).value; }

  almacenarApellidos(event: Event) { this.objeto_Cuenta.Apellidos = (event.target as HTMLInputElement).value; }

  almacenarCorreo(event: Event) { this.objeto_Cuenta.Correo_electronico = ( event.target as HTMLInputElement ).value; }

  almacenarContrasena(event: Event) { this.objeto_Cuenta.Contrasena = (event.target as HTMLInputElement).value; }

  almacenarRol(event: Event) { this.objeto_Cuenta.cuenta_rol = (event.target as HTMLInputElement).value; }

}
