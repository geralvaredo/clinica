import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './componentes/error/error.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment.prod';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { AltaPacProfAdminComponent } from './componentes/alta-pac-prof-admin/alta-pac-prof-admin.component';
import { AltaHorariosComponent } from './componentes/alta-horarios/alta-horarios.component';
import { AltaEspecialidadComponent } from './componentes/alta-especialidad/alta-especialidad.component';
import { AltaHistoriaClinicaComponent } from './componentes/alta-historia-clinica/alta-historia-clinica.component';
import { AltaEncuestaComponent } from './componentes/alta-encuesta/alta-encuesta.component';
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { BtnBorrarComponent } from './componentes/btn-borrar/btn-borrar.component';
import { BtnModificarComponent } from './componentes/btn-modificar/btn-modificar.component';
import { BtnDetalleComponent } from './componentes/btn-detalle/btn-detalle.component';
import { DetalleTurnoComponent } from './componentes/detalle-turno/detalle-turno.component';
import { DetalleHorarioComponent } from './componentes/detalle-horario/detalle-horario.component';
import { DetalleEncuestaComponent } from './componentes/detalle-encuesta/detalle-encuesta.component';
import { DetalleHistoriaClinicaComponent } from './componentes/detalle-historia-clinica/detalle-historia-clinica.component';
import { AtencionPacienteComponent } from './componentes/atencion-paciente/atencion-paciente.component';
import { VerificacionEspecialidadComponent } from './componentes/verificacion-especialidad/verificacion-especialidad.component';
import { VerificacionDeCorreoComponent } from './componentes/verificacion-de-correo/verificacion-de-correo.component';
import {BienvenidoComponent} from './componentes/bienvenido/bienvenido.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { MenuComponent } from './componentes/menu/menu.component';
import {MatCardModule} from '@angular/material/card';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    BusquedaComponent,
    AltaPacProfAdminComponent,
    AltaHorariosComponent,
    AltaEspecialidadComponent,
    AltaHistoriaClinicaComponent,
    AltaEncuestaComponent,
    AltaTurnoComponent,
    BtnBorrarComponent,
    BienvenidoComponent,
    BtnModificarComponent,
    BtnDetalleComponent,
    DetalleTurnoComponent,
    DetalleHorarioComponent,
    DetalleEncuestaComponent,
    DetalleHistoriaClinicaComponent,
    AtencionPacienteComponent,
    VerificacionEspecialidadComponent,
    VerificacionDeCorreoComponent,
    CabeceraComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
