import { Component, OnInit } from '@angular/core';
import {PerfilService} from '../../servicios/perfil.service';
import {AuthService} from '../../servicios/auth.service';
import {ImagenService} from '../../servicios/imagen.service';
import {TurnoService} from '../../servicios/turno.service';
import {Turno} from '../../clases/turno';
import {Paciente} from '../../clases/paciente';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.scss']
})
export class DetalleTurnoComponent implements OnInit {

  fechaHoy: Date;
  listaTurnos: Array<Turno>;
  turnoSelecionado: Turno;
  perfil: string;
  usuario: string;
  iniciarConsulta : boolean;
  comienzaConsulta: boolean;
  resenaCargada: boolean;
  detalleResena: boolean;
  habilitaFinalizar: boolean;
  profesionalHabilitado : boolean;



  constructor(private pr: PerfilService, private foto: ImagenService  ,
              private auth: AuthService, private turnos: TurnoService) {
    this.fechaHoy = new Date();
  }

  ngOnInit(): void {
    this.perfil = '';
    this.listaTurnos = [];
    this.iniciar();
    this.buscarPerfil();
  }

  iniciar(){
    this.iniciarConsulta = false;
    this.comienzaConsulta = true;
    this.detalleResena = false;
    this.habilitaFinalizar = false;
  }

  buscarPerfil(): void {
    const user  = JSON.parse(sessionStorage.getItem('usuario'));
    this.pr.contadorPerfiles().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if (user.uid === lista[i].uid ){
            this.perfil = lista[i].tipo;
            this.profesionalHabilitado = lista[i].habilitado;

            this.cargarListaDeTurnos();
          }
        }
      }) ;
  }

  cargarListaDeTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if(this.perfil == 'Paciente'){
            if(lista[i].estado == 'ASIGNADO'){
              this.listaTurnos.push(lista[i]);
            }
          }else {
            if(lista[i].estado == 'ASIGNADO' || lista[i].estado == 'DISPONIBLE'){
              this.listaTurnos.push(lista[i]);
            }
          }

        }
        this.filtrarTurnos();
      });

  }


  filtrarTurnos(): void {
    const user  = JSON.parse(sessionStorage.getItem('usuario'));
    if(this.perfil == 'Paciente'){
      this.listaTurnos = this.listaTurnos.filter(turno => turno.paciente.uid == user.uid);
    }else {
      this.listaTurnos = this.listaTurnos.filter(turno => turno.profesional.uid == user.uid);
    }
    this.fotoDePerfiles();
  }

  fotoDePerfiles(): void {
    for (let i = 0; i < this.listaTurnos.length; i++) {
      if(this.perfil == 'Paciente'){
        this.foto.getUpload('imagenes/' + this.listaTurnos[i].profesional.img1 ).then(
          res => {      this.listaTurnos[i].profesional.img1 = res   });
      }
      else{
        if(this.listaTurnos[i].paciente == null || this.listaTurnos[i].paciente == undefined){
          this.sinAsignacion(i);
        }else{
          this.foto.getUpload('imagenes/' + this.listaTurnos[i].paciente.img1 ).then(
            res => {    this.listaTurnos[i].paciente.img1 = res ; });
        }
      }
    }
  }

  sinAsignacion(i): void{
    let paciente = new Paciente();
    paciente.img1 = 'https://firebasestorage.googleapis.com/v0/b/clinicaonline-b9e2c.appspot.com/o/imagenes%2Fperfil.png?alt=media&token=8d3dd391-f861-47cf-a120-8c1395082e17';
    paciente.apellido = 'Sin';
    paciente.nombre = 'Asignacion';
    this.listaTurnos[i].paciente = paciente;
  }


  comenzarConsulta(t: Turno): void{
    this.iniciarConsulta = true ;
     this.comienzaConsulta = false;
     this.turnoSelecionado = t;
  }

   devolucionResena(e): void {
     this.listaTurnos = [];
    this.turnoSelecionado = e;
  }

  devolucion(e): void{
    this.comienzaConsulta = e;
    this.resenaCargada = e;
  }

  cancelarTurno(e): void {
    e.estado = 'CANCELADO';
    if(this.perfil == 'Profesional'){
      e.paciente = null;
    }
    //
    this.turnos.modificarTurno(e);
    this.listaTurnos = [];
    //this.iniciar();
  }

  verResenaPaciente(turno): void {
    this.detalleResena = true;
    this.turnoSelecionado = turno;
 }

  volver(e){
    this.detalleResena = e;
  }

  finalizarTurno(turno){
    turno.estado = 'FINALIZADO';
    this.turnos.modificarTurno(turno);
    this.listaTurnos = [];
    this.turnos.agregarHistoriaClinica(turno.historiaClinica);
  }

  renderizarBotones(item,opcion){
    let valor = false;
    switch (opcion) {
      case 'C':
      case 'V': valor = this.evaluaHistoriaClinicaNula(item);  break;
      case 'F': valor = this.evaluaHistoriaClinicaDistintaANula(item); break;
      case 'I': valor = this.evaluarPerfilYHistoriaClinica(item); break;
      case 'PE': valor = this.evaluarPerfilYEstado(item); break;
    }
     return valor;
  }

  evaluaHistoriaClinicaNula(item): boolean {
    if(item.estado == 'DISPONIBLE'){
      return true;
    }
    if(item.estado == 'ASIGNADO'){
      if(item.historiaClinica == null){
        return true;
      }
      else {
        return ( item.historiaClinica.resenaPaciente == null && item.historiaClinica.resenaProfesional == null) ;
      }

    }
  }

  evaluaHistoriaClinicaDistintaANula(item){
    if(item.estado == 'ASIGNADO'){
      if(item.historiaClinica != null){
        return (item.historiaClinica.resenaPaciente != null && item.historiaClinica.resenaProfesional != null);
      }
    }
  }

  evaluarPerfilYHistoriaClinica(item){
    if(item.historiaClinica != null){
      return (this.perfil=='Paciente' && item.historiaClinica.resenaPaciente != null ||
        this.perfil == 'Profesional' && item.historiaClinica.resenaProfesional != null);
    }
  }

  evaluarPerfilYEstado(item){
    return (this.perfil == 'Paciente' || (this.perfil == 'Profesional' && item.estado == 'ASIGNADO' && this.profesionalHabilitado));
  }

}
