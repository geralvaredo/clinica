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
  listaTurnos: Array<Turno>;
  listaGenerica : Array<any>;
  tipo : string;
  ocultarPanel : boolean;
  verDetalle : boolean;
  inicio: Date;
  fecha : string;
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
    this.verDetalle = false;
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

  buscarTurnos(especialidad?: string) {
    this.verDetalle = true;
     var ano = this.getYear();
     var mes = this.getMonth();
     var dia = this.getDay();
    this.fecha = (new Date( Number(ano) , Number(mes) - 1, Number(dia) )).toLocaleDateString();
    //console.log(this.fecha);
   switch (this.tipo){
      case 'fecha':  this.listaGenerica = this.listaTurnos.filter( turno => turno.fecha == this.fecha);  break;
      case 'paciente': this.listaGenerica = this.listaTurnos.filter( turno => turno.paciente.apellido == this.busqueda); break;
      case 'profesional': this.listaGenerica = this.listaTurnos = this.listaTurnos.filter( turno => turno.profesional.apellido == this.busqueda);  break;
      case 'especialidad': this.listaGenerica = this.listaTurnos.filter( turno => turno.especialidad == especialidad); break;
      case 'edad': this.listaGenerica = this.listaTurnos.filter( turno => (this.calculoFechaNacimientoPorEdad(turno.paciente.fechaNacimiento)) == parseInt(this.busqueda));  break;
      case 'presion': this.listaGenerica = this.listaTurnos.filter( turno => turno.historiaClinica.presion == this.busqueda); break;
      case 'temperatura': this.listaGenerica = this.listaTurnos.filter( turno => turno.historiaClinica.temperatura == this.busqueda); break;
      case 'primera': this.listaGenerica = this.listaTurnos.filter( turno => turno.historiaClinica.primeraObservacion == this.busqueda); break;
      case 'segunda': this.listaGenerica = this.listaTurnos.filter( turno => turno.historiaClinica.segundaObservacion == this.busqueda); break;
      case 'tercera': this.listaGenerica = this.listaTurnos.filter( turno => turno.historiaClinica.terceraObservacion == this.busqueda);  break;
    }
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
    this.listaGenerica = [];
    this.verDetalle = false;
  }
}
