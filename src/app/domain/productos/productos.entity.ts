// Declaración de la entidad que define los campos necesarios para la creación de un producto en el inventario, en una petición POST a la API
export class crearProductoEntity {
  constructor(
    public producto_Nombre: string,
    public producto_Categoria: string,
    public producto_ProveedorID: string,
    public producto_Precio: number,
    public producto_stock: number,
    public producto_ImagenURL: string,
  ) {}
}

// Declaración de la entidad que define los campos necesarios para la obtención de los productos del inventario, en una petición GET a la API
export class obtenerProductosInventario {
  constructor(
    public inventario_ID: number,
    public inventario_Status: string,
    public inventario_Cantidad: number,
    public inventario_Cantidad_Minima: number,
    public inventario_Cantidad_Maxima: number,
    public inventario_Fecha_Registro: Date,
    public inventario_ProductoID: ProductoEntity,
  ) {}
}

// Declaración de la subentidad que se utilizara en la entidad ProductoEntity para mostrar los detalles del producto 
export class ProductoEntity {
  constructor(
    public producto_ID: number,
    public producto_Nombre: string,
    public producto_Categoria: string,
    public producto_Precio: string,
    public producto_Status: string,
    public producto_ImagenURL: string,
    public producto_ProveedorID: Proveedor
  ) {}
}

// Declaración de la subentidad que se utilizara en la entidad ProductoEntity para mostrar el proveedor del producto
class Proveedor {
  constructor(
    public proveedor_ID: number,
    public proveedor_Nombre: string,
    public proveedor_Direccion: string,
    public proveedor_Telefono: string,
    public proveedor_Email: string,
    public proveedor_Catalogo: string,
    public proveedor_FechaCreacion: Date
  ) {}
}
