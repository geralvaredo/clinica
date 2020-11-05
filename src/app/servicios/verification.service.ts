import { Injectable } from '@angular/core';
import {Turno} from '../clases/turno';
import {FirestoreService} from './firestore.service';
import {Profesional} from '../clases/profesional';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private fs: FirestoreService) { }

  public modificarEspecialista(profe: Profesional){
    this.fs.modificarDocumento(profe, 'perfiles');
  }


}
