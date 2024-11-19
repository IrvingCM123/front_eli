import { tipoCompras } from "src/app/common/enums/tipoCompras.enum";

export class generarProductoCompra {
	constructor(
		public productoOC_Cantidad_Producto: number, 
		public productoOC_Nombre_Producto: string,
		public productoOC_Producto_ID: number
	) { }
}

export class generarDetalleCompra {
	constructor(
		public detalleOC_Cantidad_Producto: number,
		public detalleOC_Proveedor_ID: number,
		public detalleOC_Cuenta_ID: number,
		public detalleOC_ProductoOC: generarProductoCompra[]
	) { }
}

export class generarOrdenCompra {
	constructor(
		public orden_compra_estado: tipoCompras,
		public detalle_orden_compra:  generarDetalleCompra[]
	) {}
}

export class obtenerOrdenCompra {
	constructor(
		public orden_compra_ID: number,
		public orden_compra_estado: tipoCompras,
		public orden_compra_fecha_ordenado: string,
		public orden_compra_fecha_entregado: string | null,
		public detalle_orden_compra_ID:  obtenerDetalleCompra[]
	) { }
}

export class obtenerDetalleCompra {
	constructor(
		public detalleOC_ID: number,
		public detalleOC_Cantidad_Producto: number,
		public detalleOC_MontoTotal: string | number,
		public detalleOC_Proveedor_ID: any,
		public detalleOC_Cuenta_ID: any,
		public detalleOC_ProductoOC_ID: obtenerProductoCompra[]
	) { }
}

export class obtenerProductoCompra {
	constructor(
		public productoOC_ID: number,
		public productoOC_Cantidad_Producto: number, 
		public productoOC_Nombre_Producto: string,
	) { }
}

