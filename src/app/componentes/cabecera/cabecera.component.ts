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

  usuario: string;
  img: string ;
  nombre: string;
  perfil: string ;

  constructor(public auth: AuthService , private foto: ImagenService , private pr: PerfilService ) { }

  ngOnInit(): void {
    this.traerUsuario();

  }

  fotoPerfil(): void {
    this.foto.getUpload('imagenes/' + this.img ).then(
      res => { this.perfil = res; }
    );
  }

 traerUsuario(): void{
     this.usuario = JSON.parse(this.auth.getStorage('usuario')).uid;
     this.pr.contadorPerfiles().subscribe(
      (lista: any) => {
        for (let i = 0; i < lista.length; i++) {
           if (this.usuario === lista[i].uid){
             this.img = lista[i].img1;
             this.nombre = lista[i].nombre;
             this.fotoPerfil();
           }

        }
      }
    );

 }


}
