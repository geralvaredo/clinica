import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from '../../clases/usuario';
import {AuthService} from '../../servicios/auth.service';
import {PerfilService} from '../../servicios/perfil.service';
import {Paciente} from '../../clases/paciente';
import {Profesional} from '../../clases/profesional';
import {Especialidad} from '../../clases/especialidad';
import {Imagen} from '../../clases/imagen';
import {ImagenService} from '../../servicios/imagen.service';
import {Administrador} from '../../clases/administrador';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  isRegistered = 'verificacionCorreo';
  @Input() altaAdmin = false;
  registerError = 'error';
  usuario: Usuario;
  img1: Imagen;
  img2: Imagen;
  fecha: Date;
  fechaHoy: Date;
  perfil: any;
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
  error: boolean;
  tipoPerfil: string;
  nombre: string;
  apellido: string;
  sexo: string;
  documento: string;
  token: string;
  repass: string;
  extensiones = [ 'jpg', 'jpeg', 'png' ];
  especialidad: string[] =
    ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  seleccionados: string [] = [];


  constructor(private auth: AuthService, private pr: PerfilService, private img: ImagenService) {
   this.fecha = new Date();
   this.fechaHoy = new Date();
  }

  ngOnInit(): void {
    this.restablecer();
    this.usuario = new Usuario();
    this.inicializar();
  }

  onChange(e): void{
    if (e.value === 'Profesional'){
      this.perfil = new Profesional();
    }else if (e.value === 'Paciente') {
      this.perfil = new Paciente();
    }
    else{
      this.perfil = new Administrador();
    }
  }

  fileChange(event): void {
     console.log(event.target);
     const extension = this.ValidarExtension(event.target.files.item(0).name);
     if (extension !== null){
      if (event.target.id === 'img1'){
        this.img1 = new Imagen(event.target.files.item(0));
        this.img1.extension = extension;
        this.img1.name = `${this.documento}-img1.${this.img1.extension}`;
      }
      else if (event.target.id === 'img2'){
        this.img2 = new Imagen(event.target.files.item(0));
        this.img2.extension = extension;
        this.img2.name = `${this.documento}-img2.${this.img2.extension}`;
      }
    }
    else{
       (event.target.id === 'img1') ? this.img1 = null :  this.img2 = null ;
      }
  }

  ValidarExtension(fileName: string): string{
    const separateFileName = fileName.split('.');
    const extension = separateFileName[separateFileName.length - 1];
    if ( this.extensiones.includes(extension)) {
      return extension;
    } else{
      return null;
    }
  }

  async onRegister(): Promise<void> {
    try {
        if (this.validarCampos()){
         const user = await this.auth.register(this.usuario);
         this.auth.sitioAnterior('registro');
         this.auth.guardarEnStorage(user);
         this.verificacionCreacionDePerfil(user);
         this.restablecer();
       }
    } catch (error) {
      console.log('ErrorOnRegister', error);
    }
  }

  public verificacionCreacionDePerfil(user): void {
    if (user) {
      this.verificacionDePerfil(user);
      this.crearFotos();
      this.fechasNacionalidad();
      this.pr.crearPerfil(this.perfil);
      this.auth.redirect(this.isRegistered);
    } else {
      this.auth.redirect(this.registerError);
    }
  }

  fechasNacionalidad(): void{
    this.perfil.nacionalidad = null;
    this.perfil.fechaBaja = null;
    this.perfil.fechaNacimiento = this.fecha;
    this.perfil.fechaAlta = ( new Date( this.fechaHoy.getFullYear(), this.fechaHoy.getMonth(), this.fechaHoy.getDay())).toLocaleDateString();

  }

  verificacionDePerfil(user): void {
    if (this.tipoPerfil === 'Paciente'){
       this.perfil.tipo = 'Paciente';
    }
    else if (this.tipoPerfil === 'Profesional'){
      this.perfil.tipo = 'Profesional';
      this.perfil.habilitado = user.emailVerified;
      this.cargaEspecialidad();
    }
    else{
      this.perfil.tipo = 'Administrador';
    }
    this.cargaDePerfil(user);
  }

  cargaDePerfil(user): void {
    this.perfil.id = this.documento;
    this.perfil.uid  = user.uid;
    this.perfil.nombre = this.nombre;
    this.perfil.apellido = this.apellido;
    this.perfil.sexo = this.sexo;
  }

  cargaEspecialidad(): void {
    for (let i = 0; i < this.seleccionados.length; i++) {
      this.perfil.especialidades.push(new Especialidad(i, this.seleccionados[i]));
    }
  }

  crearFotos(): void {
    this.perfil.img1 = this.img1.name;
    this.img.cargaImagenes(this.img1, this.img1.name);
    if (this.tipoPerfil === 'Paciente'){
      this.perfil.img2  = this.img2.name;
      this.img.cargaImagenes(this.img2, this.img2.name);

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
    this.documento = '';
  }

  resolved(token): void{
    this.token = token;
  }

   validarCampos(): boolean {
    this.error = false;
    let especialidad = true;
    if (this.tipoPerfil === 'Profesional'){
         especialidad = this.validarEspecialidad();
      }
    const usuario = this.validarUsuario();
    const pass = this.validarPass();
    const nombre = this.validarNombre();
    const apellido = this.validarApellido();
    const fecha = this.validarFecha();
    const sexo = this.validarSexo();
    const fotos = this.validarFotos();
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
      if (this.nombre === null || this.nombre === undefined){
       this.nombreError = true;
       nombre = false;
     }
      return nombre;
   }

  validarApellido(): boolean {
    let apellido = true;
    if (this.apellido === null || this.apellido === undefined){
      this.apellidoError = true;
      apellido = false;
    }
    return apellido;
  }

  validarFecha(): boolean {
    let fecha = true;
    if (this.fecha === null || this.fecha === undefined){
      this.fechaDeNacimientoError = true;
      fecha = false;
    }
    return fecha;
  }

  validarSexo(): boolean {
    let sexo = true;
    if (this.sexo === null || this.sexo === undefined){
      this.sexoError = true;
      sexo = false;
    }
    return sexo;
  }

  validarFotos(): boolean {
     let primera = true ;
     let segunda = true ;
     if (this.img1 === null || this.img1 === undefined){
       this.primeraFotoError = true ;
       primera = false;
    }
     if (this.tipoPerfil === 'Paciente'){
        if (this.img2 === null || this.img2 === undefined){
          this.segundaFotoError = true;
          segunda = false;
        }
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
