// АЛГОРИМТ ПРИНИМАЕТ СТРОКУ, А НЕ МАССИВ: ПЕРЕДЕЛАТЬ

export const reverseString = (inputedValues: string): string[] => {
// завожу пустой массив, чтоб положить в него перевернутый аргумент
  
const outputArray: string[] = [];

  for (let i = 0; i <= inputedValues.length-1; i++) {

    outputArray[inputedValues.length - i - 1] = inputedValues[i];
  
  } 

  return outputArray;
}




