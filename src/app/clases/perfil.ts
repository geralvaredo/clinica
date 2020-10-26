import {Pais} from './pais';

export abstract class Perfil  {
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
  img2: string;
}
