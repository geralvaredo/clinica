import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TurnoService} from '../../servicios/turno.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  tipoBusquedas = [ 'Fecha','Paciente' , 'Profesional' , 'Especialidad' , 'Edad',
  'Temperatura' , 'Presion', 'Observacion1' , 'Observacion2', 'Observacion3'];
  displayEspecialidad = ['accion' ,  'especialidad'];
  paciente: string;
  busqueda: string;
  listaTurnos: Array<any>;
  listaGenerica : Array<any>;
  tipo : string;
  ocultarPanel : boolean;
  verDetalle : boolean;
  inicio: Date;
  dataEspecialidad: MatTableDataSource<any>;
  especialidad = [
    {position: 1, name: 'Cardiologia'},
    {position: 2, name: 'Radiologia'},
    {position: 3, name: 'Traumatologia'},
    {position: 4, name: 'Oftalmologia'},
    {position: 5, name: 'Neurologia', },
    {position: 6, name: 'Alergista'},
    {position: 7, name: 'Enfermeria'},
  ];
  myDateFilter: any;

  constructor(private turnos: TurnoService) { }

  ngOnInit(): void {
    this.inicio = new Date();
    this.listaTurnos = [];
    this.ocultarPanel = true;
    this.verDetalle = false;
    this.traerListaTurnos();
  }

  traerListaTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
            this.listaTurnos.push(lista[i]);
        }
      });
  }



  opcionBusqueda(valor: string) {
   this.tipo = valor;
   this.ocultarPanel = false;
   switch (this.tipo) {
     case 'especialidad': this.dataEspecialidad = new MatTableDataSource(this.especialidad); break;
   }
  }

  buscarTurnos(especialidad?: string) {
    this.verDetalle = true;

    console.log(this.inicio[0]);
    /*switch (this.tipo){
      case 'fecha':  this.listaGenerica = this.listaTurnos.filter( turno => turno.fecha == this.inicio);

                      break;
      case 'paciente':  break;
      case 'profesional':  break;
      case 'especialidad':  break;
      case 'edad':  break;
      case 'presion':  break;
      case 'temperatura':  break;
      case 'primera':  break;
      case 'segunda':  break;
      case 'tercera':  break;
    }*/
  }
}
