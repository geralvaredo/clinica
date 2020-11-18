import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detalle-busqueda',
  templateUrl: './detalle-busqueda.component.html',
  styleUrls: ['./detalle-busqueda.component.scss']
})
export class DetalleBusquedaComponent implements OnInit {

  @Input() listaTurnos : Array<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
