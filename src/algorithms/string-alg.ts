// console.log("start")

// // ПЕРЕПИСАТЬ АЛГОРИТМ ТАК, ЧТОБЫ ОН ПРИНИМАЛ МАССИВ

// export const reverseString = (inputedValues: string[]): string[] => {
//   // завожу пустой массив, чтоб положить в него перевернутый аргумент
    
//   const outputArray: string[] = [];
  
//     for (let i = 0; i <= inputedValues.length-1; i++) {
  
//       outputArray[inputedValues.length - i - 1] = inputedValues[i];
    
//     } 
  
//   return outputArray;
//   }

//   console.log(reverseString(["dasha"]))











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

// console.log(reverseString("dasha"))


// console.log("finish")



