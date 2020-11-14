import {Especialidad} from './especialidad';
import {Pais} from './pais';

export class Profesional{
  uid: string;
  id: string;
  nombre: string;
  apellido: string;
  tipo: string;
  fechaNacimiento: string;
  nacionalidad: Pais;
  sexo: string ;
  fechaAlta: string;
  fechaBaja: string;
  img1: string;
  ruta: string;
  especialidades: Array<Especialidad> = [];
  habilitado: boolean;

  constructor( ) {
    this.ruta = null;
  }
}
