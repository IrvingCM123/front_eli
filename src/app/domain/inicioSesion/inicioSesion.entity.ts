// Creación de la entidad de inicio de sesión, con los atributos Correo_electronico y Contraseña
export class inicioSesionEntity {
  constructor(
    public Correo_electronico: string,
    public Contraseña: string
  ) {}
}
