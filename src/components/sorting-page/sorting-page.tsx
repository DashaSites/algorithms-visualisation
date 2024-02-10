import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";




export const SortingPage: React.FC = () => {

  // Запустить useEffect:
  // при открытии страницы или при нажатии кнопки «Новый массив» генерируется 
  // и рендерится случайный массив

  
  // Геренатор массива случайных чисел
  const generateRandomArray = () => {
   // определяю длину массива случайных чисел (от 3 до 17)
   const arrayLength = Math.round((Math.random() * 14) + 3)

   const randomArray: number[] = [];
  
  // пока длина моего массива меньше числа arrayLength, пушу туда случайные числа от 0 до 100
   while (randomArray.length < arrayLength) {
    randomArray.push(Math.round(Math.random() * 100));
   }
   console.log(randomArray)
   return randomArray;
  }


  const sortInAscendingOrder = () => {

  }


  const sortInDescendingOrder = () => {
    
  }




const testArray: number[] = [2, 34, 17, 100, 50, 2, 34, 17, 100, 50, 2, 34, 17, 100, 50, 45, 77];


  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.controlComponentsBlock}>

        <div className={styles.radioButtons}>
          <RadioInput
            label="Выбор"
            name="sortingAlgorithm"
            extraClass ={styles.radioButton}
            defaultChecked
          />
          <RadioInput
            label="Пузырёк"
            name="sortingAlgorithm"
            extraClass ={styles.radioButton}
          />
        </div>
        <div className={styles.sortingButtons}>
        
        <Button 
          text="По возрастанию" 
          type="submit" 
          extraClass={styles.ascendingButton} 
          onClick={sortInAscendingOrder}
          sorting={Direction.Ascending}
        />

        <Button 
          text="По убыванию" 
          type="submit" 
          extraClass={styles.descendingButton}
          onClick={sortInDescendingOrder}
          sorting={Direction.Descending} 
        />
        </div>
        
        <Button 
          text="Новый массив" 
          type="button" 
          extraClass={styles.renderNewArrayButton}
          onClick={generateRandomArray}
        />

      </form>
      
      <ul className={styles.columnsBlock}>
        {testArray.map((elem, index) => (
           <li key={index} className={styles.columnElement}>
            <Column
              index={elem}
            />
         </li>
        ))}
      </ul>

    </SolutionLayout>
  );
};
