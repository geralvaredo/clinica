import {Component, Input, OnInit} from '@angular/core';
import {Turno} from '../../clases/turno';
import {TurnoService} from '../../servicios/turno.service';
import {HistoriaClinica} from '../../clases/historia-clinica';

@Component({
  selector: 'app-alta-historia-clinica',
  templateUrl: './alta-historia-clinica.component.html',
  styleUrls: ['./alta-historia-clinica.component.scss']
})
export class AltaHistoriaClinicaComponent implements OnInit {

  @Input() turno: Turno;
  hc: HistoriaClinica;
  @Input() perfil: string;
  @Input() comienzo: boolean;
  edad: string;
  temperatura: string;
  presion: string;
  obs1: string;
  obs2: string;
  obs3: string;
  resenaProfesional: string;
  resenaPaciente: string;
  habilitaFinalizar: boolean;

  constructor(private turnos: TurnoService) { }

  ngOnInit(): void {
    this.habilitaFinalizar = false;
    this.hc = new HistoriaClinica();
  }

   agregarHistoriaClinica(){
    if(this.perfil == 'Profesional'){
      this.hc.resenaProfesional = this.resenaProfesional;
    }else{
      this.hc.resenaPaciente = this.resenaPaciente;
    }
     this.turno.historiaClinica = this.hc;
     this.turnos.modificarTurno(this.turno);
    if(this.turno.historiaClinica.resenaProfesional != null && this.turno.historiaClinica.resenaPaciente != null){
      this.habilitaFinalizar = true;
      this.comienzo = false;
    }
   }

   finalizarTurno(){
    this.turno.estado = 'FINALIZADO';
     this.hc.paciente = this.turno.paciente;
     this.hc.profesional = this.turno.profesional;
    this.turnos.agregarHistoriaClinica(this.hc);
   }

}
