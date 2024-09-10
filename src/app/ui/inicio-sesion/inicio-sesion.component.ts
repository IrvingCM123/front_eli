import { Component, OnInit } from '@angular/core';
import { Cache_Service } from 'src/app/common/services/cache.Service';
import { Router } from '@angular/router';
import { inicioSesionUseCase } from 'src/app/domain/inicioSesion/inicioSesion.use-case';
import { mensajeInicioSesion } from 'src/app/common/enums/mensajes.enum';
import { enumTipoAlerta } from 'src/app/common/enums/tipoAlerta.enum';
import { claseIniciarSesion } from './methods/iniciarSesion.class';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  constructor(
    private cacheServicio: Cache_Service,
    private router: Router,
    private inicioSesionUseCase: inicioSesionUseCase,
    private claseIniciarSesion: claseIniciarSesion,
  ) { }

  correoUsuario: string = '';
  contrasenaUsuario: string = '';
  private consultaTerminada = new Subject<boolean>();

  mostrarAlertaPantalla: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: enumTipoAlerta = enumTipoAlerta.alertaConfirmacion;
  ocultarPantalla: boolean = false;

  async iniciarSesion() {

    this.mostrarAelrta(mensajeInicioSesion.inicioSesionCargando, enumTipoAlerta.alertaCargando, true, true);

    try {
      const resultado = await this.claseIniciarSesion.iniciarSesion(this.correoUsuario, this.contrasenaUsuario);

      if (resultado) {
        this.mostrarAelrta('', enumTipoAlerta.alertaConfirmacion, false, false);
        this.consultaTerminada.next(true);
        this.router.navigate(['/inventario']);
      } else {
        this.mostrarAelrta(mensajeInicioSesion.inicioSesionFallido, enumTipoAlerta.alertaError, true, true);
        this.consultaTerminada.next(true);
      }
    } catch (error) {
      setTimeout(() => {
        this.mostrarAelrta(mensajeInicioSesion.inicioSesionFallido, enumTipoAlerta.alertaError, true, false);
      }, 1500);
    } finally {
      // Asegúrate de que se termine la consulta independientemente del resultado
      this.consultaTerminada.next(true);
      // Oculta cualquier alerta que pudiera estar activa
      setTimeout(() => {
        this.mostrarAelrta(mensajeInicioSesion.inicioSesionFallido, enumTipoAlerta.alertaError, false, false);
      }, 1500);
    }
  }

    almacenarUsuario(event: Event) {
      this.correoUsuario = (event.target as HTMLInputElement).value;
    }

    almacenarContrasena(event: Event) {
      this.contrasenaUsuario = (event.target as HTMLInputElement).value;
    }

  private mostrarAelrta(mensaje: string, tipoAlerta: enumTipoAlerta, mostrarAlerta: boolean, ocultarPantalla: boolean) {
    this.mostrarAlertaPantalla = mostrarAlerta;
    this.mensajeAlerta = mensaje;
    this.tipoAlerta = tipoAlerta;
    this.ocultarPantalla = ocultarPantalla;
  }
}
