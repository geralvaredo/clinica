import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {RegistroComponent} from './componentes/registro/registro.component';
import {ErrorComponent} from './componentes/error/error.component';
import {BienvenidoComponent} from './componentes/bienvenido/bienvenido.component';
import {BusquedaComponent} from './componentes/busqueda/busqueda.component';
import {AuthGuard} from './servicios/auth.guard';
import {VerificacionDeCorreoComponent} from './componentes/verificacion-de-correo/verificacion-de-correo.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'bienvenido' , component : BienvenidoComponent, canActivate: [AuthGuard]},
  {path: 'busqueda' , component : BusquedaComponent},
  {path: 'error', component : ErrorComponent, canActivate: [AuthGuard]},
  {path: 'registro' , component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verificacionCorreo', component: VerificacionDeCorreoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
