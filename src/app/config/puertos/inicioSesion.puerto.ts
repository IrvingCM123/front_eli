// Importar la entidad inicioSesionEntity para poder utilizarla en el método iniciarSesion
import { inicioSesionEntity } from "src/app/domain/inicioSesion/inicioSesion.entity";

import { Observable } from "rxjs";

// Importar la interfaz inicioSesionInterface para poder utilizarla en el método iniciarSesion
import { inicioSesionInterface } from "src/app/common/interfaces/inicioSesion.interface";

// Definir la clase abstracta inicioSesionPuerto para poder implementarla en el adaptador
export abstract class inicioSesionPuerto {

    // Método abstracto para iniciar sesión, recibe un inicioSesion de tipo inicioSesionEntity y retorna un Observable de tipo inicioSesionInterface
  abstract iniciarSesion(inicioSesion: inicioSesionEntity): Observable<inicioSesionInterface>;
}
