import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Especialidad} from '../../clases/especialidad';
import {Turno} from '../../clases/turno';
import {MatPaginator} from '@angular/material/paginator';
import {TurnoService} from '../../servicios/turno.service';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Horario} from '../../clases/horario';

@Component({
  selector: 'app-informe-especialidad',
  templateUrl: './informe-especialidad.component.html',
  styleUrls: ['./informe-especialidad.component.scss']
})
export class InformeEspecialidadComponent implements OnInit {

  contador: number;
  listaTurnos : Array<Turno>;
  @ViewChild('pagina2') paginator2: MatPaginator;
  dataEspecialidad: MatTableDataSource<any>;
  listaEspecialidad: Array<any>;
  listaGenerica : Array<any>;
  especialidad: any;
  listaDeEspecialidades: string[] =
    ['Cardiologia', 'Radiologia', 'Traumatologia', 'Oftalmologia' , 'Neurologia' , 'Alergista' , 'Enfermeria'];
  displayEspecialidad = ['especialidad', 'cantidad' ];
  public barChartLabels: Label [] ;
  public barChartData: ChartDataSets[] ;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [ChartDataLabels];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  constructor(private turnos: TurnoService) { }

  ngOnInit(): void {
    this.listaEspecialidad = [];
    this.especialidad = '';
    this.listaTurnos = [];
    this.barChartLabels = [];
    this.barChartData = [];
    this.listaGenerica = [];
    this.contador = 0;
    this.cargarListaDeTurnos();
  }

  cargarListaDeTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          this.listaTurnos.push(lista[i]);
        }
        this.filtrarTurnosPorEspecialidad();
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
   // console.log(this.listaEspecialidad);
    this.dataEspecialidad = new MatTableDataSource(this.listaEspecialidad);
    this.dataEspecialidad.paginator = this.paginator2;
    this.ejeXEspecialidad();
    this.ejeYCantidadTurnos();
  }


  ejeXEspecialidad(){
    for (let i = 0; i < this.listaDeEspecialidades.length; i++) {
      //this.barChartLabels.push(this.listaDeEspecialidades[i]);
    }
   //console.log(this.barChartLabels);
  }

  ejeYCantidadTurnos(){
    for (let i = 0; i < this.listaEspecialidad.length; i++) {
      this.listaGenerica[i] = { data: [this.listaEspecialidad[i].cantidad] , label: this.listaEspecialidad[i].nombre};
    }
    this.barChartData = this.listaGenerica;
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  generarPDF(tabla,documento) {
    const element = document.getElementById(tabla);
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      var doc = new jsPDF('p','pt','a4');
      const img = canvas.toDataURL('image/PNG');
      const pdfHeight = (canvas.height * 500) / canvas.width;
      doc.addImage(img,0,0, 500, pdfHeight);
      return doc;
    }).then((docResult) => {
      docResult.save(`${documento + new Date().toISOString()}.pdf`);
    });
  }

}
