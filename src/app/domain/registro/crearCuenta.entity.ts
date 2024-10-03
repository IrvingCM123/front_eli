// Crear entidad para la creación de una cuenta de usuario
export class crearCuentaEntity {
  // Constructor de la entidad con los atributos necesarios para la creación de una cuenta de usuario
  constructor(
    public Nombre: string,
    public Apellidos: string,
    public Correo_electronico: string,
    public Contraseña: string,
    public cuenta_rol: string,
  ) {}
}
