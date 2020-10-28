import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import {Observable, observable, of} from 'rxjs';
import {PerfilService} from '../../servicios/perfil.service';

@Component({
  selector: 'app-verificacion-de-correo',
  templateUrl: './verificacion-de-correo.component.html',
  styleUrls: ['./verificacion-de-correo.component.scss']
})
export class VerificacionDeCorreoComponent implements OnInit {

  sitioAnterior: string;
  perfil: string;
  usuario: any;

  constructor(private auth: AuthService, private pr: PerfilService) { }


  ngOnInit(): void {
    this.inicializador();
  }

  login(): void {
    this.auth.redirect('login');
    this.auth.limpiarStorage();
  }


  buscarPerfil(user): void {
    this.pr.contadorPerfiles().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if (user.uid === lista[i].uid ){
            this.perfil = lista[i].tipo;
            this.profesionales();
          }
        }
      }) ;

  }

  inicializador(): void {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.buscarPerfil(this.usuario);
    this.sitioAnterior = JSON.parse(this.auth.getLocalStorage('sitio'));
  }

  profesionales(): void{
    if (this.perfil === 'Profesional'  && this.sitioAnterior === 'login'){
      this.auth.sitioAnterior('verificacionCorreo');
      this.auth.redirect('bienvenido');
    }
  }


}



