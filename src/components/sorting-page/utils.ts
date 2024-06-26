import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../universal-functions/delay";
import { ArrayElement } from "./sorting-page";



// Общая функция swap
const swap = (arr: ArrayElement[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};


// Сортировка выбором по возрастанию +
export const sortSelectionAscending = async (arr: ArrayElement[], setArr: (someArray: ArrayElement[]) => void): Promise<ArrayElement[]> => {
  const { length } = arr;
  
  for (let leftIndex = 0; leftIndex <= length - 1; leftIndex++) {
    let minInd = leftIndex;
    arr[minInd].state = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    
    for (let rightIndex = leftIndex + 1; rightIndex < length; rightIndex++) {
      arr[rightIndex].state = ElementStates.Changing;
      if (rightIndex > leftIndex + 1) {
        arr[rightIndex-1].state = ElementStates.Default;
      }
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      if (arr[rightIndex].value < arr[minInd].value) {
        minInd = rightIndex;
  
      }
    }

    swap(arr, leftIndex, minInd);

    arr[minInd].state = ElementStates.Default;
    arr[arr.length-1].state = ElementStates.Default;
    arr[leftIndex].state = ElementStates.Modified;
    setArr([...arr]);
  
    await delay(SHORT_DELAY_IN_MS);
  }

  setArr([...arr]);
  return arr;
};


// Сортировка выбором по убыванию +
export const sortSelectionDescending = async (arr: ArrayElement[], setArr: (someArray: ArrayElement[]) => void): Promise<ArrayElement[]> => {
  const { length } = arr;

  for (let i = 0; i <= length - 1; i++) {
    let maxInd = i;
    arr[maxInd].state = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      if (j > i + 1) {
        arr[j-1].state = ElementStates.Default;
      }
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      if (arr[j].value > arr[maxInd].value) {
        maxInd = j;
  
      }
    }

    swap(arr, i, maxInd);

    arr[maxInd].state = ElementStates.Default;
    arr[arr.length-1].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;

    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

  }

  setArr([...arr]);
  return arr;
};



// Сортировка пузырьком по возрастанию +
export const sortBubbleAscending = async (array: ArrayElement[], setArray: (someArray: ArrayElement[]) => void): Promise<ArrayElement[]> => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length-i-1; j++) {
      array[j].state = ElementStates.Changing;
      array[j+1].state = ElementStates.Changing;
      setArray([...array]);
      await delay(DELAY_IN_MS);

      if (array[j+1].value < array[j].value) {
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
      array[j].state = ElementStates.Default;
    }

    array[array.length-i-1].state = ElementStates.Modified;
    setArray([...array]);
  }

  return array;
}


// Сортировка пузырьком по убыванию
export const sortBubbleDescending = async (array: ArrayElement[], setArray: (someArray: ArrayElement[]) => void): Promise<ArrayElement[]> => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length-i-1; j++) {
      array[j].state = ElementStates.Changing;
      array[j+1].state = ElementStates.Changing;
      setArray([...array]);
      await delay(DELAY_IN_MS);

      if (array[j+1].value > array[j].value) {
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
      array[j].state = ElementStates.Default;
    }
    
    array[array.length-i-1].state = ElementStates.Modified;
    setArray([...array]);
  }
  return array;
}


