import { crearCuentaEntity } from "src/app/domain/registro/crearCuenta.entity";
import { Observable } from "rxjs";
import { recibirDatosCuentaInterface } from "src/app/common/interfaces/crearCuenta.interface";

export abstract class crearCuentaPuerto {
  abstract crearCuenta(crearCuenta: crearCuentaEntity): Observable<recibirDatosCuentaInterface>;
  abstract obtenerCodigoValidacion(): Observable<string>;
}
