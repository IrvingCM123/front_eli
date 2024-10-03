// Importación del servicio de caché, para almacenar información del usuario en el dispositivo
import { Cache_Service } from 'src/app/common/services/cache.Service';

// Importación de los métodos de inicio de sesión definidos en su caso de uso, para poder utilizarlos en la clase de inicio de sesión
import { inicioSesionUseCase } from 'src/app/domain/inicioSesion/inicioSesion.use-case';

// Importación de la entidad de inicio de sesión, para poder utilizarla en la clase de inicio de sesión
import { inicioSesionEntity } from 'src/app/domain/inicioSesion/inicioSesion.entity';

// Importación de la librería Injectable, para poder inyectar servicios en la clase de inicio de sesión
import { Injectable } from '@angular/core';

@Injectable()
export class claseIniciarSesion {

  // Constructor de la clase de inicio de sesión, del caso de uso de inicio de sesión y del servicio de caché
  constructor(
    private inicioSesionUseCase: inicioSesionUseCase,
    private cacheServicio: Cache_Service,
  ) { }

  // Método para iniciar sesión, recibe el usuario y la contraseña del usuario y retorna un mensaje de éxito o error
  public async iniciarSesion(usuario: string, contrasena: string) {

    // Se crea una instancia de la entidad de inicio de sesión, enviando el usuario y la contraseña del usuario, evitando campos no válidos
    const datosInicioSesion = new inicioSesionEntity(usuario, contrasena);

    try {
      // Se ejecuta el método de inicio de sesión, enviando los datos de inicio de sesión y esperando un resultado
      const resultado = await this.inicioSesionUseCase.iniciarSesion(datosInicioSesion).toPromise();

      // Se evalúa el resultado obtenido de la petición a la API, si el status es 500, se retorna un mensaje de error
      if (resultado?.status == 500) {
        // Se retorna un mensaje de error
        return resultado.mensaje;
      } else {
        // Si el status es 201, se guarda el token en el caché del dispositivo y se retorna el resultado
        this.cacheServicio.guardar_DatoLocal('token', resultado?.access_Token);
        return resultado;
      }
    } catch (error) {
      return {
        status: 500,
        mensaje: 'Ha ocurrido un error al iniciar sesión'
      }
    }
  }
}
