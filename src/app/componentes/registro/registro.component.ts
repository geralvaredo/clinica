import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../clases/usuario';
import {AuthService} from '../../servicios/auth.service';
import {Perfil} from '../../clases/perfil';
import {PerfilService} from '../../servicios/perfil.service';
import {Paciente} from '../../clases/paciente';
import {Profesional} from '../../clases/profesional';
import {Especialidad} from '../../clases/especialidad';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  isRegistered = 'verificacionCorreo';
  registerError = 'error';
  repass: string ;
  usuarioError: boolean;
  passError: boolean;
  repassError: boolean;
  nombreError: boolean;
  apellidoError: boolean;
  fechaDeNacimientoError: boolean;
  primeraFotoError: boolean;
  segundaFotoError: boolean;
  especialidadError: boolean;
  captchaError: boolean;
  sexoError: boolean;
  tipoError: boolean;
  error: boolean ;
  usuario: Usuario;
  perfil: any ;
  tipoPerfil: string;
  documento: string;
  token: string ;

  especialidad: string[] =
    ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  seleccionados: string [] = [];


  constructor(private auth: AuthService, private pr: PerfilService) {
  }

  ngOnInit(): void {
    this.restablecer();
    this.usuario = new Usuario();
    this.inicializar();
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
       if (this.validarCampos()){
         const user = await this.auth.register(this.usuario);
         this.perfil.uid  = user.uid;
         this.auth.sitioAnterior('registro');
         this.auth.guardarEnStorage(user);
         this.registroDireccionamiento(user);
         this.restablecer();
       }
    } catch (error) {
      console.log('ErrorOnRegister', error);
    }
  }

  public registroDireccionamiento(user): void {
    if (user) {
      this.verificacion();
      this.perfil.id = this.documento;
      if (this.tipoPerfil === 'Profesional'){
         this.cargaEspecialidad();
       }
      this.pr.crearPerfil(this.perfil);
      this.auth.redirect(this.isRegistered);
    } else {
      this.auth.redirect(this.registerError);
    }
  }

  verificacion(): void {
    if (this.tipoPerfil === 'Paciente'){
       this.perfil.tipo = 'Paciente';
    }
    else{
      this.perfil.tipo = 'Profesional';
    }
  }

  cargaEspecialidad(): void {
    for (let i = 0; i < this.seleccionados.length; i++) {
      this.perfil.especialidades.push(new Especialidad(i, this.seleccionados[i]));
    }

  }

  asignarId(): void{
    this.pr.contadorPerfiles().subscribe((lista) => {
       this.documento = (lista.length + 1).toString();
    });
  }

  inicializar(): void{
    this.asignarId();
  }

  restablecer(): void {
    this.usuarioError = false;
    this.passError = false;
    this.repassError = false;
    this.nombreError = false;
    this.apellidoError = false;
    this.fechaDeNacimientoError = false;
    this.primeraFotoError = false;
    this.segundaFotoError = false;
    this.especialidadError = false;
    this.sexoError = false;
    this.captchaError = false;
  }

  resolved(token): void{
    this.token = token;
  }

   validarCampos(): boolean {
    this.error = false;
    let fotos = true;
    let especialidad = true;
    if (this.tipoPerfil === 'Paciente'){
         fotos = this.validarFotos();
      }
    if (this.tipoPerfil === 'Profesional'){
         especialidad = this.validarEspecialidad();
      }
    const usuario = this.validarUsuario();
    const pass = this.validarPass();
    const nombre = this.validarNombre();
    const apellido = this.validarApellido();
    const fecha = this.validarFecha();
    const sexo = this.validarSexo();
    const captcha = this.validarCaptcha();

    if (usuario && pass && nombre && apellido && fecha && sexo && fotos && especialidad && captcha){
        this.error = true;
       }
    return this.error;
   }

   validarUsuario(): boolean {
      let usuario = true ;
      if (this.usuario.email === null || this.usuario.email === undefined){
       this.usuarioError = true;
       usuario = false;
     }

      return usuario;
   }

   validarPass(): boolean{
     let pass = true ;
     let repass = true;
     if (this.usuario.pass === null || this.usuario.pass === undefined){
       this.passError = true;
       pass = false;
     }
     if (this.repass === null || this.repass === undefined){
        this.repassError = true;
        repass = false;
     }

     return (pass && repass);
   }

   validarNombre(): boolean{
      let nombre = true;
      if (this.perfil.nombre === null || this.perfil.nombre === undefined){
       this.nombreError = true;
       nombre = false;
     }
      return nombre;
   }

  validarApellido(): boolean {
    let apellido = true;
    if (this.perfil.apellido === null || this.perfil.apellido === undefined){
      this.apellidoError = true;
      apellido = false;
    }
    return apellido;
  }

  validarFecha(): boolean {
    let fecha = true;
    if (this.perfil.fechaNacimiento === null || this.perfil.fechaNacimiento === undefined){
      this.fechaDeNacimientoError = true;
      fecha = false;
    }
    return fecha;
  }

  validarSexo(): boolean {
    let sexo = true;
    if (this.perfil.sexo === null || this.perfil.sexo === undefined){
      this.sexoError = true;
      sexo = false;
    }
    return sexo;
  }

  validarFotos(): boolean {
     let primera = true ;
     let segunda = true ;
     if (this.perfil.img1 === null || this.perfil.img1 === undefined){
       this.primeraFotoError = true ;
       primera = false;
    }
     if (this.perfil.img2 === null || this.perfil.img2 === undefined){
      this.segundaFotoError = true;
      segunda = false;
    }
     return (primera && segunda);
  }

  validarEspecialidad(): boolean {
    let especialidad = true;
    if (this.seleccionados === null || this.seleccionados === undefined){
      this.especialidadError = true;
      especialidad = false;
    }
    return especialidad;
  }

  validarCaptcha(): boolean {
      let tk = true;
      if (this.token === null || this.token === undefined){
       this.captchaError = true;
       tk = false;
    }
      return tk;
  }

}
