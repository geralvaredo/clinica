import {Turno} from './turno';
import {Perfil} from './perfil';
import {Pais} from './pais';

export class Paciente{
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
  ruta: string;
  img1: string;
  img2: string;
  listaTurnos: Array<Turno>;
   constructor() {
     this.ruta = null;
   }

}
