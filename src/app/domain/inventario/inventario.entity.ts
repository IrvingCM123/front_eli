export class inventarioEntity {
  constructor(
    public id_Producto: number,
    public producto_nombre: string,
    public producto_categoria: string,
    public producto_precio: number,
    public producto_stock: number,
    public producto_proveedor: any
  ) {}
}
