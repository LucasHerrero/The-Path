import { User } from "./User";

export interface Rutina {
  id:         number;
  nombre:     string;
  cantidadEj: number;
  userFk:     number;
  User:       User;
}
