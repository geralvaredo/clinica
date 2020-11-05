import {Encuesta} from './encuesta';
import {HistoriaClinica} from './historia-clinica';
import {Profesional} from './profesional';
import {Paciente} from './paciente';

export class Turno {
  id: string;
  fecha: string;
  estado: string;
  horaInicio: number;
  minutoInicio: number;
  horaFin: number;
  minutoFin: number;
  paciente: Paciente;
  profesional: Profesional;
  especialidad: string;
  encuesta: Encuesta;
  historiaClinica: HistoriaClinica;

  constructor(id?: string , fecha?: string, estado?: string ,
              horaInicio?: number, minutoInicio?: number, horaFin?: number, minutoFin?: number ,
              profesional?: Profesional, paciente?: Paciente, especialidad?: string) {
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
    this.historiaClinica = null;
  }
}
