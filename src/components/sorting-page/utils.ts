import { ElementStates } from "../../types/element-states";
import { delay } from "../../universal-functions/delay";
import { ArrayElement } from "./sorting-page";



// Общая функция swap
const swap = (arr: ArrayElement[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};


// Сортировка выбором по возрастанию
export const sortSelectionAscending = async (arr: ArrayElement[], setArr: React.Dispatch<React.SetStateAction<ArrayElement[]>>): Promise<ArrayElement[]> => {
  const { length } = arr;
  
  for (let leftIndex = 0; leftIndex <= length - 1; leftIndex++) {
    let minInd = leftIndex;
    arr[minInd].state = ElementStates.Changing;
    setArr([...arr]);
    await delay(1000)
    
    for (let rightIndex = leftIndex + 1; rightIndex < length; rightIndex++) {
      arr[rightIndex].state = ElementStates.Changing;
      if (rightIndex > leftIndex + 1) {
        arr[rightIndex-1].state = ElementStates.Default;
      }
      setArr([...arr]);
      await delay(1000)

      if (arr[rightIndex].value < arr[minInd].value) {
        minInd = rightIndex;
        console.log("newMinInd", minInd)
      }
    }

    swap(arr, leftIndex, minInd);

    arr[minInd].state = ElementStates.Default;
    arr[arr.length-1].state = ElementStates.Default;
    arr[leftIndex].state = ElementStates.Modified;
    setArr([...arr]);
  
    await delay(1000)
  }

console.log(`отсортированный выбором по возрастанию: ${arr}`);
  setArr([...arr]);
  return arr;
};


// Сортировка выбором по убыванию
export const sortSelectionDescending = async (arr: ArrayElement[], setArr: React.Dispatch<React.SetStateAction<ArrayElement[]>>): Promise<ArrayElement[]> => {
  const { length } = arr;

  for (let i = 0; i <= length - 1; i++) {
    let maxInd = i;
    arr[maxInd].state = ElementStates.Changing;
    setArr([...arr]);
    await delay(1000)

    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      if (j > i + 1) {
        arr[j-1].state = ElementStates.Default;
      }
      setArr([...arr]);
      await delay(1000)

      if (arr[j].value > arr[maxInd].value) {
        maxInd = j;
        console.log("newMaxInd", maxInd)
      }
    }

    swap(arr, i, maxInd);

    arr[maxInd].state = ElementStates.Default;
    arr[arr.length-1].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;

    setArr([...arr]);
    await delay(1000)

  }
  console.log(`отсортированный выбором по убыванию: ${arr}`);
  setArr([...arr]);
  return arr;
};



// Сортировка пузырьком по возрастанию
export const sortBubbleAscending = async (array: ArrayElement[], setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>): Promise<ArrayElement[]> => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length-i-1; j++) {
      array[j].state = ElementStates.Changing;
      array[j+1].state = ElementStates.Changing;
      setArray([...array]);
      await delay(1000)

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
export const sortBubbleDescending = async (array: ArrayElement[], setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>): Promise<ArrayElement[]> => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length-i-1; j++) {
      array[j].state = ElementStates.Changing;
      array[j+1].state = ElementStates.Changing;
      setArray([...array]);
      await delay(1000)

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


