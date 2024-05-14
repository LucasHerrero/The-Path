export interface Ejercicios {
  id:            number;
  nombre:        string;
  musculo:       string;
  equipacion:    Equipacion;
  dificultad:    Dificultad;
  instrucciones: string;

  reps:          number | null;
  sets:          number | null;
  kg:            number | null;
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
