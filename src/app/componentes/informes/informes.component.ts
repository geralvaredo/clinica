import {Component, OnInit} from '@angular/core';
import {PerfilService} from '../../servicios/perfil.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {TurnoService} from '../../servicios/turno.service';
import {Turno} from '../../clases/turno';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']

})
export class InformesComponent implements OnInit {

  listaHorarios: Array<any>;
  listaTurnos: Array<Turno>;


  constructor(private hr: PerfilService, private turnos: TurnoService) { }

  ngOnInit(): void {
    this.inicializar();
    this.traerHorarios();
    this.cargarListaDeTurnos();
  }

   inicializar(): void {
     this.listaHorarios = [];
     this.listaTurnos = [];
   }

  traerHorarios(): void {
    this.hr.contadorHorarios().subscribe(
      (lista : any) => {
        for (let i = 0; i < lista.length; i++) {
          this.listaHorarios.push(lista[i]);
        }
      })
  }

  cargarListaDeTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
              this.listaTurnos.push(lista[i]);
        }
      });
  }

  generarPDF(tabla,documento) {
    const DATA = document.getElementById(tabla);
    const doc = new jsPDF('p','pt','a4');
    const options = { background: 'white', scale: 3  };

    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${documento + new Date().toISOString()}.pdf`);
    });
  }



}
