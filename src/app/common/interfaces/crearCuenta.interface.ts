// Interfaz para declarar los campos que se recibirán al crear una cuenta
export interface recibirDatosCuentaInterface {
  status: number;
  mensaje: string;
}

// Interfaz para declarar los campos que se enviarán al crear una cuenta
export interface crearCuentaInterface {
  Nombre: string;
  Apellidos: string;
  Correo_electronico: string;
  Contrasena: string;
  cuenta_rol: string;
}
