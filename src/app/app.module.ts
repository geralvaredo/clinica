import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './componentes/error/error.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MomentDateModule} from '@angular/material-moment-adapter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import { TipoPerfilComponent } from './componentes/tipo-perfil/tipo-perfil.component';
import { HistorialTurnosComponent } from './componentes/historial-turnos/historial-turnos.component';
import { InformesComponent } from './componentes/informes/informes.component';
import {MatTableExporterModule} from 'mat-table-exporter';
import { InformeLoginComponent } from './componentes/informe-login/informe-login.component';
import { InformeEspecialidadComponent } from './componentes/informe-especialidad/informe-especialidad.component';
import { InformeTurnosPorDiaComponent } from './componentes/informe-turnos-por-dia/informe-turnos-por-dia.component';
import { InformeTurnosPorMedicosComponent } from './componentes/informe-turnos-por-medicos/informe-turnos-por-medicos.component';
import { InformeDiasTrabajadosMedicosComponent } from './componentes/informe-dias-trabajados-medicos/informe-dias-trabajados-medicos.component';
import { ChartsModule } from 'ng2-charts';
import { DetalleBusquedaComponent } from './componentes/detalle-busqueda/detalle-busqueda.component';
import { DetalleBusquedaTurnoComponent } from './componentes/detalle-busqueda-turno/detalle-busqueda-turno.component';
import {MatDividerModule} from '@angular/material/divider';
import { ColorBusquedaDirective } from './directivas/color-busqueda.directive';
import { ImagenDirective } from './directivas/imagen.directive';
import { BusquedaInformacionPipe } from './pipes/busqueda-informacion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    BusquedaComponent,
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
    MenuComponent,
    AltaAdminComponent,
    TipoPerfilComponent,
    HistorialTurnosComponent,
    InformesComponent,
    InformeLoginComponent,
    InformeEspecialidadComponent,
    InformeTurnosPorDiaComponent,
    InformeTurnosPorMedicosComponent,
    InformeDiasTrabajadosMedicosComponent,
    DetalleBusquedaComponent,
    DetalleBusquedaTurnoComponent,
    ColorBusquedaDirective,
    ImagenDirective,
    BusquedaInformacionPipe
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
    RecaptchaFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MomentDateModule,
    NgxMaterialTimepickerModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSortModule,
    MatTableExporterModule,
    ChartsModule,
    MatDividerModule
  ],
  providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [LOCALE_ID] , useValue: 'es' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
