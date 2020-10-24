import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../clases/usuario';
import {AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  isRegistered = 'bienvenido';
  registerError = 'error';
  usuario = new Usuario();

  constructor(private auth: AuthService, router: Router) {
  }

  ngOnInit(): void {
  }


  async onRegister(): Promise<void> {
    try {
      const user = await this.auth.register(this.usuario);
      if (user) {
        this.auth.redirect(this.isRegistered);
      } else {
        this.auth.redirect(this.registerError);
      }
    } catch (error) {
      console.log('ErrorOnRegister', error);
    }
  }


}
