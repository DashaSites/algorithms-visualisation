import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { sortBubbleAscending, sortBubbleDescending, sortSelectionAscending, sortSelectionDescending } from "./utils";


// СДЕЛАТЬ:

// + 1) ПРИ ОТКРЫТИИ СТРАНИЦЫ ГЕНЕРИРОВАТЬ СЛУЧАЙНЫЙ МАССИВ

// + 2) ЭТОТ МАССИВ ДОЛЖЕН СОХРАНИТЬСЯ В СТЕЙТ, И ПОСРЕДСТВОМ ЭТОГО ОТРЕНДЕРИТЬСЯ

// + 3) ПРИ КЛИКЕ НА КНОПКУ "НОВЫЙ МАССИВ" ГЕНЕРИРУЕТСЯ И РЕНДЕРИТСЯ НОВЫЙ 
// СЛУЧАЙНЫЙ МАССИВ.

// + 4) СОРТИРОВКА: 
// + 4.1) ВЫБОР АЛГОРИТМА, 
// + 4.2) ВЫБОР НАПРАВЛЕНИЯ (ВОЗРАСТАНИЕ/УБЫВАНИЕ)

// 5) АНИМАЦИЯ!



type Algorithm = "Выбор" | "Пузырек"; 

export const SortingPage: React.FC = () => {

  const [arrayToRender, setArrayToRender] = useState<number[]>([]);

  const [algorithmChecked, setAlgorithmChecked] = useState<Algorithm>("Выбор");



  // При загрузке страницы генерируется случайный массив
  useEffect(() => {
    renderGeneratedArray();
  }, []);


  // Геренатор массива случайных чисел
  // Эта функция должна быть вызвана при открытии страницы и при клике на "Новый массив":
  const generateRandomArray = () => {
   // определяю длину массива случайных чисел (от 3 до 17)
   const arrayLength = Math.round((Math.random() * 14) + 3)

   const randomArray: number[] = [];
  
  // пока длина моего массива меньше числа arrayLength, пушу туда случайные числа от 0 до 100
   while (randomArray.length < arrayLength) {
    randomArray.push(Math.round(Math.random() * 100));
   }

   console.log(`Random array just generated: ${randomArray}`)
   return randomArray;
  }



  // Записываю сгенерированный массив в стейт
  const renderGeneratedArray = () => {
    setArrayToRender([]);
    const generatedArray = generateRandomArray();
    setArrayToRender([...generatedArray]);
  }




  // Запускаю сортировку по возрастанию в зависимости от выбранного метода: 
  // выбором или пузырьком
  const sortArrayInAscendingOrder = () => {
  
    if (algorithmChecked === "Выбор") {
      // сортирую выбором по возрастанию
      const arraySortedSelectionAscending = sortSelectionAscending(arrayToRender);
      console.log(arraySortedSelectionAscending); // УРРРААА
      // записываю результат в стейт
      setArrayToRender([...arraySortedSelectionAscending]);

    } else if (algorithmChecked === "Пузырек") {
      // сортирую пузырьком по возрастанию
      const arraySortedBubbleAscending = sortBubbleAscending(arrayToRender);
      console.log(arraySortedBubbleAscending); 
      // записываю результат в стейт
      setArrayToRender([...arraySortedBubbleAscending]);
    }
  }


  // Запускаю сортировку по убыванию в зависимости от выбранного метода: 
  // выбором или пузырьком
  const sortArrayInDescendingOrder = () => {
    if (algorithmChecked === "Выбор") {
      // сортирую выбором по убыванию
      const arraySortedSelectionDescending = sortSelectionDescending(arrayToRender);
      console.log(arraySortedSelectionDescending); // УРРРААА
      // записываю результат в стейт
      setArrayToRender([...arraySortedSelectionDescending]);
    } else if (algorithmChecked === "Пузырек") {
      // сортирую пузырьком по убыванию
      const arraySortedBubbleDescending = sortBubbleDescending(arrayToRender);
      console.log(arraySortedBubbleDescending); 
      // записываю результат в стейт
      setArrayToRender([...arraySortedBubbleDescending]);
    }
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
            checked={algorithmChecked === "Выбор"}
            onChange={() => setAlgorithmChecked("Выбор")}
     
          />
          <RadioInput
            label="Пузырёк"
            name="sortingAlgorithm"
            extraClass ={styles.radioButton}
            checked={algorithmChecked === "Пузырек"}
            onChange={() => setAlgorithmChecked("Пузырек")}
          />
        </div>
        <div className={styles.sortingButtons}>
        <Button 
          text="По возрастанию" 
          type="button" 
          extraClass={styles.ascendingButton} 
          onClick={sortArrayInAscendingOrder}
          sorting={Direction.Ascending}
        />
        <Button 
          text="По убыванию" 
          type="button" 
          extraClass={styles.descendingButton}
          onClick={sortArrayInDescendingOrder}
          sorting={Direction.Descending} 
        />
        </div> 
        <Button 
          text="Новый массив" 
          type="button" 
          extraClass={styles.renderNewArrayButton}
          onClick={renderGeneratedArray}
        />
      </form>
      
      <ul className={styles.columnsBlock}>
        {arrayToRender.map((elem, index) => (
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
