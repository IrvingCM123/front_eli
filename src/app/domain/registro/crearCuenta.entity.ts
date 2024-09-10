export class crearCuentaEntity {
  constructor(
    public Nombre: string,
    public Apellidos: string,
    public Correo_electronico: string,
    public Contraseña: string,
    public cuenta_rol: string,
  ) {}
}
