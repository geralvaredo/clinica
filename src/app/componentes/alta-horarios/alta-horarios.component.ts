import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Turno} from '../../clases/turno';
import {MatPaginator} from '@angular/material/paginator';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {AdaptadorFecha, APP_DATE_FORMATS} from '../../clases/adaptador-fecha';
import {TurnoService} from '../../servicios/turno.service';
import {PerfilService} from '../../servicios/perfil.service';
import {Time} from '@angular/common';


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
  diaInicio: number;
  diaFin: number;
  horaInicio: string;
  minutoInicio: string;
  horaFin: string;
  minutoFin: string;
  listaTurnos: Array<Turno> ;
  semana: Array<string> = ['Domingo' , 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  ultimo: number;
  myDateFilter: any;
  minTimeFilter: string;
  maxTimeFilter: string;
  idProfesional: string;
  horasConfirmadas: string;
  data: MatTableDataSource<any>;
  displayedColumns = ['fecha', 'estado', 'horaInicio', 'horaFin' , 'accion' ];
  @ViewChild('pagina') paginator: MatPaginator;

  constructor(private turnos: TurnoService, private pr: PerfilService) {
    this.inicio = new Date();
    this.fin = new Date();
  }


  ngOnInit(): void {
    this.idProfesional = '';
    this.buscarPerfil();
    this.traerUltimoId();
    this.filtroCalendario();
    this.filtrarHora();
    this.diaInicio = 0;
    this.diaFin = 0;
    this.horasConfirmadas = '';
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
  }

   generarListaDeTurnos(final): void {
     for (let i = this.inicio.getDate(); i < this.fin.getDate() + 1; i++) {
       for (let j = 0; j < final; j++) {
         this.listaTurnos.push( new Turno( this.ultimo.toString(),
           (new Date(this.inicio.getFullYear(), this.inicio.getMonth(), i )).toLocaleDateString() ,
           'disponible', (parseInt(this.horaInicio)) + j , parseInt(this.minutoInicio),
           (parseInt(this.horaInicio)) + (j + 1) , (parseInt(this.minutoInicio)), this.idProfesional));
         this.ultimo++;
       }
     }
   }

   filtroCalendario(): void {
     this.myDateFilter = (d: Date): boolean => {
       const day = d.getDay();
       return day !== 0;
     };
   }

  confirmarHorarios(): void {
    this.turnos.agregarListaDeTurnos(this.listaTurnos);
    this.data = new MatTableDataSource();
    this.horasConfirmadas = 'Las Horas ya fueron confirmadas';

  }

  eliminarTurno(id): void {
    this.listaTurnos = this.listaTurnos.filter(turnos => turnos.id !== id);
    this.data = new MatTableDataSource(this.listaTurnos);
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

  buscarPerfil(): void {
    const user  = JSON.parse(sessionStorage.getItem('usuario'));
    console.log(user);
    this.pr.contadorPerfiles().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if (user.uid === lista[i].uid ){
            this.idProfesional = lista[i].id;
          }
        }
      }) ;
  }

  filtrarHora(): void {
      this.minTimeFilter = '08' ;
      this.maxTimeFilter = '19';
  }

}


