// Importación de la entidad y la interfaz para la creación de una cuenta de usuario
import { crearCuentaEntity } from "src/app/domain/registro/crearCuenta.entity";
import { recibirDatosCuentaInterface } from "src/app/common/interfaces/crearCuenta.interface";

// Importación del observable para la comunicación entre el frontend y el backend
import { Observable } from "rxjs";

// Creación del puerto para la creación de una cuenta de usuario
export abstract class crearCuentaPuerto {
  // Método para la creación de una cuenta de usuario, utilizando una entidad y una interfaz definida para el envío y la recepción de datos
  abstract crearCuenta(crearCuenta: crearCuentaEntity): Observable<recibirDatosCuentaInterface>;
  // Método para la obtención de un código de validación, utilizando un string para la recepción de datos
  abstract obtenerCodigoValidacion(): Observable<string>;
}
