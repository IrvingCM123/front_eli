import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';
import { Cache_Service } from "./cache.Service";


@Injectable()
export class claseMostrarAlerta {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private cacheService: Cache_Service
  ) { }

  crearLoading(mensaje: string) {
    const loading = this.loadingController.create({
      message: mensaje,
      spinner: 'circles'
    });

    return loading;
  }

  crearAlerta(alerta_titulo: string, alerta_subtitulo: string, alerta_mensaje: string, alerta_boton: string) {

    const alerta = document.createElement('ion-alert');
    alerta.header = alerta_titulo;
    alerta.subHeader = alerta_subtitulo;
    alerta.message = alerta_mensaje;
    alerta.buttons = [alerta_boton];

    return alerta;

  }

  public mostrarAlerta(titulo: string, mensaje: string) {
    const alerta = this.crearAlerta(titulo, '', mensaje, 'Aceptar');
    document.body.appendChild(alerta);
    return alerta.present();
  }

  public mostrarAlertaLogin(titulo: string, mensaje: string, ruta: string, login: boolean) {
    const alerta = this.crearAlerta(titulo, '', mensaje, 'Aceptar');
    alerta.buttons = [
      {
        text: 'Aceptar',
        handler: () => {
          this.cacheService.Actualizar_Login(login);
          this.router.navigate([ruta]);
        }
      }
    ];
    document.body.appendChild(alerta);
    return alerta.present();
  }

  public mostrarAlertaRuta(titulo: string, mensaje: string, ruta: string) {
    const alerta = this.crearAlerta(titulo, '', mensaje, 'Aceptar');
    alerta.buttons = [
      {
        text: 'Aceptar',
        handler: () => {
          this.router.navigate([ruta]);
          window.location.reload();
        }
      }
    ];
    document.body.appendChild(alerta);
    return alerta.present();
  }

  public async mostrarAlertaValidacion(titulo: string, codigo: string) {

    return new Promise(async (resolve, reject) => {
      const alerta: any = await this.alertController.create({
        header: titulo,
        message: 'Ingrese el código',
        inputs: [
          {
            name: 'codigo',
            type: 'password',
            placeholder: 'Ingrese el código'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Aceptar',
            handler: async (data) => {
              if (data.codigo === codigo) {
                resolve(true);
              } else {
                const alertError = await this.alertController.create({
                  header: 'Error',
                  message: 'Código incorrecto',
                  buttons: ['Aceptar']
                });
                await alertError.present();
                resolve(false);
              }
            }
          }
        ]
      });
      alerta.present();
    });
  }
}
