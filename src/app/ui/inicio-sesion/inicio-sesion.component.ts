import { Component, OnInit } from '@angular/core';
import { claseIniciarSesion } from './methods/iniciarSesion.class';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { Cache_Service } from 'src/app/common/services/cache.Service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  providers: [claseIniciarSesion, claseMostrarAlerta]
})
export class InicioSesionComponent {

  constructor(
    private claseIniciarSesion: claseIniciarSesion,
    private claseMostrarAlerta: claseMostrarAlerta,
    private cacheService: Cache_Service,
  ) { }

  correoUsuario: string = '';
  contrasenaUsuario: string = '';

  async iniciarSesion() {

    const loading = await this.claseMostrarAlerta.crearLoading('Iniciando sesión...');
    await loading.present();

    try {
      const resultado: any = await this.claseIniciarSesion.iniciarSesion(this.correoUsuario, this.contrasenaUsuario);
      if (Number(resultado.status) === 201) {
        await loading.dismiss();
        await this.claseMostrarAlerta.mostrarAlertaLogin(resultado.mensaje, 'Inicio de sesión exitoso', 'inventario', true);
      } else if (Number(resultado.status) === 500) {
        await loading.dismiss();
        this.claseMostrarAlerta.mostrarAlerta('Error', resultado.mensaje);
      }
    } catch (error) {
      await loading.dismiss();
      this.claseMostrarAlerta.mostrarAlerta('Error', 'Ha ocurrido un error al iniciar sesión');
    } finally {
      await loading.dismiss();
    }
  }

  almacenarUsuario(event: Event) {
    this.correoUsuario = (event.target as HTMLInputElement).value;
  }

  almacenarContrasena(event: Event) {
    this.contrasenaUsuario = (event.target as HTMLInputElement).value;
  }
}
