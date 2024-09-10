import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { inicioSesionEntity } from "./inicioSesion.entity";
import { inicioSesionPuerto } from "src/app/config/puertos/inicioSesion.puerto";
import { inicioSesionInterface } from "src/app/common/interfaces/inicioSesion.interface";

@Injectable({
  providedIn: "root",
})
export class inicioSesionUseCase {
  constructor(private readonly _inicioSesionPuerto: inicioSesionPuerto) { }

  iniciarSesion(inicioSesion: inicioSesionEntity): Observable<inicioSesionInterface> {
    return this._inicioSesionPuerto.iniciarSesion(inicioSesion);
  }
}
