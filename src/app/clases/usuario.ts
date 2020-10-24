export class Usuario {

  _email: string;
  _pass: string;
  _nombre: string;
  private _apellido: string;
  private _img;
  _sexo: string;
  _fechaNacimiento: string;

  constructor() {
  }

  get nombre(): string {
    return this._nombre;
  }

  get apellido(): string {
    return this._apellido;
  }

  get password(): string {
    return this._pass;
  }

  get email(): string {
    return this._email;
  }

  get sexo(): string {
    return this._sexo;
  }

  get fechaNacimiento(): string {
    return this._fechaNacimiento;
  }

  get img(): string {
    return this._img;
  }
}
