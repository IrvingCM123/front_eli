import { registrarVenta, Venta } from "src/app/domain/venta/venta.entity";
import { Observable } from "rxjs";

export abstract class ventaPuerto {
	  abstract registrarVenta(venta: registrarVenta): Observable<any>;
	  abstract obtenerVentas(): Observable<Venta[]>;
	  abstract eliminarVenta(venta_ID: number, estadoVenta: string): Observable<any>;
	  abstract actualizarEstadoVenta(venta_ID: number, venta_EstadoVenta: string): Observable<any>;
}