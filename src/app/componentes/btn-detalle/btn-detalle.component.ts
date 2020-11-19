import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Turno} from '../../clases/turno';

@Component({
  selector: 'app-btn-detalle',
  templateUrl: './btn-detalle.component.html',
  styleUrls: ['./btn-detalle.component.scss']
})
export class BtnDetalleComponent implements OnInit {

  @Output() botonDetalle : EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {

  }

  detalleTurno() {
    this.botonDetalle.emit(true);
  }
}
