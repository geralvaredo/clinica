import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../clases/usuario';
import {AuthService} from '../../servicios/auth.service';
import {Perfil} from '../../clases/perfil';
import {PerfilService} from '../../servicios/perfil.service';
import {Paciente} from '../../clases/paciente';
import {Profesional} from '../../clases/profesional';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  isRegistered = 'bienvenido';
  registerError = 'error';
  repass: string ;
  usuarioError: boolean;
  passError: boolean;
  repassError: boolean;
  apellidoError: boolean;
  fechaDeNacimientoError: boolean;
  primeraFotoError: boolean;
  segundaFotoError: boolean;
  especialidadError: boolean;
  sexoError: boolean;
  tipoError: boolean;
  usuario: Usuario;
  perfil: Perfil;
  tipoPerfil: string;
  documento: string;
  token: string ;
  captchaError: boolean;
  especialidad: string[] =
    ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  seleccionados: string [] = [];


  constructor(private auth: AuthService, private pr: PerfilService) {
  }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.restablecer();
  }

  onChange(e): void{
    if (e.value === 'Profesional'){
      this.perfil = new Profesional();
    }else {
      this.perfil = new Paciente();
    }
  }

  async onRegister(): Promise<void> {
    try {
      const user = await this.auth.register(this.usuario);
      this.registroDireccionamiento(user);
    } catch (error) {
      console.log('ErrorOnRegister', error);
    }
  }

  public registroDireccionamiento(user): void {
    if (user) {
      this.verificacion();
      this.perfil.id = this.documento;
      this.pr.crearPerfil(this.perfil);
      this.auth.redirect(this.isRegistered);
    } else {
      this.auth.redirect(this.registerError);
    }
  }

  verificacion(): void {
    if (this.tipoPerfil === 'Paciente'){
       this.perfil.tipo = 'Paciente';
       this.isRegistered = 'verificacionCorreo';
    }
    else{
      this.perfil.tipo = 'Profesional';
    }
  }


  asignarId(): void{
    this.pr.contadorPerfiles().subscribe((lista) => {
       this.documento = (lista.length + 1).toString();
    });
  }

  restablecer(): void{
    this.asignarId();
  }

  resolved(token): void{
    this.token = token;
  }


}
