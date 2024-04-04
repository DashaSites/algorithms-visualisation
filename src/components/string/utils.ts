import React, { useState, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../universal-functions/delay";
import { DELAY_IN_MS } from "../../constants/delays";


// Какого цвета кружки будут при их ПЕРВОНАЧАЛЬНОМ появлении:
const getOutputElementsInitialState = (
  someArray: string[]
): OutputElement[] => {
  if (someArray.length < 1) {
    // если в передаваемом массиве 0 знаков
    return [];
  } else if (someArray.length === 1) {
    // если в массиве 1 знак
    return [
      {
        symbol: someArray[0],
        state: ElementStates.Modified,
      },
    ];
  } else {
    // если в массиве минимум 2 знака
    const initialStateArray = someArray.map((input, index) => ({
      symbol: input,
      state: 
        index === 0 || index === someArray.length - 1
          ? ElementStates.Changing
          : ElementStates.Default,
    }));
    return initialStateArray;
    // [{symbol: input, state}, {symbol: input, state}, {symbol: input, state}...]
  }
};


// Меняю местами левый и правый индексы элементов массива, меняю цвета кружочков
const swap = (array: OutputElement[], leftIndex: number, rightIndex: number): void => {

  const temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;

  array[leftIndex].state = ElementStates.Modified;
  array[rightIndex].state = ElementStates.Modified;

  const nextLeftIndex = leftIndex + 1;
  const nextRightIndex = rightIndex - 1;

  // условие, чтобы перекрашивание в розовый не продолжилось и после того, как мы пересечем середину массива
  if (nextLeftIndex > nextRightIndex) {
    return;
  }

  array[nextLeftIndex].state = ElementStates.Changing;
  array[nextRightIndex].state = ElementStates.Changing;
};

/////

export type OutputElement = {
  symbol: string;
  state: ElementStates;
};

// Хук, который получает строку и возвращает массив объектов,
// в которых 1) строка развернута и
// 2) каждой букве соответствует определенное состояние
export const useOutputElements = (inputedValues: string, isArrayReversed: boolean): OutputElement[] => {
  // завожу пустой массив объектов, чтоб положить в него (перевернутую или нет) строку
  const [outputElements, setOutputElements] = useState<OutputElement[]>([]);

  
  const reverseString = () => {
    const isArrayReversedBeforeClick = !isArrayReversed;

    // Если строка в инпуте уже была перевернута до клика по кнопке "развернуть", 
    // то и в кружках она тоже сразу появится перевернутой.
    // А если она не была перевернута в инпуте до клика, 
    // то в кружках она сначала будет рендериться в прямом порядке
    const arrayOfStraightOrReversedInputs = isArrayReversedBeforeClick
      ? inputedValues.split("").reverse()
      : inputedValues.split("");


    // Определяем initialState (порядок букв и цвета кружков) на момент
    // первой загрузки кружков
    const outputElementsInitialState: OutputElement[] =
      getOutputElementsInitialState(arrayOfStraightOrReversedInputs);

    // сохраняю в стейт первоначальное состояние (буквы и цвета) кружков, когда они появляются
    setOutputElements(outputElementsInitialState);
  };

  useEffect(() => {
    reverseString();
  }, [isArrayReversed]);

  useEffect(() => {

    const paintCircles = async () => {

      
      // делаем паузу в секунду
      await delay(DELAY_IN_MS);
      // находим индекс левого розового элемента 
      const leftPinkIndex = outputElements.findIndex((elem) => {
        return elem.state === ElementStates.Changing;
      });
      // а если такого элемента в массиве нет, то выходим из функции
      if (leftPinkIndex === -1) {
        return;
      }
      // находим индекс правого розового элемента (он симметричен левому)
      const rightPinkIndex = outputElements.length - 1 - leftPinkIndex;

      swap(outputElements, leftPinkIndex, rightPinkIndex);
      
      // кладу в стейт новый массив, внутрь которого копирую прежний, видоизмененный через swap
      setOutputElements([...outputElements]);
    };

    paintCircles();

  }, [outputElements]);

  return outputElements;
};



///// СТРАДАНИЯ, ИЗ КОТОРЫХ Я СДЕЛАЛА ВАЖНЫЕ ВЫВОДЫ:
// 1) Стейт (здесь - outputElements) изменяется только через сеттер (setOutputElements)

// 2) В рамках одной функции лучше не вызывать сеттер больше одного раза (он срабатывает по сути асинхронно,
// то есть его вызов становится в очередь колбэков и ждет там завершения текущей функции, 
// и только потом попасть в колстэк и исполниться. 
// 3) Когда я возвращаю обновленный стейт в через сеттер, то если этот стейт - массив или объект, 
// то важно помещать его в скобки ([] или {}) и использовать спред-оператор - как в редьюсере!