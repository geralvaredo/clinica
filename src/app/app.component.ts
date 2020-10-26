import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clinicaHospitalArgentino';
  ruta ;

  constructor(router: Router) {
    router.events.subscribe((url: any) => {
      this.ruta = router.url;
    });
  }
}
