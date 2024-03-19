import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useOutputElements } from "./utils";



type OutputElement = {
  symbol: string;
  state: ElementStates;
};

    // ПЛАН:
    // Положить в initialString строку с ... числом букв;
    // В invertedArray положить массив, а внутрь ту же строку, но перевернутую;
    // Вызвать функцию-алгоритм и положить в переменную factual результат ее работы
    // Проверить c помощью метода toEqual, что expect(factual) 
    // возвращает результат, который совпадает с эталонным ответом.

    // ПРОБЛЕМА: НАДО КАКИМ-ТО ОБРАЗОМ ПЕРЕДАТЬ СЮДА ФУНКЦИИ setInputValue и setIsArrayReversed!!!


describe("Testing of a string inverting algorithm", () => {

  it("Is a string with even number of symbols inverted correctly", () => {
    // Arrange
    const initialString = "zevi";
    const expectedInvertedArrayWithoutCircles = "ivez".split(""); 
    const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({ // Эталонный ответ
      symbol: element,
      state: ElementStates.Modified
    }));

    // Act
    // Ждем результата выполнения асинхронной функции
    const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));

    // Assert
    // Проверяем, что алгоритм возвращает результат, который совпадает с эталонным ответом
    expect(actualOutputArray).toEqual(expectedOutputArray);
  });



  it("Is a string with odd number of symbols inverted correctly", () => { 
    // Arrange
    const initialString = "space";
    const expectedInvertedArrayWithoutCircles = "ecaps".split(""); 
    const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({ // Эталонный ответ
      symbol: element,
      state: ElementStates.Modified
    }));

    const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));


    // Assert
    // Проверяем, что алгоритм возвращает результат, который совпадает с эталонным ответом
    expect(actualOutputArray).toEqual(expectedOutputArray);
  });



  it("Is a string with one symbol inverted correctly", async () => { 
    // Arrange
    const initialString = "s";
    const expectedInvertedArrayWithoutCircles = ["s"];
    const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({ // Эталонный ответ
      symbol: element,
      state: ElementStates.Modified
    }));

    const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));


    // Assert
    // Проверяем, что алгоритм возвращает результат, который совпадает с эталонным ответом
    expect(actualOutputArray).toEqual(expectedOutputArray);
  });



  it("Is an empty string inverted correctly", async () => {
        // Arrange
        const initialString = "";
        const expectedInvertedArrayWithoutCircles: string[] = [];
        const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({ // Эталонный ответ
          symbol: element,
          state: ElementStates.Modified
        }));
    
        const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
          symbol: element,
          state: ElementStates.Modified
        }));
    
    
        // Assert
        // Проверяем, что алгоритм возвращает результат, который совпадает с эталонным ответом
        expect(actualOutputArray).toEqual(expectedOutputArray);

  });

});