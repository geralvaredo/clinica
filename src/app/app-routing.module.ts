import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {RegistroComponent} from './componentes/registro/registro.component';
import {ErrorComponent} from './componentes/error/error.component';
import {BusquedaComponent} from './componentes/busqueda/busqueda.component';
import {AuthGuard} from './servicios/auth.guard';
import {VerificacionDeCorreoComponent} from './componentes/verificacion-de-correo/verificacion-de-correo.component';
import {AltaTurnoComponent} from './componentes/alta-turno/alta-turno.component';
import {AltaAdminComponent} from './componentes/alta-admin/alta-admin.component';
import {VerificacionEspecialidadComponent} from './componentes/verificacion-especialidad/verificacion-especialidad.component';
import {DetalleTurnoComponent} from './componentes/detalle-turno/detalle-turno.component';
import {BienvenidoComponent} from './componentes/bienvenido/bienvenido.component';
import {AltaHorariosComponent} from './componentes/alta-horarios/alta-horarios.component';
import {HistorialTurnosComponent} from './componentes/historial-turnos/historial-turnos.component';
import {InformesComponent} from './componentes/informes/informes.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
   {path: 'principal' , component : BienvenidoComponent, canActivate: [AuthGuard]},
  {path: 'busqueda' , component : BusquedaComponent , canActivate: [AuthGuard] },
  {path: 'error', component : ErrorComponent},
  {path: 'registro' , component: RegistroComponent ,  data: {animation: 'registro'}},
  {path: 'altaAdministrador' , component: AltaAdminComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent, data: {animation: 'login'}  },
  {path: 'verificacionCorreo', component: VerificacionDeCorreoComponent , canActivate: [AuthGuard]},
  {path: 'verificacion', component: VerificacionEspecialidadComponent , canActivate: [AuthGuard]},
  {path: 'solicitudTurno', component: AltaTurnoComponent, canActivate: [AuthGuard]},
  {path: 'listaTurnos', component: DetalleTurnoComponent , canActivate: [AuthGuard]},
  {path: 'validarEspecialidad', component: VerificacionEspecialidadComponent , canActivate: [AuthGuard]},
  {path: 'cargaHorarios', component: AltaHorariosComponent , canActivate: [AuthGuard]},
  {path: 'historialTurnos', component: HistorialTurnosComponent , canActivate: [AuthGuard]},
  {path: 'informes', component: InformesComponent , canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
