import { Pipe, PipeTransform } from '@angular/core';
import {Turno} from '../clases/turno';

@Pipe({
  name: 'busquedaInformacion'
})
export class BusquedaInformacionPipe implements PipeTransform {


  transform( lista : Array<Turno> ,valor : string, ...args: unknown[]): Array<any> {
    return lista.filter(turno => turno.fecha == valor ||
                                 turno.paciente.apellido == valor ||
                                 turno.paciente.nombre == valor ||
                                 turno.profesional.apellido.toLowerCase().indexOf(valor) > -1 ||
                                 turno.profesional.nombre.toLowerCase().indexOf(valor) > -1  ||
                                 turno.especialidad.indexOf(valor[0]) > -1 ||
                                 turno.historiaClinica.edad.toLowerCase().indexOf(valor) > -1 ||
                                 turno.historiaClinica.temperatura.toLowerCase().indexOf(valor) > -1 ||
                                 turno.historiaClinica.presion.indexOf(valor) > -1 ||
                                 turno.historiaClinica.primeraObservacion.indexOf(valor) > -1 ||
                                 turno.historiaClinica.segundaObservacion.indexOf(valor) > -1 ||
                                 turno.historiaClinica.terceraObservacion.indexOf(valor) > -1
     );

  }

}
