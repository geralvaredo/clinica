import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../clases/usuario';
import {AuthService} from '../../servicios/auth.service';
import {Perfil} from '../../clases/perfil';
import {PerfilService} from '../../servicios/perfil.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  perfil = '';
  isLogin = 'principal';
  verification = 'verificacionCorreo';
  notLogin = 'error';
  errorLogin = 'ErrorOnlogin->';
  clinica = '../assets/clinica.jpeg';

  constructor(private auth: AuthService, private pr: PerfilService) {
  }

  ngOnInit(): void {
      this.usuario = new Usuario();
  }

  async onLogin(): Promise<void> {
    try {
      const logging = await this.auth.login(this.usuario);
      if (logging) {

         if (logging.emailVerified){
           this.auth.guardarEnStorage(logging);
           this.auth.redirect(this.isLogin);
         }
          else{
                this.auth.guardarEnStorage(logging);
                this.auth.sitioAnterior('login');
                this.auth.redirect(this.verification);
         }
      } else {
        this.auth.redirect(this.notLogin);
      }
    } catch (error) {
      console.log(this.errorLogin, error);
    }

  }

  admin(): void{
    this.usuario.email = 'admin@llubed.com';
    this.usuario.pass = 'admin123' ;
  }

  profe(){
    this.usuario.email = 'profe@llubed.com';
    this.usuario.pass = 'profe123' ;
  }

  paciente(){
    this.usuario.email = 'paciente@llubed.com';
    this.usuario.pass = 'pac123' ;
  }

}
