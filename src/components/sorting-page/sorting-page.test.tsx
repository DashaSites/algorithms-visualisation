import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { sortSelectionAscending } from "./utils";


export type ArrayElement = {
  value: number;
  state?: ElementStates;
};



describe("Testing of the bubble sort and selection sort algorithms", () => {
  
  // +
  it("Does selection sort ascending algorithm work with array of several elements", async () => {
    // Arrange
    const randomlyGeneratedArray = [5, 7, 4, 9, 8];
    const randomlyGeneratedArrayWithCircles = randomlyGeneratedArray.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    
    const expectedSortedArrayWithoutCircles = [4, 5, 7, 8, 9]; 
    // Эталонный ответ:
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   

    // Моковая функция
    const setArrFunction = jest.fn();


    // Act
    // Проверяю алгоритм sortSelectionAscending:
    const actualOutputArray: ArrayElement[] = await sortSelectionAscending(randomlyGeneratedArrayWithCircles, setArrFunction);


    // Assert
    // Проверяю, что алгоритм вернул результат, который совпадает с эталонным ответом:
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });



  /*

  it("Does selection sort ascending algorithm work with array of one element", () => { 
    // Arrange

    // Эталонный ответ:


    // Act
    // Проверяю алгоритм (метод .reverse):


    // Assert
    // Проверяю, что алгоритм вернул результат, который совпадает с эталонным ответом:

  });



  it("Does selection sort ascending algorithm work with an empty array", async () => { 
    // Arrange

    // Эталонный ответ:


    // Act
    // Проверяю алгоритм (метод .reverse):


    // Assert
    // Проверяю, что алгоритм вернул результат, который совпадает с эталонным ответом:

  });


  */


});