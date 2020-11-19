import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {PerfilService} from '../../servicios/perfil.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import ChartDataLabels  from 'chartjs-plugin-datalabels';
import {Horario} from '../../clases/horario';

@Component({
  selector: 'app-informe-login',
  templateUrl: './informe-login.component.html',
  styleUrls: ['./informe-login.component.scss']
})
export class InformeLoginComponent implements OnInit {

  fecha : string ;
  listaHorarios: Array<any>;
  data: MatTableDataSource<any>;
  fechas: Set<any> ;
  fechasYhoras : Map<any , Set<any> >;
  dataFechas: Map< any , Set<any> >;
  horaGrafico: Array <any>;
  displayedColumns = ['fecha', 'ingreso',  'nombre' , 'apellido' ];
  @ViewChild('pagina') paginator: MatPaginator;
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

  //public barChartLabels: Label [] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  /*public barChartData: ChartDataSets[] = [
    { data: [10, 11], label: 'Series A' },
    { data: [12], label: 'Series B'},
    { data: [13, 14], label: 'Series C' },
    { data: [15], label: 'Series D' },
    { data: [16, 17], label: 'Series E' }
  ];*/


  constructor(private hr: PerfilService) { }

  ngOnInit(): void {
    this.inicializarVariables();
    this.traerHorarios();
  }


  inicializarVariables():void {
    this.listaHorarios = [];
    this.barChartLabels = [];
    this.barChartData = [];
    this.horaGrafico= [];
    this.fechas = new Set<any>();
    this.dataFechas = new Map<any, Set<any>>();
    this.fechasYhoras = new Map<any, Set<any> >();
  }

  traerHorarios(): void {
    this.hr.contadorHorarios().subscribe(
      (lista : any) => {
        for (let i = 0; i < lista.length; i++) {
          this.listaHorarios.push(lista[i]);
        }
        this.generarListaHorarios();
      });
  }

  generarListaHorarios(): void {
     this.data = new MatTableDataSource(this.listaHorarios);
    this.data.paginator = this.paginator;
    this.ejeXFechas();
    this.ejeYHorario();
  }

  ejeXFechas(){
    for (let i = 0; i < this.listaHorarios.length; i++) {
      this.fechas.add(this.listaHorarios[i].fecha);
    }
    for (var item of Array.from(this.fechas.values())){
      this.barChartLabels.push(item);
    }
}

 ejeYHorario(){
   let lista ;
   let set ;
   let listaSet;
   for (let i = 0; i < this.listaHorarios.length; i++) {
     if(!this.fechasYhoras.has(this.listaHorarios[i].fecha)){
         set = new Set();
     }else{
       set = this.fechasYhoras.get(this.listaHorarios[i].fecha);
     }
     lista = new Horario();
     lista.id = this.listaHorarios[i].id;
     lista.apellido = this.listaHorarios[i].apellido;
     lista.nombre = this.listaHorarios[i].nombre;
     set.add(lista);
     this.fechasYhoras.set(this.listaHorarios[i].fecha, set);
   }
     for ( let [key , value] of  this.fechasYhoras ) {
       for (let item of value.values()) {
         if(!this.dataFechas.has(item.apellido)){
           listaSet = new Set();
         }else{
           listaSet = this.dataFechas.get(item.apellido);
         }

         listaSet.add(parseInt(item.id));
         this.dataFechas.set(item.apellido,listaSet);
       }
     }
   let i = 0;
   for ( let [key , value ] of  this.dataFechas ) {
      //console.log(Array.from(value.values()));
     this.horaGrafico[i] = {  data: Array.from(value.values()) , label: key  };
      i++;
   }
    this.barChartData = this.horaGrafico;
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

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }





}
