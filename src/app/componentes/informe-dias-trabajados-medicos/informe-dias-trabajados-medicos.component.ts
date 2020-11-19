import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Turno} from '../../clases/turno';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {TurnoService} from '../../servicios/turno.service';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-informe-dias-trabajados-medicos',
  templateUrl: './informe-dias-trabajados-medicos.component.html',
  styleUrls: ['./informe-dias-trabajados-medicos.component.scss']
})
export class InformeDiasTrabajadosMedicosComponent implements OnInit {

  contador: number;
  listaFechaMedicos : Map<any , Set <any> >;
  listaDiasTrabajadosMedicos : Map < any , any > ;
  listaModificada : Array<any>;
  listaGenerica: Array<any>;
  listaMedicosFija : Set<any>;
  listaTurnos : Array<Turno>;
  @ViewChild('pagina2') paginator2: MatPaginator;
  dataMedicosDias: MatTableDataSource<any>;
  displayDias = ['medico', 'cantidad' ];
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
    this.listaFechaMedicos = new Map<any, Set <string> >();
    this.listaDiasTrabajadosMedicos = new Map<any, any>();
    this.listaTurnos = [];
    this.listaGenerica = [];
    this.listaMedicosFija = new Set<any>();
    this.listaModificada = [];
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
        this.filtrarCantidadDiasTrabajadosPorMedico();
      });
  }

  filtrarCantidadDiasTrabajadosPorMedico(): void {
    let lista;
    let valor = null;
    for (let i = 0; i < this.listaTurnos.length; i++) {
      if(!this.listaFechaMedicos.has(this.listaTurnos[i].fecha)) {
        lista = new Set();
      }else{
        lista = this.listaFechaMedicos.get(this.listaTurnos[i].fecha);
      }
      lista.add(this.listaTurnos[i].profesional.nombre + ' ' + this.listaTurnos[i].profesional.apellido);
      this.listaFechaMedicos.set(this.listaTurnos[i].fecha, lista);
    }
    // console.log(this.listaFechaMedicos);
    for ( let [key , value] of  this.listaFechaMedicos ) {
      for(let item of value.values()){
        if(this.listaDiasTrabajadosMedicos.has(item)){
          valor = this.listaDiasTrabajadosMedicos.get(item);
          valor++;
        }else{
          valor = 1;
        }
        this.listaDiasTrabajadosMedicos.set(item,valor);
      }
    }
    let i = 0;
    for ( let [key , value] of  this.listaDiasTrabajadosMedicos ) {
      this.listaModificada[i] = {'clave': key , 'valor' : value};
      i++;
    }
    // console.log( this.listaDiasTrabajadosMedicos);
    // console.log( this.listaModificada);
    this.dataMedicosDias = new MatTableDataSource(this.listaModificada);
    this.dataMedicosDias.paginator = this.paginator2;
    this.listaMedicos();
    this.ejeXMedico();
    this.ejeYCantidadDias();
  }

  ejeXMedico(){
    for (let i = 0; i < this.listaMedicos.length; i++) {
      this.barChartLabels.push(this.listaMedicos[i]);
    }
    //console.log(this.barChartLabels);
  }

  ejeYCantidadDias(){
    let i = 0;
    for (let [key , value] of  this.listaDiasTrabajadosMedicos) {
      this.listaGenerica[i] = { data: [value] , label: key };
      i++;
    }
    this.barChartData = this.listaGenerica;
  }

  listaMedicos(): void {
    for (let i = 0; i < this.listaTurnos.length; i++) {
      this.listaMedicosFija.add(this.listaTurnos[i].profesional.nombre + ' ' + this.listaTurnos[i].profesional.apellido);//this.barChartLabels.push(this.listaMedicos[i]);
    }
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
