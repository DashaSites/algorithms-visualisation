import React, { useState, useEffect } from "react";
import { ElementStates } from "../../types/element-states";


///// УНИВЕРСАЛЬНЫЕ (М.Б. В БУДУЩЕМ) ФУНКЦИИ:

// Какого цвета кружки будут при их ПЕРВОНАЧАЛЬНОМ появлении:
const getOutputElementsInitialState = (someArray: string[]): OutputElement[] => {
  if (someArray.length < 1) { // если в передаваемом массиве 0 знаков
    return [];
  } else if (someArray.length === 1) { // если в массиве 1 знак
    return [{
      symbol: someArray[0],
      state: ElementStates.Modified
    }]
  } else { // если в массиве минимум 2 знака
    const initialStateArray = someArray.map((input, index) => ({
        symbol: input,
        state: index === 0 || index === someArray.length-1 ? ElementStates.Changing : ElementStates.Default
    }))
    return initialStateArray; 
    // [{symbol: input, state}, {symbol: input, state}, {symbol: input, state}...]
  } 
}


// ЭТА ФУНКЦИЯ НЕ РАБОТАЕТ
// Меняю местами левый и правый индексы элементов массива, меняю цвета кружочков
const swap = (array: OutputElement[], leftIndex: number, rightIndex: number) => {
  const temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;

  array[leftIndex].state = ElementStates.Modified // ЗДЕСЬ ПРОБЛЕМА!!! Uncaught (in promise) TypeError: Cannot set properties of undefined (setting 'state')
  array[rightIndex].state = ElementStates.Modified

  const nextLeftIndex = leftIndex + 1;
  const nextRightIndex = rightIndex - 1;

// !!! А ТУТ НАДО НАПИСАТЬ, ЧТО БУДЕТ С ЭЛЕМЕНТАМИ 
// ПОД ЭТИМИ ИНДЕКСАМИ nextLeftIndex И nextRightIndex!!!
  
  array[nextLeftIndex].state = ElementStates.Changing // ?
  array[nextRightIndex].state = ElementStates.Changing // ?
}

/////


export type OutputElement = {
  symbol: string,
  state: ElementStates
};

// Хук, который получает строку и возвращает массив объектов,
// в которых 1) строка развернута и 
// 2) каждой букве соответствует определенное состояние
export const useOutputElements = (inputedValues: string, isArrayReversed: boolean): OutputElement[] => {

// завожу пустой массив объектов, чтоб положить в него перевернутый аргумент
const [outputElements, setOutputElements] = useState<OutputElement[]>([]);

const reverseString = async () => {
  
  const isArrayReversedBeforeClick = !isArrayReversed;

  const arrayOfStraightOrReversedInputs = isArrayReversedBeforeClick ? inputedValues.split("").reverse() : inputedValues.split("");


  // Определяем initialState (буквы и цвет) на момент 
  // первоначального появления кружочков
  const outputElementsInitialState: OutputElement[] = getOutputElementsInitialState(arrayOfStraightOrReversedInputs);


  // сохраняю в стейт первоначальное состояние (буквы и цвета) кружков, когда они появляются
  setOutputElements(outputElementsInitialState);



  const middleIndex = Math.floor(arrayOfStraightOrReversedInputs.length/2 - 1);

  
  for (let leftElementIndex = 0; leftElementIndex <= middleIndex; leftElementIndex++) {

    await delay(1000);
    let leftElement = arrayOfStraightOrReversedInputs[leftElementIndex];
    let rightElementIndex = arrayOfStraightOrReversedInputs.length-1-leftElementIndex;

    // Когда выполнится промис с задержкой, выполнится swap двух букв:
    swap(outputElements, leftElementIndex, rightElementIndex);

    // И ЧТО ДАЛЬШЕ?!!!
    //setOutputElements(outputElementsInitialState);


  
    
  } 
}
  


  useEffect(() => {
    reverseString();
  }, [isArrayReversed]);

  return outputElements;
}


// Эта функция-промис может позже использоваться и для других алгоритмов
export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};




