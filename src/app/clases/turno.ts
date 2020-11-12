import {Encuesta} from './encuesta';
import {Profesional} from './profesional';
import {Paciente} from './paciente';
import {HistoriaClinica} from './historia-clinica';

export class Turno {
  id: string;
  fecha: string;
  estado: string;
  horaInicio: number;
  minutoInicio: number;
  horaFin: number;
  minutoFin: number;
  historiaClinica: HistoriaClinica;
  paciente: Paciente;
  profesional: Profesional;
  especialidad: string;
  encuesta: Encuesta;

  constructor(id?: string , fecha?: string, estado?: string ,
              horaInicio?: number, minutoInicio?: number, horaFin?: number, minutoFin?: number ,
              profesional?: Profesional, paciente?: Paciente, especialidad?: string, hc?: HistoriaClinica) {
    this.id = id;
    this.fecha = fecha;
    this.estado = estado;
    this.horaInicio = horaInicio;
    this.minutoInicio = minutoInicio;
    this.horaFin = horaFin;
    this.minutoFin = minutoFin;
    this.profesional = profesional;
    this.paciente = paciente;
    this.especialidad = especialidad;
    this.historiaClinica = hc;
  }
}
