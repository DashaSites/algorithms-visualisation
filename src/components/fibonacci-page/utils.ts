// Итеративный вариант
// Функция принимает количество чисел
// и возвращает n чисел последовательности Фибоначчи

export const getFibonacciSequence = (n: number): number[] => {
  if (!n) { // если n равен 0 или андифайнду (NaN)
     return [];
  }

  let arr: number[] = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i -1])
  }
 return arr;
} 







//console.log(getFibonacciSequence(7));