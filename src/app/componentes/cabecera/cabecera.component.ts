import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import {ImagenService} from '../../servicios/imagen.service';
import {PerfilService} from '../../servicios/perfil.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  usuario: any;
  img: string ;
  nombre: string;
  imagen: string;
  perfil: string ;
  carga = false;
  menu: Array<string> = [''];


  constructor(public auth: AuthService , private foto: ImagenService , private pr: PerfilService ) { }

  ngOnInit(): void {
    this.inicializador();

  }

  inicializador(): void {
    this.perfil = '';
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.buscarPerfil();
  }





  buscarPerfil(): void{
     this.pr.contadorPerfiles().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
           if (this.usuario.uid === lista[i].uid){
             this.img = lista[i].img1;
             this.nombre = lista[i].nombre;
             this.perfil = lista[i].tipo;
             this.fotoPerfil();
           }

        }
      }
    );

 }



  fotoPerfil(): void {
    this.foto.getUpload('imagenes/' + this.img ).then(
      res => { this.imagen = res; }
    );
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
