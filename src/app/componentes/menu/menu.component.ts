import { Component, OnInit } from '@angular/core';
import {PerfilService} from '../../servicios/perfil.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

   usuario: string;
   perfil: string;
  solicitarTurno = false;
  carga = false;
  menu: Array<string> = [''];


  constructor(private pr: PerfilService) { }


  ngOnInit(): void {
   this.inicializador();
  }

   inicializador(): void {
     this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
     this.buscarPerfil(this.usuario);
   }

  buscarPerfil(user): void {
    this.pr.contadorPerfiles().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          if (user.uid === lista[i].uid) {
            this.perfil = lista[i].tipo;
          }
        }
      });
  }

  vista(valor: string): void{
    switch (valor){
      case 'solicitar':  this.menu[0] = 'S';  break;
      case 'carga' : this.menu[0] = 'C' ; break;
      case 'verificacion' : this.menu[0] = 'V' ; break;
      case 'altaAdmin' : this.menu[0] = 'AA' ; break;
      case 'listaTurnos': this.menu[0] = 'L'; break;
      case 'historial': this.menu[0] = 'H'; break;
    }

  }

  cargaHorarios(): void {
    this.carga = true;
  }


}
