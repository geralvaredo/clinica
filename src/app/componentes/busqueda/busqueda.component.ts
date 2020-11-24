import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TurnoService} from '../../servicios/turno.service';
import {Turno} from '../../clases/turno';

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
  tipo : string;
  ocultarPanel : boolean;
  verDetalle : boolean;
  inicio: Date;
  fecha : string;
  turno: Turno;
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

  constructor(private turnos: TurnoService) {
    this.inicio = new Date();
  }

  ngOnInit(): void {

    this.listaTurnos = [];
    this.ocultarPanel = true;
    this.verDetalle = true;
    this.traerListaTurnos();
  }

  traerListaTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if(lista[i].estado != 'DISPONIBLE'){
            this.listaTurnos.push(lista[i]);
          }

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

  buscarTurnos() {
    this.verDetalle = true;
     var ano = this.getYear();
     var mes = this.getMonth();
     var dia = this.getDay();

  }

  getYear(): string {
    return  this.inicio[0]+this.inicio[1]+this.inicio[2]+this.inicio[3];
  }
  getMonth(): string {
    return  this.inicio[5]+ this.inicio[6];
  }

  getDay(): string {
    return  this.inicio[8]+ this.inicio[9];
  }

  calculoFechaNacimientoPorEdad(dateString): number {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad;
  }

  limpiar() {
    this.verDetalle = false;
  }

  cambio(busqueda: string) {
    this.paciente = busqueda;
  }


}
