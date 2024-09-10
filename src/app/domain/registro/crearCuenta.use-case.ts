import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { crearCuentaEntity } from "./crearCuenta.entity";
import { crearCuentaPuerto } from "src/app/config/puertos/crearCuenta.puerto";
import { recibirDatosCuentaInterface } from "src/app/common/interfaces/crearCuenta.interface";

@Injectable ({
    providedIn : "root"
})
export class crearCuentaUseCase {
  constructor(private readonly _crearCuentaPuerto: crearCuentaPuerto) { }

  crearCuenta(crearCuenta: crearCuentaEntity): Observable<recibirDatosCuentaInterface> {
    return this._crearCuentaPuerto.crearCuenta(crearCuenta);
  }
}
