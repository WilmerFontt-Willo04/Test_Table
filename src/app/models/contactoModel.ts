export class itemContact {
  _id?: string;
  nombreCompleto: string;
  nombreEmpresa: string;
  email: string;
  telefono: string;
  categoria: string;
  mensaje: string;

  constructor(
    _id = '',
    nombreCompleto = '',
    nombreEmpresa = '',
    email = '',
    telefono = '',
    categoria = '',
    mensaje = ''
  ) {
    this._id = _id;
    this.nombreCompleto = nombreCompleto;
    this.nombreEmpresa = nombreEmpresa;
    this.email = email;
    this.telefono = telefono;
    this.categoria = categoria;
    this.mensaje = mensaje;
  }
}
