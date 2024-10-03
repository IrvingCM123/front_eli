import { Component, OnInit } from '@angular/core';

// Importación de la subclase de inicio de sesión, para utilizar los métodos definidos en ella
import { claseIniciarSesion } from './methods/iniciarSesion.class';

// Importación del servicio de alerta, permitiendo mostrar alertas en pantalla al usuario
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';

// Importación del servicio de caché, para almacenar información del usuario en el dispositivo
import { Cache_Service } from 'src/app/common/services/cache.Service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  // Se definen los proveedores de la clase de inicio de sesión y de la clase de alerta
  providers: [claseIniciarSesion, claseMostrarAlerta]
})
export class InicioSesionComponent {

  // Constructor de la clase de inicio de sesión, de la clase de alerta y del servicio de caché
  constructor(
    private claseIniciarSesion: claseIniciarSesion,
    private claseMostrarAlerta: claseMostrarAlerta,
    private cacheService: Cache_Service,
  ) { }

  // Variables para almacenar el correo y la contraseña del usuario de los inputs del formulario
  correoUsuario: string = '';
  contrasenaUsuario: string = '';

  // Método para iniciar sesión, se ejecuta al presionar el botón de iniciar sesión
  async iniciarSesion() {

    // Se crea un loading para mostrar al usuario que se está realizando una acción
    const loading = await this.claseMostrarAlerta.crearLoading('Iniciando sesión...');
    // Se muestra el loading en pantalla
    await loading.present();

    try {
      // Se ejecuta el método de iniciar sesión, enviando el correo y la contraseña del usuario
      const resultado: any = await this.claseIniciarSesion.iniciarSesion(this.correoUsuario, this.contrasenaUsuario);

      // Se evalúa el resultado obtenido de la petición a la API, si el status es 201, se muestra una alerta de inicio de sesión exitoso
      if (Number(resultado.status) === 201) {
        // Se oculta el loading de la pantalla, indicando que la acción ha finalizado
        await loading.dismiss();

        // Se llama la alerta correspondiente para el componente inicio de sesión. Este componente actualiza el estado de login en la aplicación y redirige al usuario a la página de inventario
        await this.claseMostrarAlerta.mostrarAlertaLogin(resultado.mensaje, 'Inicio de sesión exitoso', 'inventario', true);

      // Si el status es 500, se muestra una alerta de error en el inicio de sesión
      } else if (Number(resultado.status) === 500) {
        // Se oculta el loading de la pantalla, indicando que la acción ha finalizado
        await loading.dismiss();
        // Se muestra una alerta de error en el inicio de sesión
        this.claseMostrarAlerta.mostrarAlerta('Error', resultado.mensaje);
      }
    } catch (error) {
      // Si ocurre un error en la petición a la API, se muestra una alerta de error en el inicio de sesión
      await loading.dismiss();
      this.claseMostrarAlerta.mostrarAlerta('Error', 'Ha ocurrido un error al iniciar sesión');
    } finally {
      await loading.dismiss();
    }
  }

  // Métodos para almacenar los valores de los inputs del formulario en las variables correspondientes al correo y la contraseña del usuario
  almacenarUsuario(event: Event) {
    this.correoUsuario = (event.target as HTMLInputElement).value;
  }

  almacenarContrasena(event: Event) {
    this.contrasenaUsuario = (event.target as HTMLInputElement).value;
  }
}
