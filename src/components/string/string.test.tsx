import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";


type OutputElement = {
  symbol: string;
  state: ElementStates;
};

describe("Testing of a string inverting algorithm", () => {

  it("Is a string with even number of symbols inverted correctly", () => {
    // Arrange
    const initialString = "zevi";
    const expectedInvertedArrayWithoutCircles = "ivez".split(""); 
    // Эталонный ответ:
    const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));

    // Act
    // Проверяю алгоритм (этот алгоритм закапсулирован в методе .reverse):
    const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));

    // Assert
    // Проверяю, что алгоритм вернул результат, который совпадает с эталонным ответом:
    expect(actualOutputArray).toEqual(expectedOutputArray);
  });

  it("Is a string with odd number of symbols inverted correctly", () => { 
    // Arrange
    const initialString = "space";
    const expectedInvertedArrayWithoutCircles = "ecaps".split(""); 
    // Эталонный ответ:
    const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));

    // Act
    // Проверяю алгоритм (работу метода .reverse):
    const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));

    // Assert
    // Проверяю, что алгоритм вернул результат, который совпадает с эталонным ответом:
    expect(actualOutputArray).toEqual(expectedOutputArray);
  });

  it("Is a string with one symbol inverted correctly", async () => { 
    // Arrange
    const initialString = "s";
    const expectedInvertedArrayWithoutCircles = ["s"];
    // Эталонный ответ:
    const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));

    // Act
    // Проверяю алгоритм (метод .reverse):
    const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));

    // Assert
    // Проверяю, что алгоритм .reverse вернул результат, который совпадает с эталонным ответом:
    expect(actualOutputArray).toEqual(expectedOutputArray);
  });

  it("Is an empty string inverted correctly", async () => {
    // Arrange
    const initialString = "";
    const expectedInvertedArrayWithoutCircles: string[] = [];
    // Эталонный ответ:
    const expectedOutputArray: OutputElement[] = expectedInvertedArrayWithoutCircles.map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));
    
    // Act
    // Проверяю алгоритм (метод .reverse):
    const actualOutputArray: OutputElement[] = initialString.split("").reverse().map((element) => ({
      symbol: element,
      state: ElementStates.Modified
    }));
    
    // Assert
    // Проверяю, что .reverse вернул результат, который совпадает с эталонным ответом:
    expect(actualOutputArray).toEqual(expectedOutputArray);
  });
});