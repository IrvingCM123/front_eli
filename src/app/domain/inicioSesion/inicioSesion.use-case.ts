// Importaciones de librerías necesarias para el funcionamiento del servicio
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Importación de la entidad inicioSesionEntity para poder utilizarla en el método iniciarSesion
import { inicioSesionEntity } from "./inicioSesion.entity";

// Importación del puerto para el inicio de sesión, utilizando los métodos de la interfaz inicioSesionPuerto
import { inicioSesionPuerto } from "src/app/config/puertos/inicioSesion.puerto";

// Importación de la interfaz inicioSesionInterface para poder utilizarla en el método iniciarSesion
import { inicioSesionInterface } from "src/app/common/interfaces/inicioSesion.interface";

@Injectable({
  providedIn: "root",
})
export class inicioSesionUseCase {

  // Constructor del caso de uso de inicio de sesión
  constructor(private readonly _inicioSesionPuerto: inicioSesionPuerto) { }

  // Método para iniciar sesión, recibe un inicioSesion de tipo inicioSesionEntity y retorna un Observable de tipo inicioSesionInterface
  iniciarSesion(inicioSesion: inicioSesionEntity): Observable<inicioSesionInterface> {
    // Llama al método iniciarSesion del puerto, enviando el inicioSesion y retornando un Observable de tipo inicioSesionInterface
    return this._inicioSesionPuerto.iniciarSesion(inicioSesion);
  }
}
