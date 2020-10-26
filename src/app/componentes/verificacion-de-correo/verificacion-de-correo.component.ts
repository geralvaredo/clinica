import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verificacion-de-correo',
  templateUrl: './verificacion-de-correo.component.html',
  styleUrls: ['./verificacion-de-correo.component.scss']
})
export class VerificacionDeCorreoComponent implements OnInit {

  digitos: number;
  constructor() { }

  ngOnInit(): void {
     this.token();
  }

  token(): void{
     this.digitos = Math.floor( Math.random() * 9999 );
  }

}
