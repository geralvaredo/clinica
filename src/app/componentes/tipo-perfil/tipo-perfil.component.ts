import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-perfil',
  templateUrl: './tipo-perfil.component.html',
  styleUrls: ['./tipo-perfil.component.scss']
})
export class TipoPerfilComponent implements OnInit {

  tipoError: boolean;
  tipoPerfil: string;
  constructor() { }

  ngOnInit(): void {
  }


  onChange(e): void{

  }

}
