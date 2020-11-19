import {Component, Input, OnInit} from '@angular/core';
import {Turno} from '../../clases/turno';

@Component({
  selector: 'app-detalle-busqueda',
  templateUrl: './detalle-busqueda.component.html',
  styleUrls: ['./detalle-busqueda.component.scss']
})
export class DetalleBusquedaComponent implements OnInit {

  @Input() listaTurnos : Array<any>;
  detalleTurno : boolean;
  turno: Turno;
  constructor() { }

  ngOnInit(): void {
  }

  detalle(e: any, turno) {
    this.detalleTurno = e;
    this.turno = turno;
  }
}
