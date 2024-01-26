import React, { useState, useEffect } from "react";


export const useReversedString = async (inputedValues: string): Promise<string[]> => {
// завожу пустой массив, чтоб положить в него перевернутый аргумент


const [outputArray, setOutputArray] = useState<string[]>([]);
  

  for (let i = 0; i <= inputedValues.length-1; i++) {

    outputArray[inputedValues.length - i - 1] = inputedValues[i];
    // на каждой итерации происходит пауза в 1000 мс
    setOutputArray(outputArray);
    await delay(1000);
    
  
  } 


  useEffect(() => {

  }, []);

  return outputArray;
}


export function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}




