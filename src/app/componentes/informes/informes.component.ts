import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PerfilService} from '../../servicios/perfil.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {TurnoService} from '../../servicios/turno.service';
import {Turno} from '../../clases/turno';
import {Especialidad} from '../../clases/especialidad';
import {Horario} from '../../clases/horario';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  listaPerfil: Array<any>;
  listaHorarios: Array<any>;
  listaTurnos: Array<Turno>;
  listaFechas: Array<any>;
  listaTurnosPorFecha: Array<any>;
  especialidad: any;
  contador: number;
  // columns : string [];
  data: MatTableDataSource<any>;
  dataEspecialidad: MatTableDataSource<any>;
  dataFechas: MatTableDataSource<any>;
  listaEspecialidad: Array<any>;
  listaDeEspecialidades: string[] =
    ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  displayedColumns = ['fecha', 'ingreso',  'nombre' , 'apellido' ];
  displayEspecialidad = ['especialidad', 'cantidad' ];
  displayFechas = ['fechas', 'cantidad' ];
  @ViewChild('pagina') paginator: MatPaginator;
  @ViewChild('pagina2') paginator2: MatPaginator;
  @ViewChild('pagina3') paginator3: MatPaginator;

  constructor(private hr: PerfilService, private turnos: TurnoService) { }

  ngOnInit(): void {
    this.listaEspecialidad = [];
    this.listaHorarios = [];
    this.listaTurnos = [];
    this.listaFechas = [];
    this.listaTurnosPorFecha = [];
    this.contador = 0;
    this.especialidad = '';
    this.traerHorarios();
    this.cargarListaDeTurnos();
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


  traerHorarios(): void {
    this.hr.contadorHorarios().subscribe(
      (lista : any) => {
        for (let i = 0; i < lista.length; i++) {
          this.listaHorarios.push(lista[i]);
        }
        this.generarListaHorarios();
      })

  }

  generarListaHorarios(): void {
    this.data = new MatTableDataSource(this.listaHorarios);
    this.data.paginator = this.paginator;
  }


  cargarListaDeTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
             if(lista[i].estado == 'ASIGNADO' || lista[i].estado == 'DISPONIBLE'){
              this.listaTurnos.push(lista[i]);
          }
        }
        this.filtrarTurnosPorEspecialidad();
        this.filtrarTurnosPorFecha();
      });

  }

  filtrarTurnosPorEspecialidad(): void {
    for (let i = 0; i < this.listaDeEspecialidades.length; i++) {
      for (let j = 0; j < this.listaTurnos.length; j++) {
        if(this.listaDeEspecialidades[i] == this.listaTurnos[j].especialidad){
          this.contador++;
        }
      }
      let especialidad = new Especialidad(i,this.listaDeEspecialidades[i]);
      especialidad.cantidad = this.contador;
      this.listaEspecialidad.push(especialidad);
      this.contador = 0;
    }
    this.dataEspecialidad = new MatTableDataSource(this.listaEspecialidad);
    this.dataEspecialidad.paginator = this.paginator2;
  }

  filtrarTurnosPorFecha(): void {
    for (let i = 0; i < this.listaTurnos.length; i++) {
       this.listaFechas.push(this.listaTurnos[i].fecha);
    }
    this.listaFechas = this.listaFechas.filter((thing, i, arr) => arr.findIndex(t => t === thing) === i);
    this.listaFechas.sort((b, a) => new Date(b.date1).getTime() - new Date(a.date1).getTime());
    this.listaTurnos.sort((b, a) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    for (let i = 0; i < this.listaFechas.length; i++) {
      for (let j = 0; j < this.listaTurnos.length; j++) {
        if(this.listaFechas[i] == this.listaTurnos[j].fecha){
          this.contador++;
        }
      }
       let horario = new Horario();
       horario.fecha = this.listaFechas[i];
       horario.cantidad = this.contador;
      this.listaTurnosPorFecha.push(horario);
      this.contador = 0;
    }
    this.dataFechas = new MatTableDataSource(this.listaTurnosPorFecha);
    this.dataFechas.paginator = this.paginator3;
    console.log(this.listaTurnosPorFecha);
  }

  filtrarCantidadTurnosPorMedicos(): void {

  }

  filtrarCantidadDiasDeMedicosTrabajados(): void {

  }


}
