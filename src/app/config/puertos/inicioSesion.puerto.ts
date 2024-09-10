import { inicioSesionEntity } from "src/app/domain/inicioSesion/inicioSesion.entity";
import { Observable } from "rxjs";
import { inicioSesionInterface } from "src/app/common/interfaces/inicioSesion.interface";

export abstract class inicioSesionPuerto {
  abstract iniciarSesion(inicioSesion: inicioSesionEntity): Observable<inicioSesionInterface>;
}
