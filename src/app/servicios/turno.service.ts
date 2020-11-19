import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {FirestoreService} from './firestore.service';
import {Turno} from '../clases/turno';
import {HistoriaClinica} from '../clases/historia-clinica';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  turno: Turno;

  constructor(private fs: FirestoreService) { }

  public ultimoTurnoId(): Observable<any> {
    return this.fs.obtenerTotalDocumentos('turnos');
  }

  public agregarListaDeTurnos(listaTurno: Array<Turno> ): void {
    for (let i = 0; i < listaTurno.length; i++) {
      this.turno = new Turno(listaTurno[i].id.toString(), listaTurno[i].fecha , listaTurno[i].estado ,
        listaTurno[i].horaInicio, listaTurno[i].minutoInicio, listaTurno[i].horaFin, listaTurno[i].minutoFin,
        listaTurno[i].profesional, listaTurno[i].paciente , listaTurno[i].especialidad, listaTurno[i].historiaClinica);
      this.fs.agregarDocumento(JSON.parse( JSON.stringify(this.turno)), 'turnos');
    }
  }

  public modificarTurno(turno : Turno){
    this.fs.modificarDocumento(turno, 'turnos');
  }

  public agregarHistoriaClinica(hc: HistoriaClinica ): void {
      this.fs.agregarDocumento(JSON.parse( JSON.stringify(hc)), 'historiasClinicas');
  }

  public obtenerUnTurnoPorHistoriaClinica(id: number): any {
    return this.fs.obtenerUnDocumento('turnos', id);
  }

}
