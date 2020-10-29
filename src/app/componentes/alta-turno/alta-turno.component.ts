import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss']
})
export class AltaTurnoComponent implements OnInit {

  conoceProfesionalError: boolean;
  especialidadError: boolean;
  especialidad: string[] =
    ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  seleccionados: string [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  buscarTurnos(): void {

  }

}
