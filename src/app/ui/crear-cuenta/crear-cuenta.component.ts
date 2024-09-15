import { crearCuentaInterface } from 'src/app/common/interfaces/crearCuenta.interface';
import { Component, OnInit } from '@angular/core';
import { crearCuentaUseCase } from 'src/app/domain/registro/crearCuenta.use-case';
import { tiposRol } from 'src/app/common/enums/tiposRol.enum';
import { claseCrearCuenta } from './methods/crear-cuenta.class';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
  providers: [claseCrearCuenta, claseMostrarAlerta]
})
export class CrearCuentaComponent implements OnInit {

  constructor(
    private crearCuentaUseCase: crearCuentaUseCase,
    private claseCrearCuenta: claseCrearCuenta,
    private claseMostrarAlerta: claseMostrarAlerta,
  ) {}

  objeto_Cuenta: crearCuentaInterface = {
    Nombre: '',
    Apellidos: '',
    Correo_electronico: '',
    Contrasena: '',
    cuenta_rol: '',
  };

  tiposRol: string[] = Object.values(tiposRol);

  codigoValidacion: string = '';

  async ngOnInit() {
    await this.obtenerCodigoValidacion();
  }

  async crearCuenta() {

    const loading = await this.claseMostrarAlerta.crearLoading('Creando cuenta...');

    try {
      const alerta: any = await this.claseMostrarAlerta.mostrarAlertaValidacion('Validación', this.codigoValidacion);

      if (alerta == true ){
        await loading.present();
        const resultado = await this.claseCrearCuenta.crearCuenta( this.objeto_Cuenta );
        console.log(resultado);
        if (resultado) {
          this.vaciarDatos();
          await this.claseMostrarAlerta.mostrarAlertaRuta('Cuenta creada', 'La cuenta ha sido creada con éxito', 'iniciarSesion');
        } else {
        }
        loading.dismiss();
      } else {
        await alerta.body;
      }
    } catch (error) {
      loading.dismiss();
      await this.claseMostrarAlerta.mostrarAlerta('Error', 'Error al crear la cuenta');
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

  async obtenerCodigoValidacion(){
    this.codigoValidacion = await firstValueFrom(this.crearCuentaUseCase.obtenerCodigoValidacion());
  }

  almacenarNombre(event: Event) { this.objeto_Cuenta.Nombre = (event.target as HTMLInputElement).value; }

  almacenarApellidos(event: Event) { this.objeto_Cuenta.Apellidos = (event.target as HTMLInputElement).value; }

  almacenarCorreo(event: Event) { this.objeto_Cuenta.Correo_electronico = ( event.target as HTMLInputElement ).value; }

  almacenarContrasena(event: Event) { this.objeto_Cuenta.Contrasena = (event.target as HTMLInputElement).value; }

  almacenarRol(event: Event) { this.objeto_Cuenta.cuenta_rol = (event.target as HTMLInputElement).value; }

}
