import { tipoCompras } from "src/app/common/enums/tipoCompras.enum";
import { generarDetalleCompra, generarOrdenCompra, generarProductoCompra } from "src/app/domain/compras/compras.entity";
import { Observable } from "rxjs";

export abstract class generarOrdenPuerto {
	abstract registrarOrdenCompra(compra: generarOrdenCompra): Observable<any>
	abstract obtenerOrdenCompra(): Observable<any>;
	abstract eliminarOrdenCompra(compra_ID: number): Observable<any>;
	abstract actualizarEstadoCompra(compra_ID: number, estadoCompra: tipoCompras): Observable<any>
}