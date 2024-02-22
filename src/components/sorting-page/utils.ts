import { ElementStates } from "../../types/element-states";


type ArrayElement = {
  value: number;
  state: ElementStates;
};

// + Общая функция swap
const swap = (arr: ArrayElement[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};


// + Сортировка выбором по возрастанию
export const sortSelectionAscending = (arr: ArrayElement[]) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let minInd = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[minInd]) {
        minInd = j;
      }
    }
    swap(arr, i, minInd);
  }
console.log(`отсортированный выбором по возрастанию: ${arr}`);
  return arr;
};


// + Сортировка выбором по убыванию
export const sortSelectionDescending = (arr: ArrayElement[]) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[j] > arr[maxInd]) {
        maxInd = j;
      }
    }
    swap(arr, i, maxInd);
  }
  console.log(`отсортированный выбором по убыванию: ${arr}`);
  return arr;
};


// + Сортировка пузырьком по возрастанию
export const sortBubbleAscending = (array: ArrayElement[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j+1] < array[j]) {
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
  return array;

}


// + Сортировка пузырьком по убыванию
export const sortBubbleDescending = (array: ArrayElement[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j+1] > array[j]) {
        
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;

      }
    }
  }
  return array;
}


