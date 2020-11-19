import {Component, OnInit, ViewChild} from '@angular/core';
import {PerfilService} from '../../servicios/perfil.service';
import {MatTableDataSource} from '@angular/material/table';
import {Profesional} from '../../clases/profesional';
import {VerificationService} from '../../servicios/verification.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-verificacion-especialidad',
  templateUrl: './verificacion-especialidad.component.html',
  styleUrls: ['./verificacion-especialidad.component.scss']
})
export class VerificacionEspecialidadComponent implements OnInit {

  listaPerfiles: Array<any>;
  perfil: Array<any>;
  data: MatTableDataSource<any>;
  prof: Profesional;
  especialista: boolean;
  termino: boolean;
  verificacion : string;
  especialidaConfirmada : boolean;
  @ViewChild('pagina') paginator: MatPaginator;
  displayedColumns = ['accion' , 'profesional' , 'especialidad'  ,  'estado' ];

  constructor(private pr: PerfilService, private vr: VerificationService) { }

  ngOnInit(): void {
    this.termino = false;
    this.especialista = false;
    this.especialidaConfirmada = false;
    this.listaPerfiles = [];
    this.traerPerfil();
  }

  async traerPerfil(): Promise<void> {
    this.listaPerfiles = await this.pr.obtenerPerfiles().then(
         perfil => {  return perfil;  });
    this.listaPerfiles = this.listaPerfiles.filter( perfil => perfil.tipo == 'Profesional' && !(perfil.habilitado));
    this.cargarListadoEspecialistas();

  }


  cargarListadoEspecialistas(): void {
    this.data = new MatTableDataSource(this.listaPerfiles);
  }

  seleccionado(e): void{
    this.especialista = true;
  }

  especialidad(e): void{
    this.perfil = this.listaPerfiles.filter(perfil => perfil.id == e);
    for (let i = 0; i < this.perfil.length; i++) {
      this.prof = this.perfil[i];
    }
    // console.log(this.prof);
  }

  validarEspecialista(): void  {
    this.prof.habilitado = true;
    this.vr.modificarEspecialista(this.prof);
    this.data = new MatTableDataSource();
    this.listaPerfiles = this.listaPerfiles.filter(perfil => perfil.id != this.prof.id);
    this.cargarListadoEspecialistas();
    this.verificacion = 'El profesional ha sido validado correctamente';
    this.especialidaConfirmada = true;
  }



}
