import {Component, OnInit, ViewChild} from '@angular/core';
import {Turno} from '../../clases/turno';
import {MatTableDataSource} from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Horario} from '../../clases/horario';
import {MatPaginator} from '@angular/material/paginator';
import {TurnoService} from '../../servicios/turno.service';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-informe-turnos-por-dia',
  templateUrl: './informe-turnos-por-dia.component.html',
  styleUrls: ['./informe-turnos-por-dia.component.scss']
})
export class InformeTurnosPorDiaComponent implements OnInit {

  contador: number;
  listaTurnos : Array<Turno>;
  @ViewChild('pagina3') paginator3: MatPaginator;
  listaTurnosPorFecha: Array<Horario>;
  listaFechas: Array<any>;
  listaGenerica: Array<any>;
  dataFechas: MatTableDataSource<any>;
  displayFechas = ['fechas', 'cantidad' ];
  dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ];
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
    this.listaFechas = [];
    this.listaTurnos = [];
    this.listaGenerica = [];
    this.contador = 0;
    this.listaTurnosPorFecha = [];
    this.barChartLabels = [];
    this.barChartData = [];
    this.cargarListaDeTurnos();

  }

  cargarListaDeTurnos(): void {
    this.turnos.ultimoTurnoId().subscribe(
      (lista: Array<any>) => {
        for (let i = 0; i < lista.length; i++) {
          this.listaTurnos.push(lista[i]);
        }
        this.filtrarTurnosPorFecha();
      });
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
    this.listaTurnosPorFecha.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    //console.log(this.listaTurnosPorFecha);
    this.dataFechas = new MatTableDataSource(this.listaTurnosPorFecha);
    this.dataFechas.paginator = this.paginator3;
    // console.log(this.listaTurnosPorFecha);
    this.ejeXFecha();
    this.ejeYCantidadTurnos();
  }

  ejeXFecha(){
    for (let i = 0; i < this.listaTurnosPorFecha.length; i++) {
       // this.barChartLabels.push(this.listaTurnosPorFecha[i].fecha);
    }
    //console.log(this.barChartLabels);
  }

  ejeYCantidadTurnos(){
    for (let i = 0; i < this.listaTurnosPorFecha.length; i++) {
      this.listaGenerica[i] = { data: [this.listaTurnosPorFecha[i].cantidad] , label: this.listaTurnosPorFecha[i].fecha };
    }
    this.barChartData = this.listaGenerica;
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

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
