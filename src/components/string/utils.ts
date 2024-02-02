import React, { useState, useEffect } from "react";
import { ElementStates } from "../../types/element-states";

///// УНИВЕРСАЛЬНЫЕ (М.Б. В БУДУЩЕМ) ФУНКЦИИ:

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

// ЭТА ФУНКЦИЯ НЕ РАБОТАЕТ
// Меняю местами левый и правый индексы элементов массива, меняю цвета кружочков
const swap = (
  array: OutputElement[],
  leftIndex: number,
  rightIndex: number
): void => {
  const temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;

  array[leftIndex].state = ElementStates.Modified;
  array[rightIndex].state = ElementStates.Modified;

  const nextLeftIndex = leftIndex + 1;
  const nextRightIndex = rightIndex - 1;

  // !!! А ТУТ НАДО НАПИСАТЬ, ЧТО БУДЕТ С ЭЛЕМЕНТАМИ
  // ПОД ЭТИМИ ИНДЕКСАМИ nextLeftIndex И nextRightIndex!!!

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
export const useOutputElements = (
  inputedValues: string,
  isArrayReversed: boolean
): OutputElement[] => {
  // завожу пустой массив объектов, чтоб положить в него (перевернутую или нет) строку
  const [outputElements, setOutputElements] = useState<OutputElement[]>([]);

  const reverseString = async () => {
    const isArrayReversedBeforeClick = !isArrayReversed;

    // Если строка в инпуте уже была перевернута, то перевернуть ее в кружках тоже.
    // А если нет, то в кружки тоже вставить ее в изначальном виде
    console.log("isArrayReversedBeforeClick", isArrayReversedBeforeClick);
    console.log("inputedValues", JSON.stringify(inputedValues));

    const arrayOfStraightOrReversedInputs = isArrayReversedBeforeClick
      ? inputedValues.split("").reverse()
      : inputedValues.split("");

    console.log(
      "arrayOfStraightOrReversedInputs",
      JSON.stringify(arrayOfStraightOrReversedInputs)
    );

    // Определяем initialState (порядок букв и цвета кружков) на момент
    // первой загрузки кружков
    const outputElementsInitialState: OutputElement[] =
      getOutputElementsInitialState(arrayOfStraightOrReversedInputs);

    // сохраняю в стейт первоначальное состояние (буквы и цвета) кружков, когда они появляются
    setOutputElements(outputElementsInitialState);

    console.log("Initial State: ", JSON.stringify(outputElementsInitialState));
  };

  useEffect(() => {
    reverseString();
  }, [isArrayReversed]);

  useEffect(() => {
    const paintCircles = async () => {
      await delay(1000);

      console.log("paintCircles", new Date().toISOString());

      const leftPinkIndex = outputElements.findIndex((elem) => {
        return elem.state === ElementStates.Changing;
      });

      if (leftPinkIndex === -1) {
        return;
      }

      const rightPinkIndex = outputElements.length - 1 - leftPinkIndex;
      swap(outputElements, leftPinkIndex, rightPinkIndex);

      setOutputElements([...outputElements]);
      console.log("paintCirclesoutPutElements");
    };

    paintCircles();
  }, [outputElements]);


  return outputElements;
};

// Эта функция-промис может позже использоваться и для других алгоритмов
export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
