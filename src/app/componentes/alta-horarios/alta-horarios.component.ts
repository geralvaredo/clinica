import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Turno} from '../../clases/turno';
import {MatPaginator} from '@angular/material/paginator';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {AdaptadorFecha, APP_DATE_FORMATS} from '../../clases/adaptador-fecha';
import {TurnoService} from '../../servicios/turno.service';
import {PerfilService} from '../../servicios/perfil.service';
import {Profesional} from '../../clases/profesional';
import {HistoriaClinica} from '../../clases/historia-clinica';
import {Especialidad} from '../../clases/especialidad';


@Component({
  selector: 'app-alta-horarios',
  templateUrl: './alta-horarios.component.html',
  styleUrls: ['./alta-horarios.component.scss'],
  providers: [ {provide: DateAdapter, useClass: AdaptadorFecha},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AltaHorariosComponent implements OnInit {
  inicio: Date;
  fin: Date;
  hc: HistoriaClinica;
  profesional : Profesional;
  vistaHorarios: boolean;
  // perfil: any;
  diaInicio: number;
  diaFin: number;
  ultimo: number;
  uid: string;
  fechaHoy : string;
  horaInicio: string;
  minutoInicio: string;
  horaFin: string;
  minutoFin: string;
  estado = 'DISPONIBLE';
  listaTurnos: Array<Turno> ;
  semana: Array<string> = ['Domingo' , 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  minTimeFilter: string;
  maxTimeFilter: string;
  imagen: string;
  idProfesional: string;
  nombreProfesional: string;
  apellidoProfesional: string;
  horasConfirmadas: string;
  myDateFilter: any;
  especialidad: any;
  data: MatTableDataSource<any>;
  displayedColumns = ['fecha', 'estado', 'horaInicio', 'horaFin' , 'accion' ];
  @ViewChild('pagina') paginator: MatPaginator;

  constructor(private turnos: TurnoService, private pr: PerfilService) {
    this.inicio = new Date();
    this.fin = new Date();
  }


  ngOnInit(): void {
    this.profesional = new Profesional();
    this.idProfesional = '';
    this.buscarPerfil();
    this.traerUltimoId();
    this.filtroCalendario();
    this.filtrarHora();
    this.imagen = '';
    this.diaInicio = 0;
    this.diaFin = 0;
    this.horasConfirmadas = '';
    this.vistaHorarios = false;
  }

  buscarPerfil(): void {
    const user  = JSON.parse(sessionStorage.getItem('usuario'));
    let j = 0;
    this.pr.contadorPerfiles().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if (user.uid === lista[i].uid){
             this.crearProfesional(lista,i,j);
          }
        }
      }) ;
  }

  crearProfesional(lista,i,j): void{
    this.profesional.uid = lista[i].uid;
    this.profesional.id = lista[i].id;
    this.profesional.nombre = lista[i].nombre;
    this.profesional.apellido = lista[i].apellido;
    this.especialidad = lista[i].especialidades[j].nombre;
    this.profesional.fechaNacimiento = lista[i].fechaNacimiento;
    let especialidad = new Especialidad(lista[i].especialidades[j].id,lista[i].especialidades[j].nombre);
    this.profesional.especialidades.push(especialidad);
    this.profesional.img1 = lista[i].img1;
  }

  traerUltimoId(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        if (lista.length === undefined){
          this.ultimo = 1;
        }else {
          this.ultimo = (lista.length + 1);
        }
      });
  }

  filtroCalendario(): void {
    this.myDateFilter = (d: Date): boolean => {
      const day = d.getDay();
      return day !== 0;
    };
  }

  filtrarHora(): void {
    this.minTimeFilter = '08' ;
    this.maxTimeFilter = '19';
  }

  cambioTiempoInicio(e): void{
     this.horaInicio = e[0] + e[1];
     this.minutoInicio = e[3] + e[4];
  }

  cambioTiempoFin(e): void {
    this.horaFin = e[0] + e[1];
    this.minutoFin = e[3] + e[4];
  }

  generarHorarios(): void{
    this.listaTurnos = new Array<Turno>();
    const final = parseInt(this.horaFin) - parseInt(this.horaInicio);
    this.generarListaDeTurnos(final);
    this.data = new MatTableDataSource(this.listaTurnos);
    this.data.paginator = this.paginator;
    this.vistaHorarios = true;

  }

   generarListaDeTurnos(final): void {
     for (let i = this.inicio.getDate(); i < this.fin.getDate() + 1; i++) {
       for (let j = 0; j < final; j++) {
         let idPaciente = null;
         //this.cargaDatosProfesional();
         this.fechaHoy = this.fechaActual(i);
         this.listaTurnos.push( new Turno( this.ultimo.toString(), this.fechaHoy , this.estado, (parseInt(this.horaInicio)) + j , parseInt(this.minutoInicio),
           (parseInt(this.horaInicio)) + (j + 1) , (parseInt(this.minutoInicio)), this.profesional , idPaciente , this.especialidad.toString() , this.hc));
         this.ultimo++;
       }
     }
   }


  fechaActual(i): string{
     return (new Date(this.inicio.getFullYear(), this.inicio.getMonth(), i )).toLocaleDateString();
  }

  confirmarHorarios(): void {
    // console.log(this.listaTurnos);
   this.turnos.agregarListaDeTurnos(this.listaTurnos);
    this.data = new MatTableDataSource();
    this.horasConfirmadas = 'Las Horas ya fueron confirmadas';

  }

  eliminarTurno(id): void {
    this.listaTurnos = this.listaTurnos.filter(turnos => turnos.id !== id);
    this.data = new MatTableDataSource(this.listaTurnos);
  }


  /*cargaDatosProfesional(): void {
       this.perfil = new Profesional();
       this.perfil.id =  this.idProfesional;
       this.perfil.nombre = this.nombreProfesional;
        this.perfil.apellido = this.apellidoProfesional;
        this.perfil.img1 = this.imagen;
        this.perfil.uid = this.uid;
        this.hc = new HistoriaClinica();
     }*/




}


