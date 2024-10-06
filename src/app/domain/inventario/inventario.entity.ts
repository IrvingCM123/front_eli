// Creación de la entidad de inventario, con los campos de los productos del inventario, permitiendo definir los campos de los productos del inventario
export class inventarioEntity {
  constructor(
    public id_Producto: number,
    public producto_nombre: string,
    public producto_categoria: string,
    public producto_precio: number,
    public producto_stock: number,
    public producto_proveedor: any,
    public producto_imagen: string
  ) {}
}

// Creación de la entidad de inventario, con los campos de los productos del inventario, permitiendo definir los campos de los productos del inventario
export class Inventario {
  constructor(
    public inventario_ID: number,
    public inventario_Status: string,
    public inventario_Cantidad: string,
    public inventario_ProductoID: Producto
  ) {}
}

export class Producto {
  constructor(
    public producto_ID: number,
    public producto_Nombre: string,
    public producto_Categoria: string,
    public producto_Precio: string,
    public producto_Status: string,
    public producto_ImagenURL: string,
    public producto_ProveedorID: Proveedor ,
  ) {}
}

export class Proveedor {
  constructor(
    public proveedor_ID: number,
    public proveedor_Nombre: string,
  ) {}
}
