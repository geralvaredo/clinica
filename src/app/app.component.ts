import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'clinicaUniversitaria';
  ruta ;

  constructor(router: Router) {
    router.events.subscribe((url: any) => {
      this.ruta = router.url;
    });
  }
  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  cabecera(): boolean{
    return this.ruta == '/principal' || this.ruta== '/solicitudTurno' || this.ruta == '/listaTurnos'
    || this.ruta == '/cargaHorarios' || this.ruta == '/validarEspecialidad' || this.ruta == '/altaAdministrador'
    || this.ruta  == '/historialTurnos' || this.ruta == '/informes' || this.ruta == '/busqueda';
  }


}
