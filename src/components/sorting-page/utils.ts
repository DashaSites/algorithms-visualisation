import { ElementStates } from "../../types/element-states";
import { delay } from "../../universal-functions/delay";



type ArrayElement = {
  value: number;
  state?: ElementStates;
};

// + Общая функция swap
const swap = (arr: ArrayElement[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};


// + Сортировка выбором по возрастанию
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
    console.log("array before swap", arr)

    swap(arr, leftIndex, minInd);
    console.log("array after swap", arr)
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


