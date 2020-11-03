import {Encuesta} from './encuesta';
import {HistoriaClinica} from './historia-clinica';
import {Paciente} from './paciente';
import {Profesional} from './profesional';

export class Turno {
  id: string;
  fecha: string;
  estado: string;
  horaInicio: number;
  minutoInicio: number;
  horaFin: number;
  minutoFin: number;
  idPaciente: string;
  idProfesional: string;
  encuesta: Encuesta;
  historiaClinica: HistoriaClinica;

  constructor(id?: string , fecha?: string, estado?: string ,
              horaInicio?: number, minutoInicio?: number, horaFin?: number, minutoFin?: number ,
              idProfesional?: string, idPaciente?: string) {
    this.id = id;
    this.fecha = fecha;
    this.estado = estado;
    this.horaInicio = horaInicio;
    this.minutoInicio = minutoInicio;
    this.horaFin = horaFin;
    this.minutoFin = minutoFin;
    this.idProfesional = idProfesional;
    this.idPaciente = idPaciente;
  }
}
