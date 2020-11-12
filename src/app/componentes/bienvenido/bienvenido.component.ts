import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PerfilService} from '../../servicios/perfil.service';
import {Horario} from '../../clases/horario';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {

  fecha: Date;
  horario: Horario;
  listaPerfiles: Array<any>;
  usuario: any;

  constructor(private pr: PerfilService) {
    this.fecha = new Date();

  }

  ngOnInit(): void {
    this.traerPerfil();
  }


   cargaHorarios(): void {
      this.horario = new Horario();
     for (let i = 0; i < this.listaPerfiles.length; i++) {
       this.horario.uid = this.listaPerfiles[i].uid;
       this.horario.id = this.fecha.toLocaleTimeString();
       this.horario.fecha = this.fecha.toLocaleDateString();
       this.horario.nombre = this.listaPerfiles[i].nombre;
       this.horario.apellido = this.listaPerfiles[i].apellido;
     }
     this.pr.crearHorarioIngreso(this.horario);

   }


  async traerPerfil(): Promise<void> {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.listaPerfiles = await this.pr.obtenerPerfiles().then(
      perfil => {  return perfil;  });
    this.listaPerfiles = this.listaPerfiles.filter( perfil => perfil.tipo == 'Profesional' && perfil.uid == this.usuario.uid);
    console.log(this.listaPerfiles);
    this.cargaHorarios();
  }


}
