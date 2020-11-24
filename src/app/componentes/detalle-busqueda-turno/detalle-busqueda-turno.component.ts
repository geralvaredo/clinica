import {Component, Input, OnInit} from '@angular/core';
import {Turno} from '../../clases/turno';

@Component({
  selector: 'app-detalle-busqueda-turno',
  templateUrl: './detalle-busqueda-turno.component.html',
  styleUrls: ['./detalle-busqueda-turno.component.scss']
})
export class DetalleBusquedaTurnoComponent implements OnInit {

  @Input() turno : Turno;
  img : string = 'https://firebasestorage.googleapis.com/v0/b/clinicaonline-b9e2c.appspot.com/o/imagenes%2Fperfil.png?alt=media&token=8d3dd391-f861-47cf-a120-8c1395082e17';
  constructor() { }

  ngOnInit(): void {
  }

}
