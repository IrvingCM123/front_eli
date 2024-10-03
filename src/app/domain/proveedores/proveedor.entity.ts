// Creación de la entidad de proveedorBanco para almacenar los datos de la cuenta bancaria del proveedor
export class ProveedorBanco {
  constructor(
    public proveedorBanco_CuentaBancaria: number,
    public proveedorBanco_NombreBanco: string,
    public proveedorBanco_NombreBeneficiario: string,
    public proveedorBanco_TipoTransaccion: string,
  ) {}
}

// Creación de la entidad de proveedor para recibir los datos del proveedor y la cuenta bancaria del proveedor al hacer una petición GET a la API
export class proveedorEntity {
  constructor(
    public proveedor_ID?: number,
    public proveedor_Nombre?: string,
    public proveedor_Direccion?: string,
    public proveedor_Telefono?: string,
    public proveedor_Email?: string,
    public proveedor_Catalogo?: string,
    public proveedor_FechaCreacion?: string,
    public proveedorBanco_ID?: ProveedorBanco,
  ) {}
}

// Creación de la entidad de crearProveedorEntity para enviar los datos del proveedor y la cuenta bancaria del proveedor al hacer una petición POST a la API
export class crearProveedorEntity {
  constructor(
    public proveedor_Nombre?: string,
    public proveedor_Direccion?: string,
    public proveedor_Telefono?: string,
    public proveedor_Email?: string,
    public proveedor_Catalogo?: string,
    public proveedorBanco_ID?: ProveedorBanco,
  ) {}
}
