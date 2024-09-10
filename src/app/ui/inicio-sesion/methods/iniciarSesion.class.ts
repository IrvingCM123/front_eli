import { Cache_Service } from 'src/app/common/services/cache.Service';
import { inicioSesionUseCase } from 'src/app/domain/inicioSesion/inicioSesion.use-case';
import { inicioSesionEntity } from 'src/app/domain/inicioSesion/inicioSesion.entity';
import { Injectable } from '@angular/core';

@Injectable()
export class claseIniciarSesion {
  
  constructor(
    private inicioSesionUseCase: inicioSesionUseCase,
    private cacheServicio: Cache_Service,
  ) { }

  public async iniciarSesion(usuario: string, contrasena: string) {
    const datosInicioSesion = new inicioSesionEntity(usuario, contrasena);

    try {
      const resultado = await this.inicioSesionUseCase.iniciarSesion(datosInicioSesion).toPromise();

      if (resultado?.status == 500) {
        return false;
      } else {
        this.cacheServicio.guardar_DatoLocal('token', resultado?.access_Token);
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
