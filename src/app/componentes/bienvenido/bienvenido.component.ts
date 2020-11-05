import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {

  ruta ;
  constructor(private router: Router) {
    router.events.subscribe((url: any) => {
      this.ruta = router.url;
    });
  }

  ngOnInit(): void {
  }



}
