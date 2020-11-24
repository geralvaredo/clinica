import {Component, Input, OnInit} from '@angular/core';
import {Turno} from '../../clases/turno';

@Component({
  selector: 'app-detalle-busqueda',
  templateUrl: './detalle-busqueda.component.html',
  styleUrls: ['./detalle-busqueda.component.scss']
})
export class DetalleBusquedaComponent implements OnInit {

  @Input() listaTurnos : Array<any>;
  @Input() paciente : string;
  detalleTurno : boolean ;
  detalleBusquedaTurno: boolean;
  carga : boolean;
  turno: Turno;
  constructor() { }

  ngOnInit(): void {
    this.carga = false;
    this.detalleTurno = false;
  }

  detail(turno) {
    if (this.carga){
      this.detalleTurno = true;
      this.turno = turno;
    }
    this.carga =  true;

  }


}
