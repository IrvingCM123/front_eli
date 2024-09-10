import { crearCuentaUseCase } from 'src/app/domain/registro/crearCuenta.use-case';
import { Injectable } from '@angular/core';
import { crearCuentaInterface } from 'src/app/common/interfaces/crearCuenta.interface';
import { crearCuentaEntity } from 'src/app/domain/registro/crearCuenta.entity';

@Injectable()
export class claseCrearCuenta {
  constructor(private crearCuentaUseCase: crearCuentaUseCase) {}

  public async crearCuenta(crearCuenta: crearCuentaInterface) {

    const nueva_cuenta: crearCuentaEntity = {
      Nombre: crearCuenta.Nombre,
      Apellidos: crearCuenta.Apellidos,
      Correo_electronico: crearCuenta.Correo_electronico,
      Contraseña: crearCuenta.Contrasena,
      cuenta_rol: crearCuenta.cuenta_rol
    }

    try {
      const resultado = await this.crearCuentaUseCase.crearCuenta(nueva_cuenta).toPromise();

      if (resultado?.status == 500) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  public async validarContraseñas(contraseña: string, confirmarContraseña: string) {
    if (contraseña === confirmarContraseña) {
      return true;
    } else {
      return false;
    }
  }

}
