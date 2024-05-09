import { User } from "./User";

export interface Rutina {
  id:         number;
  nombre:     string;
  cantidadEj: number;
  Dia:        dia;
  userFk:     number;
  User:       User;
}

export enum dia {
  Lunes = "Lunes",
  Martes = "Martes",
  Miercoles = "Miercoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sabado = "Sabado",
  Domingo = "Domingo"
}
