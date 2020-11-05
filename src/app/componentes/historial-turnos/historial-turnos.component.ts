import { Component, OnInit } from '@angular/core';
import {Turno} from '../../clases/turno';
import {PerfilService} from '../../servicios/perfil.service';
import {ImagenService} from '../../servicios/imagen.service';
import {AuthService} from '../../servicios/auth.service';
import {TurnoService} from '../../servicios/turno.service';
import {Paciente} from '../../clases/paciente';

@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.component.html',
  styleUrls: ['./historial-turnos.component.scss']
})
export class HistorialTurnosComponent implements OnInit {

  fechaHoy: Date;
  listaTurnos: Array<Turno>;
  perfil: string;
  usuario: string;
  iniciarConsulta : boolean;

  constructor(private pr: PerfilService, private foto: ImagenService  ,
              private auth: AuthService, private turnos: TurnoService) {
    this.fechaHoy = new Date();
  }

  ngOnInit(): void {
    this.iniciar();
    this.buscarPerfil();
    //this.cargarListaDeTurnos();
    // this.filtrarTurnos();
  }


  filtrarTurnos(): void {
    const user  = JSON.parse(sessionStorage.getItem('usuario'));
    if(this.perfil == 'Paciente'){
      this.listaTurnos = this.listaTurnos.filter(turno => turno.paciente != null );
      this.listaTurnos = this.listaTurnos.filter(turno => turno.paciente.uid == user.uid);
    }else {
      this.listaTurnos = this.listaTurnos.filter(turno => turno.profesional.uid == user.uid);
    }
    console.log(this.listaTurnos);
    this.fotosDeProfesionales();

  }

  comenzarConsulta(): void{

  }

  buscarPerfil(): void {
    const user  = JSON.parse(sessionStorage.getItem('usuario'));
    let j = 0;
    console.log(user);
    this.pr.contadorPerfiles().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if (user.uid === lista[i].uid ){
            this.perfil = lista[i].tipo;
            this.cargarListaDeTurnos();
          }
        }
      }) ;
  }


  cargarListaDeTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
            if(lista[i].estado == 'CANCELADO' || lista[i].estado == 'FINALIZADO'){
              this.listaTurnos.push(lista[i]);
          }
        }
        this.filtrarTurnos();
      });

  }


  fotosDeProfesionales(): void {
    for (let i = 0; i < this.listaTurnos.length; i++) {
      if(this.perfil == 'Paciente'){
        this.foto.getUpload('imagenes/' + this.listaTurnos[i].profesional.img1 ).then(
          res => { this.listaTurnos[i].profesional.img1 = res ; });
      }
      else{
        if(this.listaTurnos[i].paciente == null || this.listaTurnos[i].paciente == undefined){
          let paciente = new Paciente();
          paciente.img1 = 'https://firebasestorage.googleapis.com/v0/b/clinicaonline-b9e2c.appspot.com/o/imagenes%2Fperfil.png?alt=media&token=8d3dd391-f861-47cf-a120-8c1395082e17';
          paciente.apellido = 'Sin';
          paciente.nombre = 'Asignacion';
          this.listaTurnos[i].paciente = paciente;
        }else{
          this.foto.getUpload('imagenes/' + this.listaTurnos[i].paciente.img1 ).then(
            res => { this.listaTurnos[i].paciente.img1 = res ; });
        }

      }

    }
  }

  iniciar(){
    this.iniciarConsulta = false;
    this.listaTurnos = [];
    this.perfil = '';
  }

}
