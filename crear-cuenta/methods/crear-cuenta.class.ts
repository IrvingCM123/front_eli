import { Injectable } from '@angular/core';

// Importación de la interfaz para la creación de una cuenta de usuario con los campos necesarios y tu entidad correspondiente
import { crearCuentaInterface } from 'src/app/common/interfaces/crearCuenta.interface';
import { crearCuentaEntity } from 'src/app/domain/registro/crearCuenta.entity';

// Importación del caso de uso para la creación de una cuenta de usuario con la utilización de los métodos definidos
import { crearCuentaUseCase } from 'src/app/domain/registro/crearCuenta.use-case';

@Injectable()
// Creación de una subclase para los métodos de la creación de una cuenta de usuario
export class claseCrearCuenta {

  // Método constructor para la creación de una cuenta de usuario, utilizando el caso de uso
  constructor(private crearCuentaUseCase: crearCuentaUseCase) {}

  // Método asíncrono para la creación de una cuenta de usuario, utilizando la interfaz y la entidad definida
  public async crearCuenta(crearCuenta: crearCuentaInterface) {
    // Creación de una nueva cuenta de usuario con los datos ingresados, utilizando la entidad definida para evitar campos no definidos
    const nueva_cuenta: crearCuentaEntity = {
      Nombre: crearCuenta.Nombre,
      Apellidos: crearCuenta.Apellidos,
      Correo_electronico: crearCuenta.Correo_electronico,
      Contraseña: crearCuenta.Contrasena,
      cuenta_rol: crearCuenta.cuenta_rol
    }

    // Llamada al caso de uso para la creación de una cuenta de usuario, utilizando la nueva cuenta creada
    try {
      const resultado = await this.crearCuentaUseCase.crearCuenta(nueva_cuenta).toPromise();

      // Si el resultado es incorrecto, se retorna un false para gestionar el mensaje de error en la clase principal
      if (resultado?.status == 500) {
        return false;
      } else {
        // Si el resultado es correcto, se retorna un true para gestionar el mensaje de éxito en la clase principal
        return true;
      }
    } catch (error: any) {
      return {
        status: false,
        message: error?.error?.message
      }
    }
  }

}
