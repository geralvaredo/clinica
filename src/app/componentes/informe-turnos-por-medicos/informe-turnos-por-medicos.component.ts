import {Component, OnInit, ViewChild} from '@angular/core';
import {Turno} from '../../clases/turno';
import {MatTableDataSource} from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {MatPaginator} from '@angular/material/paginator';
import {TurnoService} from '../../servicios/turno.service';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-informe-turnos-por-medicos',
  templateUrl: './informe-turnos-por-medicos.component.html',
  styleUrls: ['./informe-turnos-por-medicos.component.scss']
})
export class InformeTurnosPorMedicosComponent implements OnInit {

  contador: number;
  listaTurnos : Array<Turno>;
  @ViewChild('pagina2') paginator2: MatPaginator;
  listaMedicos : Array<any>;
  listaMedicosCantidadTurnos: Map< any , any >;
  listaModificada : Array<any>;
  listaGenerica: Array<any>;
  dataTurnos: MatTableDataSource<any>;
  displayTurnos = ['medico', 'cantidad' ];
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
    this.listaMedicos = [];
    this.listaTurnos = [];
    this.listaModificada = [];
    this.listaGenerica = [];
    this.listaMedicosCantidadTurnos = new Map<any, any >();
    this.contador = 0;
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
        this.filtrarCantidadTurnosPorMedicos();
      });
  }

  filtrarCantidadTurnosPorMedicos(): void {
    for (let i = 0; i < this.listaTurnos.length; i++) {
      this.listaMedicos.push(this.listaTurnos[i].profesional.nombre + ' ' + this.listaTurnos[i].profesional.apellido);
    }
    //console.log(this.listaMedicos);
    this.listaMedicos = this.listaMedicos.filter((thing, i, arr) => arr.findIndex(t => t === thing) === i);
    //console.log(this.listaMedicos);
    for (let i = 0; i < this.listaMedicos.length; i++) {
      for (let j = 0; j < this.listaTurnos.length; j++) {
        if(this.listaMedicos[i] == (this.listaTurnos[j].profesional.nombre  + ' ' + this.listaTurnos[j].profesional.apellido)){
          this.contador++;
        }
      }
      //console.log(this.contador);
      this.listaMedicosCantidadTurnos.set(this.listaMedicos[i],this.contador);
      this.contador = 0;
    }
     let valor = 0;
    //this.listaModificada = JSON.parse(JSON.stringify(Array.from( this.listaMedicosCantidadTurnos.keys() )));
    for ( let [key , value] of  this.listaMedicosCantidadTurnos ) {
         this.listaModificada[valor] = {'clave': key , 'valor' : value};
         valor++;
    }
    //console.log(this.listaModificada);

    this.dataTurnos = new MatTableDataSource(this.listaModificada);
    this.dataTurnos.paginator = this.paginator2;
    this.ejeXMedico();
    this.ejeYCantidadTurnos();
  }

  ejeXMedico(){
    for (let i = 0; i < this.listaMedicos.length; i++) {
       //this.barChartLabels.push(this.listaMedicos[i]);
    }
    //console.log(this.barChartLabels);
  }

  ejeYCantidadTurnos(){
    let i = 0;
    for (let [key , value] of  this.listaMedicosCantidadTurnos) {
      this.listaGenerica[i] = { data: [value] , label: key };
      i++;
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
