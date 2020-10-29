import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.inicializador();
  }

  inicializador(): void {
    this.error = JSON.parse(this.auth.getErrorLocalStorage('error'));
  }


}
