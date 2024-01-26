// ПЕРЕПИСАТЬ АЛГОРИТМ ТАК, ЧТОБЫ ОН ПРИНИМАЛ МАССИВ

export const reverseString = (inputedString: string): string => {
  // завожу массив, чтоб положить в него перевернутую строку, 
  // тк тайпскрипт не позволяет изменять данные типа "строка"
  const outputedStringInArray: string[] = [];

  for (let i = 0; i <= inputedString.length-1; i++) {

    outputedStringInArray[inputedString.length - i - 1] = inputedString[i];
  
  } 
// привожу итоговый массив к строке, тк моя функция должна возвращать строку
return outputedStringInArray.join("");
}