export class productoEntity {
  constructor(
    public id_Producto: number,
    public Nombre: string,
    public Categoria: string,
    public Proveedor: string,
    public Precio: number,
    public Cantidad: number,
    public Imagen: string,
  ) {}
}
