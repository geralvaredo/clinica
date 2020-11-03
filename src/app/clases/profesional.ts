import {Especialidad} from './especialidad';
import {Perfil} from './perfil';

export class Profesional extends Perfil{
  especialidades: Array<Especialidad> = [];
  habilitado: boolean;
}
