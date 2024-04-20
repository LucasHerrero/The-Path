export interface Ejercicios {
  id:            number;
  nombre:        string;
  musculo:       string;
  equipacion:    Equipacion;
  dificultad:    Dificultad;
  instrucciones: string;
}

export enum Dificultad {
  Avanzado = "Avanzado",
  Principiante = "Principiante",
}

export enum Equipacion {
  Barra = "Barra",
  Mancuerna = "Mancuerna",
  Maquina = "Maquina",
}
