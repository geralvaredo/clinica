import {Especialidad} from './especialidad';
import {Perfil} from './perfil';

export class Profesional extends Perfil{
  idProfesional: string;
  especialidades: Array<Especialidad> = [];

}
