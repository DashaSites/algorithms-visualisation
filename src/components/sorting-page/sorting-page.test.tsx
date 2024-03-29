import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { sortBubbleAscending, 
  sortBubbleDescending, 
  sortSelectionAscending, 
  sortSelectionDescending } from "./utils";

export type ArrayElement = {
  value: number;
  state?: ElementStates;
};


describe("Testing of the bubble sort and selection sort algorithms", () => {
  ///// ARRAY OF SEVERAL ELEMENTS
  // +
  it("Does selection sort ascending algorithm work ok with array of several elements", async () => {
    // Arrange
    const testArr = [5, 7, 4, 9, 8];
    const formatedArr = testArr.map((element) => ({
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
    const actualOutputArray: ArrayElement[] = await sortSelectionAscending(formatedArr, setArrFunction);

    // Assert
    // Проверяю, что алгоритм вернул результат, который совпадает с эталонным ответом:
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does selection sort ascending algorithm work ok with array with minus numbers", async () => {
    // Arrange
    const testArr = [-5, -7, 4, -9, 8];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    
    const expectedSortedArrayWithoutCircles = [-9, -7, -5, 4, 8]; 
    // Эталонный ответ:
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   

    // Моковая функция
    const setArrFunction = jest.fn();

    // Act
    // Проверяю алгоритм sortSelectionAscending:
    const actualOutputArray: ArrayElement[] = await sortSelectionAscending(formatedArr, setArrFunction);

    // Assert
    // Проверяю, что алгоритм вернул результат, который совпадает с эталонным ответом:
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does selection sort descending algorithm work ok with array of several elements", async () => {
    const testArr = [5, 7, 4, 9, 8];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [9, 8, 7, 5, 4]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortSelectionDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does selection sort descending algorithm work ok with array with minus numbers", async () => {
    const testArr = [-5, -7, 4, -9, 8]; 
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [8, 4, -5, -7, -9]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortSelectionDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does bubble sort ascending algorithm work ok with array of several elements", async () => {
    const testArr = [5, 7, 4, 9, 8];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [4, 5, 7, 8, 9]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleAscending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  it("Does bubble sort ascending algorithm work ok with array with minus numbers", async () => {
    const testArr = [-5, -7, 4, -9, 8];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [-9, -7, -5, 4, 8]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleAscending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does bubble sort descending algorithm work ok with array of several elements", async () => {
    const testArr = [5, 7, 4, 9, 8];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [9, 8, 7, 5, 4]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  it("Does bubble sort descending algorithm work ok with array with minus numbers", async () => {
    const testArr = [-5, -7, 4, -9, 8];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [8, 4, -5, -7, -9]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });


  ///// ARRAY OF ONE ELEMENT
  // +
  it("Does selection sort ascending algorithm work ok with array of one element", async () => {
    const testArr = [7];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [7]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    })); 
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortSelectionAscending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does selection sort descending algorithm work ok with array of one element", async () => {
    const testArr = [7];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [7]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortSelectionDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does bubble sort ascending algorithm work ok with array of one element", async () => {
    const testArr = [7];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [7]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleAscending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does bubble sort descending algorithm work ok with array of one element", async () => {
    const testArr = [7];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles = [7]; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  ///// EMPTY ARRAY
  // +
  it("Does selection sort ascending algorithm work ok with an empty array", async () => {
    const testArr: number[] = [];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles: number[] = []; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    })); 
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortSelectionAscending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does selection sort descending algorithm work ok with an empty array", async () => {
    const testArr: number[] = [];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles: number[] = []; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortSelectionDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does bubble sort ascending algorithm work ok with an empty array", async () => {
    const testArr: number[] = [];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles: number[] = []; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleAscending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });

  // +
  it("Does bubble sort descending algorithm work ok with an empty array", async () => {
    const testArr: number[] = [];
    const formatedArr = testArr.map((element) => ({
      value: element,
      state: ElementStates.Default
    }));
    const expectedSortedArrayWithoutCircles: number[] = []; 
    const expectedOutputArrayWithCircles: ArrayElement[] = expectedSortedArrayWithoutCircles.map((element) => ({
      value: element,
      state: ElementStates.Modified
    }));   
    const setArrFunction = jest.fn();
    const actualOutputArray: ArrayElement[] = await sortBubbleDescending(formatedArr, setArrFunction);
    expect(actualOutputArray).toEqual(expectedOutputArrayWithCircles);
  });
});