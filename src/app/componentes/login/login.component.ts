import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../clases/usuario';
import {AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  isLogin = 'bienvenido';
  notLogin = 'login';
  errorLogin = 'ErrorOnlogin->';

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {

  }

  async onLogin(): Promise<void> {
    try {
      const logging = await this.auth.login(this.usuario);
      if (logging) {
        this.auth.redirect(this.isLogin);
      } else {
        this.auth.redirect(this.notLogin);
      }
    } catch (error) {
      console.log(this.errorLogin, error);
    }

  }

}
