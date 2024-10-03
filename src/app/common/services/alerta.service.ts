import { Injectable } from "@angular/core";

// Importar el componente para redireccionar a otras rutas
import { Router } from "@angular/router";

// Importar el componente para mostrar alertas de Ionic
import { AlertController } from "@ionic/angular";

// Importar el componente para mostrar un loading de Ionic
import { LoadingController } from '@ionic/angular';

// Importar el servicio de cache para actualizar el estado del login
import { Cache_Service } from "./cache.Service";

// Decorador Injectable para inyectar servicios en otros componentes o servicios
@Injectable()
// Exportar la clase para mostrar alertas en el sistema
export class claseMostrarAlerta {

  // Constructor para instanciar los componentes y servicios
  constructor(
    // Instanciar el componente de Router para redireccionar a otras rutas
    private router: Router,
    // Instanciar el componente de AlertController para mostrar alertas de Ionic
    private alertController: AlertController,
    // Instanciar el componente de LoadingController para mostrar un loading de Ionic
    private loadingController: LoadingController,
    // Instanciar el servicio de cache para actualizar el estado del login
    private cacheService: Cache_Service
  ) { }

  // Método para crear un loading de Ionic, recibe un mensaje y retorna el loading con el mensaje y el spinner
  crearLoading(mensaje: string) {
    const loading = this.loadingController.create({
      message: mensaje,
      spinner: 'circles'
    });

    return loading;
  }

  // Método para cerrar un loading de Ionic, recibe el loading y retorna el loading cerrado
  cerrarLoading(loading: any) {
    return loading.dismiss();
  }

  // Método para crear una alerta de Ionic que cuenta con un botón para cerrarla, recibe el título, subtitulo, mensaje y el texto del botón
  crearAlerta(alerta_titulo: string, alerta_subtitulo: string, alerta_mensaje: string, alerta_boton: string) {

    // instanciar el componente de alerta de Ionic
    const alerta = document.createElement('ion-alert');

    // Asignar los valores recibidos a la alerta creada
    alerta.header = alerta_titulo;
    alerta.subHeader = alerta_subtitulo;
    alerta.message = alerta_mensaje;

    // Crear un botón con el texto recibido y asignarlo a la alerta
    alerta.buttons = [alerta_boton];

    // Retornar la alerta creada
    return alerta;
  }

  // Método para mostrar una alerta de Ionic, recibe el título y mensaje, crea la alerta y la muestra
  public mostrarAlerta(titulo: string, mensaje: string) {
    const alerta = this.crearAlerta(titulo, '', mensaje, 'Aceptar');
    document.body.appendChild(alerta);
    return alerta.present();
  }

  // Método para crear una alerta que se usará exclusivamente para el componente del Login, debido a que redirecciona a otra ruta y actualiza el estado del login
  public mostrarAlertaLogin(titulo: string, mensaje: string, ruta: string, login: boolean) {
    // Se crea la alerta con el título y mensaje recibidos
    const alerta = this.crearAlerta(titulo, '', mensaje, 'Aceptar');

    // A la alerta se le asigna un botón con el texto 'Aceptar' y una función que redirecciona a la ruta recibida y actualiza el estado del login
    alerta.buttons = [
      {
        text: 'Aceptar',
        // Función que redirecciona a la ruta recibida y actualiza el estado del login
        handler: () => {
          // Se actualiza el estado del login
          this.cacheService.Actualizar_Login(login);
          // Se redirecciona a la ruta recibida después de actualizar el estado del login para que se muestren los componentes correspondientes
          this.router.navigate([ruta]);
        }
      }
    ];
    // Se añade la alerta al cuerpo del documento
    document.body.appendChild(alerta);
    // Se muestra la alerta en el componente que lo mandó a llamar
    return alerta.present();
  }

  // Método para crear una alerta que contendrá una redirección a otra ruta, recibe el título, mensaje y ruta, crea la alerta y la muestra
  public mostrarAlertaRuta(titulo: string, mensaje: string, ruta: string) {

    // Se crea la alerta con el título y mensaje recibidos
    const alerta = this.crearAlerta(titulo, '', mensaje, 'Aceptar');

    // A la alerta se le asigna un botón con el texto 'Aceptar' y una función que redirecciona a la ruta recibida
    alerta.buttons = [
      {
        text: 'Aceptar',
        handler: () => {
          // Se redirecciona a la ruta recibida
          this.router.navigate([ruta]);
        }
      }
    ];
    // Se añade la alerta al cuerpo del documento
    document.body.appendChild(alerta);
    // Se muestra la alerta en el componente que lo mandó a llamar
    return alerta.present();
  }

  // Método para mostrar una alerta que recibirá un código de validación, recibe el título y el código, crea la alerta y la muestra
  public async mostrarAlertaValidacion(titulo: string, codigo: string) {

    // Se crea una promesa que recibe un resolve y un reject para manejar la respuesta de la alerta
    return new Promise(async (resolve, reject) => {

      // Se crea la alerta con el título recibido y un mensaje que pide ingresar el código
      const alerta: any = await this.alertController.create({
        header: titulo,
        message: 'Ingrese el código',
        // Se añade un input de tipo password para que el usuario ingrese el código de validación y no se muestre en texto plano
        inputs: [
          {
            name: 'codigo',
            type: 'password',
            placeholder: 'Ingrese el código'
          }
        ],
        // Se añaden dos botones, uno para cancelar y otro para aceptar, el botón de aceptar valida el código ingresado
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            // Función que resuelve la promesa con un false si el usuario cancela la alerta
            handler: () => {
              resolve(false);
            }
          },
          // Función que resuelve la promesa con un true si el código ingresado es igual al código recibido
          {
            text: 'Aceptar',
            // Función que resuelve la promesa con un true si el código ingresado es igual al código recibido
            handler: async (data) => {
              // Se valida si el código ingresado es igual al código recibido
              if (data.codigo === codigo) {
                // Se resuelve la promesa con un true si el código ingresado es igual al código recibido
                resolve(true);
              } else {
                // Se muestra una alerta de error si el código ingresado no es igual al código recibido
                const alertError = await this.alertController.create({
                  header: 'Error',
                  message: 'Código incorrecto',
                  buttons: ['Aceptar']
                });
                // Se muestra la alerta de error en el componente que lo mandó a llamar
                await alertError.present();
                resolve(false);
              }
            }
          }
        ]
      });
      // Se muestra la alerta en el componente que lo mandó a llamar
      alerta.present();
    });
  }
}
