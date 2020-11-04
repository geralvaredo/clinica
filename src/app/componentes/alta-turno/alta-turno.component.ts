import { Component, OnInit } from '@angular/core';
import {TurnoService} from '../../servicios/turno.service';
import {Turno} from '../../clases/turno';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PerfilService} from '../../servicios/perfil.service';
import {Perfil} from '../../clases/perfil';
import {MatTableDataSource} from '@angular/material/table';
import {Paciente} from '../../clases/paciente';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss']
})
export class AltaTurnoComponent implements OnInit {

  conoceProfesionalError: boolean;
  especialidadError: boolean;
  turnoSeleccionado: boolean;
  vistaTurnos : boolean;
  especialidad: string[] =
    ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  seleccionados: string ;
  conoce: string;
  reserva: string;
  turnoModificado: Turno;
  paciente: Paciente;
  listaTurnos: Array<Turno>;
  usuario: any;
  listaPerfiles: Array<any>;
  idProfesional : string;
  data: MatTableDataSource<any>;
  displayedColumns = ['accion' ,  'fecha', 'hora', 'profesional' , 'especialidad'  ,  'estado' ];
  myControl = new FormControl();
  filteredOptions: Observable<Perfil[]>;

  constructor(private turnos: TurnoService, private pr: PerfilService) { }

  ngOnInit(): void {
    this.vistaTurnos = false;
    this.turnoSeleccionado = false;
    this.conoce = '';
    this.listaTurnos = [];
    this.listaPerfiles = [];
    this.traerUsuario();
    this.traerPerfil();
    this.cargarListaDeTurnos();
    this.filtrados();
  }

  buscarTurnos(valor): void {
    if(valor == 'no'){
      this.listaTurnos = this.listaTurnos.filter(turno => turno.especialidad == this.seleccionados);
    }
    else{
      this.listaTurnos = this.listaTurnos.filter(turno => turno.profesional.id == this.myControl.value.id.toString());
    }
    this.data = new MatTableDataSource(this.listaTurnos);
    this.vistaTurnos = true;
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

  filtrados(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('Profesional'),
      map(value => typeof value === 'string' ? value : value.tipo),
      map( tipo => tipo ? this.filtroTipo(tipo) : this.listaPerfiles.slice())
    );
  }


  displayFn(perfil: Perfil): string {
    return perfil && perfil.nombre ? perfil.nombre : '';
  }

  /*private filtroNombre(name: string): any {
    const filterValue = name.toLowerCase();
    return this.listaPerfiles.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }*/

  private filtroTipo(tipo : string): any{
    return this.listaPerfiles.filter(option => option.tipo === 'Profesional');
  }

  reservarTurno(): void {
    this.listaPerfiles = this.listaPerfiles.filter( perfil => perfil.uid == this.usuario.uid );
    this.traerPaciente();
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

 profesional(valor): void {
    this.conoce = valor;
 }

  traerPerfil(): void{
    this.pr.contadorPerfiles().subscribe(
      (lista: any) => {
        for (let i = 0; i < lista.length; i++) {
          this.listaPerfiles.push(lista[i]);
        }
      });
  }

 traerUsuario(): void{
   this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
 }

  limpiar(): void {
    this.turnoSeleccionado = false;
    this.vistaTurnos = false;
    this.seleccionados = '';
  }

}
