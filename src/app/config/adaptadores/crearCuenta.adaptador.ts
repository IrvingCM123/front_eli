import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { crearCuentaPuerto } from "../puertos/crearCuenta.puerto";
import { crearCuentaEntity } from "src/app/domain/registro/crearCuenta.entity";
import { recibirDatosCuentaInterface } from "src/app/common/interfaces/crearCuenta.interface";

@Injectable({
    providedIn: "root",
})
export class crearCuentaAdaptador implements crearCuentaPuerto {

    apiUrl = environment.apiUrlLocal + "auth/";

    constructor(private readonly _http: HttpClient) { }

    crearCuenta(crearCuenta: crearCuentaEntity): Observable<recibirDatosCuentaInterface> {
        return this._http.post<recibirDatosCuentaInterface>( this.apiUrl + 'register', crearCuenta);
    }

    obtenerCodigoValidacion(): Observable<string> {
        return this._http.get<string>(this.apiUrl + 'obtenerCodigo', { responseType: 'text' as 'json' });
    }
}
