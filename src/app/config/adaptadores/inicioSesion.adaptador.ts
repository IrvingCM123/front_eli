import { Observable, observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { inicioSesionPuerto } from "../puertos/inicioSesion.puerto";
import { inicioSesionEntity } from "src/app/domain/inicioSesion/inicioSesion.entity";
import { inicioSesionInterface } from "src/app/common/interfaces/inicioSesion.interface";

@Injectable({
    providedIn: "root",
})
export class inicioSesionAdaptador implements inicioSesionPuerto {

    apiUrl = environment.apiUrlLocal + "auth/login";

    constructor(private readonly _http: HttpClient) { }

    iniciarSesion(inicioSesion: inicioSesionEntity): Observable<inicioSesionInterface> {
        return this._http.post<inicioSesionInterface>( this.apiUrl, inicioSesion);
    }
}
