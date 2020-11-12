import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Turno} from '../../clases/turno';

@Component({
  selector: 'app-detalle-historia-clinica',
  templateUrl: './detalle-historia-clinica.component.html',
  styleUrls: ['./detalle-historia-clinica.component.scss']
})
export class DetalleHistoriaClinicaComponent implements OnInit {

  @Input() turno : Turno;
  @Input() perfil : any;
  @Input() resena : boolean;
  @Output() salir : EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  limpiar():void {
     this.resena = false;
     this.salir.emit(this.resena);
  }


}
