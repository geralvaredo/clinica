import {Turno} from './turno';
import {Perfil} from './perfil';

export class Paciente extends Perfil{
  idPaciente: string;
  listaTurnos: Array<Turno>;

  constructor() {
    super();
  }
}
