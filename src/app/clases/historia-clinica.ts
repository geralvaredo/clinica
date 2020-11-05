import {Paciente} from './paciente';
import {Profesional} from './profesional';

export class HistoriaClinica {
  paciente: Paciente;
  profesional: Profesional;
  resenaPaciente: string;
  resenaProfesional: string;
  edad: string;
  temperatura: string;
  presion: string;
  primeraObservacion: string;
  segundaObservacion: string;
  terceraObservacion: string;
}
