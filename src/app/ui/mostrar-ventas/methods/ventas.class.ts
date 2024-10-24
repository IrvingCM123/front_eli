import { Cache_Service } from "src/app/common/services/cache.Service";
import { ventaUseCase } from "src/app/domain/venta/venta.use-case";
import { Venta, DetalleVenta, ProductoVenta } from "src/app/domain/venta/venta.entity";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class claseVentas {

	constructor(
		private ventaUseCase: ventaUseCase,
		private cacheServicio: Cache_Service
	) { }

	private ventaID = new BehaviorSubject<number | null>(null);
	public ventaID$ = this.ventaID.asObservable();

	public async devolverVentas() {
		let ventas;

		try {
			ventas = await this.obtenerVentasCache();
			if (ventas != false) {
				return ventas || [];
			} else {
				ventas = await this.obtenerVentas();
				return ventas || [];
			}
		} catch (error) {
			return ventas || [];
		}
	}

	public async obtenerVentas() {
		try {
			const ventas: Venta[] = (await this.ventaUseCase.obtenerVentas().toPromise()) ?? [];
			if (ventas.length > 0) {
				this.cacheServicio.guardar_DatoLocal('ventas', ventas);
				return ventas;
			} else {
				return ventas;
			}
		} catch (error) {
			return false;
		}

	}

	public async obtenerVentasCache() {
		try {
			const resultado: Venta[] = (await this.cacheServicio.obtener_DatoLocal('ventas')) ?? [];
			if (resultado.length > 0) {
				return resultado;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}

	public async enviarVenta(venta: any) {
		this.ventaID.next(venta);
		this.cacheServicio.guardar_DatoLocal('ventaSeleccionada', venta);
	}

}