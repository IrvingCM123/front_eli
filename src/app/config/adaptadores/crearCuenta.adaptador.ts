// Importación del Observable para la comunicación entre el frontend y el backend
import { Observable } from "rxjs";

// Importación del módulo de HttpClient para la comunicación con el backend
import { HttpClient } from "@angular/common/http";

// Importación del decorador Injectable para la inyección de dependencias
import { Injectable } from "@angular/core";

// Importación de la URL del backend
import { environment } from "src/environments/environment";

// Importación de los puertos para la comunicación con el backend
import { crearCuentaPuerto } from "../puertos/crearCuenta.puerto";

// Importación de las entidades y las interfaces para la comunicación con el backend
import { crearCuentaEntity } from "src/app/domain/registro/crearCuenta.entity";
import { recibirDatosCuentaInterface } from "src/app/common/interfaces/crearCuenta.interface";

// Decorador Injectable para utilizar el servicio en los componentes del frontend
@Injectable({
    providedIn: "root",
})
// Creación del adaptador para la creación de una cuenta de usuario, implementando el puerto correspondiente
export class crearCuentaAdaptador implements crearCuentaPuerto {

    // Declaración de la url correspondiente al backend para la creación de una cuenta
    apiUrl = environment.apiUrlLocal + "auth/";

    // Método constructor para instanciar el módulo de HttpClient y realizar peticiones al backend
    constructor(private readonly _http: HttpClient) { }

    // Método para la creación de una cuenta de usuario, utilizando una entidad y una interfaz definida para el envío y la recepción de datos
    crearCuenta(crearCuenta: crearCuentaEntity): Observable<recibirDatosCuentaInterface> {
        return this._http.post<recibirDatosCuentaInterface>( this.apiUrl + 'register', crearCuenta);
    }

    // Método para la obtención de un código de validación, utilizando un string para la recepción de datos
    obtenerCodigoValidacion(): Observable<string> {
        return this._http.get<string>(this.apiUrl + 'obtenerCodigo', { responseType: 'text' as 'json' });
    }
}
