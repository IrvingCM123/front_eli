export interface recibirDatosCuentaInterface {
  status: number;
  mensaje: string;
}

export interface crearCuentaInterface {
  Nombre: string;
  Apellidos: string;
  Correo_electronico: string;
  Contrasena: string;
  cuenta_rol: string;
}
