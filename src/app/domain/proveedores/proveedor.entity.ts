export class ProveedorBanco {
  constructor(
    public proveedor_cuenta_bancaria: number,
    public proveedor_nombre_banco: string,
    public proveedor_nombre_beneficiario: string,
    public proveedor_tipo_transaccion: string,
  ) {}
}

export class proveedorEntity {
  constructor(
    public id_Proveedor: number,
    public Nombre: string,
    public Direccion: string,
    public Telefono: string,
    public Email: string,
    public Url_catalogo: string,
    public Fecha_creacion: string,
    public id_Proveedor_Banco: ProveedorBanco,
  ) {}
}

export class crearProveedorEntity {
  constructor(
    public Nombre: string,
    public Direccion: string,
    public Telefono: string,
    public Email: string,
    public Url_catalogo: string,
    public id_Proveedor_Banco: ProveedorBanco,
  ) {}
}
