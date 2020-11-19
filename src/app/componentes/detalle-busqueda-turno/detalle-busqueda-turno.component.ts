import {Component, Input, OnInit} from '@angular/core';
import {Turno} from '../../clases/turno';

@Component({
  selector: 'app-detalle-busqueda-turno',
  templateUrl: './detalle-busqueda-turno.component.html',
  styleUrls: ['./detalle-busqueda-turno.component.scss']
})
export class DetalleBusquedaTurnoComponent implements OnInit {

  @Input() turno : Turno;
  constructor() { }

  ngOnInit(): void {
  }

}
