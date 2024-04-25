import { Ejercicios } from "./Ejercicios";
import { Rutina } from "./Rutina";

export interface RutinaEjercicio {
  id:          number;
  idRutina:    number;
  idEjercicio: number;
  Rutina:      Rutina;
  Ejercicio:   Ejercicios;
}
