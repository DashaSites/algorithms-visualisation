// Тип объекта, который отрендерится в массиве объектов

import { ElementStates } from "./element-states";


export type CircleElement = { 
  value: string;
  state?: ElementStates;
};