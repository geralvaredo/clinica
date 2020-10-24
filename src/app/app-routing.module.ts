import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {RegistroComponent} from './componentes/registro/registro.component';
import {ErrorComponent} from './componentes/error/error.component';
import {BienvenidoComponent} from './componentes/bienvenido/bienvenido.component';
import {BusquedaComponent} from './componentes/busqueda/busqueda.component';
import {PeliculaAltaComponent} from './componentes/pelicula-alta/pelicula-alta.component';
import {ActorAltaComponent} from './componentes/actor-alta/actor-alta.component';
import {ActorListadoComponent} from './componentes/actor-listado/actor-listado.component';
import {PeliculaListadoComponent} from './componentes/pelicula-listado/pelicula-listado.component';

const routes: Routes = [
  {path: 'bienvenido' , component : BienvenidoComponent },
  {path: 'busqueda' , component : BusquedaComponent},
  {path: 'peliculas/alta' , component : PeliculaAltaComponent},
  {path: 'peliculas/listado' , component : PeliculaListadoComponent},
  {path: 'actor/alta' , component : ActorAltaComponent },
  {path: 'actor/listado' , component : ActorListadoComponent },
  {path: 'error', component : ErrorComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
