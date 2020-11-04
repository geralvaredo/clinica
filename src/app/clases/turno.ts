import {Encuesta} from './encuesta';
import {HistoriaClinica} from './historia-clinica';
import {Profesional} from './profesional';

export class Turno {
  id: string;
  fecha: string;
  estado: string;
  horaInicio: number;
  minutoInicio: number;
  horaFin: number;
  minutoFin: number;
  paciente: string;
  profesional: Profesional;
  especialidad: string;
  encuesta: Encuesta;
  historiaClinica: HistoriaClinica;

  constructor(id?: string , fecha?: string, estado?: string ,
              horaInicio?: number, minutoInicio?: number, horaFin?: number, minutoFin?: number ,
              profesional?: Profesional, idPaciente?: string, especialidad?: string) {
    this.id = id;
    this.fecha = fecha;
    this.estado = estado;
    this.horaInicio = horaInicio;
    this.minutoInicio = minutoInicio;
    this.horaFin = horaFin;
    this.minutoFin = minutoFin;
    this.profesional = profesional;
    this.paciente = idPaciente;
    this.especialidad = especialidad;
  }
}
