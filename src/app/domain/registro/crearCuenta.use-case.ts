// Importación del decorador Injectable para la inyección de dependencias
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Importación de la entidad para la creación de una cuenta de usuario
import { crearCuentaEntity } from "./crearCuenta.entity";

// Importación de la interfaz para la recepción de datos de la creación de una cuenta de usuario
import { recibirDatosCuentaInterface } from "src/app/common/interfaces/crearCuenta.interface";

// Importación del puerto para la creación de una cuenta de usuario y utilizar sus métodos previamente definidos
import { crearCuentaPuerto } from "src/app/config/puertos/crearCuenta.puerto";

// Decorador Injectable para utilizar el servicio en los componentes del frontend
@Injectable ({
    providedIn : "root"
})
// Creación del caso de uso para la creación de una cuenta de usuario, implementando el puerto correspondiente
export class crearCuentaUseCase {

  // Método constructor para instanciar el puerto correspondiente
  constructor(private readonly _crearCuentaPuerto: crearCuentaPuerto) { }

  // Método para la creación de una cuenta de usuario, utilizando una entidad definida para el envío de datos y una interfaz definida para la recepción de datos
  crearCuenta(crearCuenta: crearCuentaEntity): Observable<recibirDatosCuentaInterface> {
    return this._crearCuentaPuerto.crearCuenta(crearCuenta);
  }

  // Método para la obtención de un código de validación, utilizando un string para la recepción de datos
  obtenerCodigoValidacion(): Observable<string> {
    return this._crearCuentaPuerto.obtenerCodigoValidacion();
  }

}
