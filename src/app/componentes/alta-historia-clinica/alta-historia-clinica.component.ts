import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
   @Output() resena : EventEmitter<any> = new EventEmitter<any>();
  @Output() consulta : EventEmitter<any> = new EventEmitter<any>();
  listaTurnos : any;
  edad: string;
  temperatura: string;
  presion: string;
  obs2: string;
  obs3: string;

  constructor(private turnos: TurnoService) { }

  ngOnInit(): void {
    this.hc = new HistoriaClinica();
  }

   agregarHistoriaClinica(){
     this.hcPacienteProfesional();
     this.turnos.modificarTurno(JSON.parse(JSON.stringify(this.turno)));
     this.comienzo = true;
     this.agregoResena();
     this.resenaPacienteProfesionalVacios();
   }




   hcPacienteProfesional(): void {
     this.hc.id = this.turno.id ;
     if(this.perfil == 'Paciente'){  this.turno.historiaClinica.resenaPaciente = this.hc.resenaPaciente;  }
       else {    this.historiaClinicaProfesional();  }
   }

    historiaClinicaProfesional(): void {
      this.turno.historiaClinica.resenaProfesional = this.hc.resenaProfesional;
      this.turno.historiaClinica.temperatura = this.hc.temperatura;
      this.turno.historiaClinica.presion = this.hc.presion;
      this.turno.historiaClinica.edad = this.hc.edad;
      this.turno.historiaClinica.primeraObservacion = this.hc.primeraObservacion;
      this.turno.historiaClinica.segundaObservacion = this.hc.segundaObservacion;
      this.turno.historiaClinica.terceraObservacion = this.hc.terceraObservacion;
    }


   agregoResena(): void {
      this.resena.emit(this.turno);
      this.consulta.emit(this.comienzo);
   }

   resenaPacienteProfesionalVacios(): void {
     if(this.hc.resenaProfesional != null && this.hc.resenaPaciente != null){
       this.comienzo = false;
     }
   }



}
