import { Rutina } from './Rutina';
import { Ejercicios } from './Ejercicios';
export interface RutinaEjercicio {
  id: number;
  idRutina: number;
  idEjercicio: number;
  Rutina: Rutina;
  Ejercicio: Ejercicios;
}


