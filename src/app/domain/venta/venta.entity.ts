export class Venta {
  constructor(
    public venta_ID: number,
    public venta_EstadoVenta: string,
    public venta_FechaRegistro: string,
    public venta_DetalleVenta_ID: DetalleVenta[]
  ) {}
}

export class DetalleVenta {
	  constructor(
	public detalleVenta_ID: number,
	public detalleVenta_TotalProductosVendidos: number,
	public detalleVenta_MontoTotal: number,
	public detalleVentaCorreoCliente: string,
	public detalleVentaNombreCliente: string,
	public detalleVenta_ProductoVenta_ID: ProductoVenta[],
  public cuenta_ID: any
  ) {}
}

export class ProductoVenta {
	  constructor(
	public productoVenta_CantidadProducto: number,
	public productoVenta_PrecioProducto: number,
	public productoVenta_SubtotalVenta: number,
	public productoVenta_NombreProducto: string
  ) {}
}

export class registrarVenta {
  constructor(
    public venta_EstadoVenta: string,
    public cuenta_ID: number,
    public detalleVenta_TotalProductosVendidos: number,
    public detalleVenta_MontoTotal: number,
    public detalleVentaCorreoCliente: string,
    public detalleVentaNombreCliente: string,
    public producto_ID: registrarProductoVenta[]
  ) {}
}

export class registrarProductoVenta {
  constructor(
    public productoVenta_ProductoID: number,
    public productoVenta_NombreProducto: string,
    public productoVenta_CantidadProducto: number,
    public productoVenta_PrecioProducto: number,
    public productoVenta_SubtotalVenta: number
  ) {}
}
