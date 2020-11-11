import { Component, OnInit, ViewChild} from '@angular/core';
import {TurnoService} from '../../servicios/turno.service';
import {Turno} from '../../clases/turno';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {PerfilService} from '../../servicios/perfil.service';
import {Perfil} from '../../clases/perfil';
import {MatTableDataSource} from '@angular/material/table';
import {Paciente} from '../../clases/paciente';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HistoriaClinica} from '../../clases/historia-clinica';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss']
})
export class AltaTurnoComponent implements OnInit  {

  conoceProfesionalError: boolean;
  especialidadError: boolean;
  turnoSeleccionado: boolean;
  vistaTurnos : boolean;
  seleccionados: string ;
  conoce: string;
  reserva: string;
  hc: HistoriaClinica;
  turnoModificado: Turno;
  paciente: Paciente;
  listaTurnos: Array<Turno>;
  listraFiltrada: Array<Turno>;
  listaProfesionales: Array<any>;
  usuario: any;
  listaPerfiles: Array<any>;
  idProfesional : string;
  data: MatTableDataSource<any>;
  dataEspecialidad: MatTableDataSource<any>;
  dataProfesionales: MatTableDataSource<any>;

  //especialidad: string[] =  ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  displayedColumns = ['accion' ,  'fecha', 'hora', 'profesional' , 'especialidad'  ,  'estado' ];
  displayEspecialidad = ['accion' ,  'especialidad'];
  displayProfesional = ['accion' , 'nombre' , 'apellido' , 'especialidad'];


   especialidad = [
    {position: 1, name: 'Cardiologia'},
    {position: 2, name: 'Radiologia'},
    {position: 3, name: 'Traumatologia'},
    {position: 4, name: 'Oftalmologia'},
    {position: 5, name: 'Neurologia', },
    {position: 6, name: 'Alergista'},
    {position: 7, name: 'Enfermeria'},
  ];



  myControl = new FormControl();
  filteredOptions: Observable<Perfil[]>;
  @ViewChild('pagina') paginator: MatPaginator;
  @ViewChild('paginaProf') paginatorProf: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;


  constructor(private turnos: TurnoService, private pr: PerfilService) { }

  ngOnInit(): void {
    this.vistaTurnos = false;
    this.turnoSeleccionado = false;
    this.conoce = '';
    this.listaTurnos = [];
    this.listaPerfiles = [];
    this.listraFiltrada = [];
    this.hc = new HistoriaClinica();
    this.traerUsuario();
    this.traerPerfil();
    this.cargarListaDeTurnos();
  }


  traerUsuario(): void{
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  }

  traerPerfil(): void{
    this.pr.contadorPerfiles().subscribe(
      (lista: any) => {
        for (let i = 0; i < lista.length; i++) {
          this.listaPerfiles.push(lista[i]);
        }
        this.filtroTipo();
      });
  }

  cargarListaDeTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if(lista[i].estado == 'DISPONIBLE'){
            this.listaTurnos.push(lista[i]);
          }
        }
      });
  }

  /*filtrados(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('Profesional'),
      map(value => typeof value === 'string' ? value : value.tipo),
      map( tipo => tipo ? this.filtroTipo() : this.listaPerfiles.slice())
    );
  }*/

  private filtroTipo(): any{
    return this.listaProfesionales = this.listaPerfiles.filter(option => option.tipo === 'Profesional');
  }

  opcionProfesional(valor): void {
    this.conoce = valor;
    if(valor == 'no'){
      this.dataEspecialidad = new MatTableDataSource(this.especialidad);
    }
    else {
      this.dataProfesionales = new MatTableDataSource(this.listaProfesionales);
    }
   // console.log(this.listaProfesionales);
  }

  buscarTurnos(conoce, opcion): void {
    if(conoce == 'no'){
      this.busquedaTurnoPorEspecialidad(opcion);
    }
    else{
       this.busquedaTurnoPorProfesional(opcion);
    }
     this.vistaTurnos = true;
  }

  busquedaTurnoPorEspecialidad(especialidad): void{
    this.listraFiltrada = this.listaTurnos.filter(turno => turno.especialidad == especialidad);
    console.log('Lista Filtrada');
    console.log(this.listraFiltrada);
    this.data = new MatTableDataSource(this.listraFiltrada);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  busquedaTurnoPorProfesional(profesional) : void{
    console.log('Profesional:');
    console.log(profesional);
    console.log('lista de Turnos:');
    console.log(this.listaTurnos);
    this.listraFiltrada = this.listaTurnos.filter(turno => turno.profesional.id == profesional.id );
    console.log('lista Filtrada:' );
    console.log(this.listraFiltrada);
    this.data = new MatTableDataSource(this.listraFiltrada);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  /*displayFn(perfil: Perfil): string {
    return perfil && perfil.nombre ? perfil.nombre : '';
  }*/


  reservarTurno(): void {
    this.listaPerfiles = this.listaPerfiles.filter( perfil => perfil.uid == this.usuario.uid );
    this.traerPaciente();
    this.turnoModificado.historiaClinica = this.hc;
    this.turnos.modificarTurno(this.turnoModificado);
    this.data = new MatTableDataSource();
    this.reserva = 'se reservo el turno';

  }

  traerPaciente(){
    this.turnoModificado.estado = 'ASIGNADO';
    for (let i = 0; i < this.listaPerfiles.length; i++) {
      this.turnoModificado.paciente =  this.listaPerfiles[i];
    }
  }

  seleccionado(){
    this.turnoSeleccionado = true;
  }

  turno(e){
    this.listaTurnos = this.listaTurnos.filter(turno => turno.id == e);
    for (let i = 0; i < this.listaTurnos.length; i++) {
      this.turnoModificado = this.listaTurnos[i];
    }
    this.cargarListaDeTurnos();
    console.log(this.turnoModificado);
  }

  limpiar(): void {
    this.turnoSeleccionado = false;
    this.vistaTurnos = false;
    this.seleccionados = '';
    this.conoce = '';
  }

  /*private filtroNombre(name: string): any {
    const filterValue = name.toLowerCase();
    return this.listaPerfiles.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }*/


}
