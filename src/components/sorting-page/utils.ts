// Сортировка выбором по возрастанию
// ...




// Сортировка выбором по убыванию
const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const selectionSort = (arr: number[]) => {
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

const someArr = [4, 6, 3, 9];
console.log(selectionSort(someArr));






// Сортировка пузырьком по возрастанию
// ...



// Сортировка пузырьком по убыванию
// ...





