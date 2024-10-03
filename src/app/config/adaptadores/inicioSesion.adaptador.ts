import { Observable, observable } from "rxjs";
// Importación para realizar peticiones http a la API
import { HttpClient } from "@angular/common/http";
// Importación de Injectable para poder inyectar servicios en otros servicios
import { Injectable } from "@angular/core";
// Importación de environment para obtener la url de la API
import { environment } from "src/environments/environment";
// Importación del puerto para el inicio de sesión, utilizando los métodos de la interfaz inicioSesionPuerto
import { inicioSesionPuerto } from "../puertos/inicioSesion.puerto";

// Importación de la entidad inicioSesionEntity para poder utilizarla en el método iniciarSesion
import { inicioSesionEntity } from "src/app/domain/inicioSesion/inicioSesion.entity";

// Importación de la interfaz inicioSesionInterface para poder utilizarla en el método iniciarSesion
import { inicioSesionInterface } from "src/app/common/interfaces/inicioSesion.interface";

@Injectable({
    providedIn: "root",
})
export class inicioSesionAdaptador implements inicioSesionPuerto {

    // Url de la API para el inicio de sesión
    apiUrl = environment.apiUrlLocal + "auth/login";

    // Constructor del adaptador de inicio de sesión
    constructor(private readonly _http: HttpClient) { }

    // Método para iniciar sesión, recibe un inicioSesion de tipo inicioSesionEntity y retorna un Observable de tipo inicioSesionInterface
    iniciarSesion(inicioSesion: inicioSesionEntity): Observable<inicioSesionInterface> {
        // Realiza una petición POST a la API, enviando el inicioSesion y retornando un Observable de tipo inicioSesionInterface
        return this._http.post<inicioSesionInterface>( this.apiUrl, inicioSesion);
    }
}
