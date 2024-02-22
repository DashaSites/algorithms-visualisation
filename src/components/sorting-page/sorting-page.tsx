import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { sortBubbleAscending, 
  sortBubbleDescending, 
  sortSelectionAscending, 
  sortSelectionDescending } from "./utils";
import { delay } from "../../universal-functions/delay";

// СДЕЛАТЬ:

// + 1) ПРИ ОТКРЫТИИ СТРАНИЦЫ ГЕНЕРИРОВАТЬ СЛУЧАЙНЫЙ МАССИВ

// + 2) ЭТОТ МАССИВ ДОЛЖЕН СОХРАНИТЬСЯ В СТЕЙТ, И ПОСРЕДСТВОМ ЭТОГО ОТРЕНДЕРИТЬСЯ

// + 3) ПРИ КЛИКЕ НА КНОПКУ "НОВЫЙ МАССИВ" ГЕНЕРИРУЕТСЯ И РЕНДЕРИТСЯ НОВЫЙ 
// СЛУЧАЙНЫЙ МАССИВ.

// + 4) СОРТИРОВКА: 
// + 4.1) ВЫБОР АЛГОРИТМА, 
// + 4.2) ВЫБОР НАПРАВЛЕНИЯ (ВОЗРАСТАНИЕ/УБЫВАНИЕ)

// 5) АНИМАЦИЯ:
// + 5.1) СДЕЛАТЬ ИЗНАЧАЛЬНЫЙ МАССИВ - МАССИВОМ ОБЪЕКТОВ, У КОТОРОГО ЕСТЬ ПОЛЯ VALUE И STATE,
// И ЗАДАТЬ СВОЙСТВУ STATE ИЗНАЧАЛЬНЫЙ state: ElementStates.Default


// 5.2) В utils.ts ПЕРЕПИСАТЬ ВСЕ 4 АЛГОРИТМА, 
// 5.2.1) ВСЕ-ТАКИ ВСТАВИВ В КАЖДЫЙ ИЗ НИХ ЛОГИКУ ИЗ SWAP
// 5.2.2) И СДЕЛАВ ИХ АСИНХРОННЫМИ ФУНКЦИЯМИ С ПЕРЕЗАПИСЫВАНИЕМ СТЕЙТОВ (ElementStates) ПО УСЛОВИЯМ



type Algorithm = "Выбор" | "Пузырек"; 


type ArrayElement = {
  value: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
                                    // заменить тип number[] на <ArrayElement[]>
  const [arrayToRender, setArrayToRender] = useState<ArrayElement[]>([]);

  const [algorithmChecked, setAlgorithmChecked] = useState<Algorithm>("Выбор");

  const [isLoader, setIsLoader] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);



  // При загрузке страницы генерируется случайный массив
  useEffect(() => {
    renderGeneratedArray();
  }, []);


  // Геренатор массива случайных чисел
  const generateRandomArray = () => {
   // определяю длину массива случайных чисел (от 3 до 17)
   const arrayLength = Math.round((Math.random() * 14) + 3)

   const randomArray: number[] = [];
  
  // пока длина моего массива меньше числа arrayLength, 
  // пушу в него случайные числа от 0 до 100
   while (randomArray.length < arrayLength) {
    randomArray.push(Math.round(Math.random() * 100));
   }

   console.log(`Random array just generated: ${randomArray}`)
   return randomArray;
  }



  // Превращаю сгенерированный массив в массив объектов и записываю его в стейт
  // const renderGeneratedArray = () => {
  //   setArrayToRender([]);
  //   const generatedArray = generateRandomArray();

  //   setArrayToRender([...generatedArray]);
  // }

  const renderGeneratedArray = () => {
    setArrayToRender([]);
    const generatedArray = generateRandomArray();

    const arrayToRenderInitialState = generatedArray.map((arrayElement) => ({
      value: arrayElement,
      state: ElementStates.Default
    }))
    setArrayToRender([...arrayToRenderInitialState]);
  };




  // Запускаю сортировку по возрастанию (выбором либо пузырьком)
  const sortArrayInAscendingOrder = () => {
  
    if (algorithmChecked === "Выбор") {
      setIsLoader(true)
      // сортирую выбором по возрастанию
      const arraySortedSelectionAscending = sortSelectionAscending(arrayToRender);
      console.log(arraySortedSelectionAscending);
      // помещаю отсортированный массив в стейт
      setArrayToRender([...arraySortedSelectionAscending]);
    } else if (algorithmChecked === "Пузырек") {
      setIsLoader(true)
      // сортирую пузырьком по возрастанию
      const arraySortedBubbleAscending = sortBubbleAscending(arrayToRender);
      console.log(arraySortedBubbleAscending); 
      setArrayToRender([...arraySortedBubbleAscending]);
    }

  }


  // Запускаю сортировку по убыванию (выбором либо пузырьком)
  const sortArrayInDescendingOrder = () => {

    if (algorithmChecked === "Выбор") {
      // сортирую выбором по убыванию
      const arraySortedSelectionDescending = sortSelectionDescending(arrayToRender);
      console.log(arraySortedSelectionDescending);
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

// НАПИСАТЬ ФУНКЦИЮ, ОПРЕДЕЛЯЮЩУЮ, НА КАКОЙ ИМЕННО КНОПКЕ В ДАННЫЙ МОМЕНТ АКТИВЕН ЛОУДЕР.


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
          isLoader={isLoader} // вызвать здесь функцию, которая определит, какой именно лоудер активен
          // disabled={} пока хз как определить
        />
        <Button 
          text="По убыванию" 
          type="button" 
          extraClass={styles.descendingButton}
          onClick={sortArrayInDescendingOrder}
          sorting={Direction.Descending}
          isLoader={isLoader} // вызвать здесь функцию, которая определит, какой именно лоудер активен
          // disabled={} пока хз как определить 
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
        {arrayToRender.map((element, index) => (
           <li key={index} className={styles.columnElement}>
            <Column
              index={element.value}
              state={element.state}
            />
         </li>
        ))}
      </ul>

    </SolutionLayout>
  );
};
