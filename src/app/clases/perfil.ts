import {Pais} from './pais';

export abstract class Perfil  {
  uid: string;
  id: string;
  nombre: string;
  apellido: string;
  tipo: string;
  fechaNacimiento: string;
  nacionalidad: Pais;
  sexo: string ;
  fechaAlta: string;
  fechaBaja: string;
  img1: string;

}
