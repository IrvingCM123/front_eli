import { inventarioEntity } from "src/app/domain/inventario/inventario.entity";
import { Observable } from "rxjs";

export abstract class inventarioPuerto {

  abstract obtenerProductos(): Observable<inventarioEntity[]>;
  abstract obtenerProductoNombre(nombreProducto: string): Observable<inventarioEntity>

}
