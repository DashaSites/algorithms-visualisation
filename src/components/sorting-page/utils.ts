// + Общая функция swap
const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};


// + Сортировка выбором по возрастанию
export const sortSelectionAscending = (arr: number[]) => {
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
 
  return arr;
};


// + Сортировка выбором по убыванию
export const sortSelectionDescending = (arr: number[]) => {
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
 
  return arr;
};


// + Сортировка пузырьком по возрастанию
export const sortBubbleAscending = (array: number[]) => {
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
export const sortBubbleDescending = (array: number[]) => {
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


