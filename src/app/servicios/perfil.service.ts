import { Injectable } from '@angular/core';
import {Perfil} from '../clases/perfil';
import {FirestoreService} from './firestore.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private fs: FirestoreService) { }

  public crearPerfil(perfil: Perfil): void {
    perfil.nacionalidad = null;
    perfil.fechaAlta = Date.now();
    perfil.fechaBaja = null;
    this.fs.agregarDocumento(JSON.parse( JSON.stringify(perfil)), 'perfiles');
  }

  public obtenerPerfilPorId(id: number): any {
    return this.fs.obtenerUnDocumento('perfiles', id);
  }

  public obtenerPerfiles(): any {
    return this.fs.obtenerColeccion('perfiles');
  }

  public modificarPerfil(perfil: Perfil): any {
    return this.fs.modificarDocumento(perfil, 'perfiles');
  }

  public borrarPerfilId(id: string): any {
    return this.fs.borrarDocumento(id, 'perfiles');
  }

  public contadorPerfiles(): Observable<any> {
    return this.fs.obtenerTotalDocumentos('perfiles');
  }
}
