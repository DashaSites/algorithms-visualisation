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


type Algorithm = "Выбор" | "Пузырек"; 

export type ArrayElement = {
  value: number;
  state?: ElementStates;
};

export const SortingPage: React.FC = () => {
                                    
  const [arrayToRender, setArrayToRender] = useState<ArrayElement[]>([]);
  const [algorithmChecked, setAlgorithmChecked] = useState<Algorithm>("Выбор");
  const [isLoader, setIsLoader] = useState(false);
  //const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [direction, setDirection] = useState("");



  // При загрузке страницы генерируется массив
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
   return randomArray;
  }


  const renderGeneratedArray = async () => {
    setArrayToRender([]);
    const generatedArray = generateRandomArray();
    const arrayToRenderInitialState = generatedArray.map((arrayElement) => ({
      value: arrayElement,
      state: ElementStates.Default
    })) as ArrayElement[];
    console.log(arrayToRenderInitialState)
    setArrayToRender([...arrayToRenderInitialState]);
    await delay(1000)
  };


  // Запускаю сортировку по возрастанию (выбором либо пузырьком)
  const sortArrayInAscendingOrder = async () => {
  
    if (algorithmChecked === "Выбор") {
      setIsLoader(true);
      setDirection("Ascending");
      
      // сортирую выбором по возрастанию
      const arraySortedSelectionAscending = await sortSelectionAscending(arrayToRender, setArrayToRender);
      console.log(arraySortedSelectionAscending);
      // помещаю отсортированный массив в стейт
      setArrayToRender([...arraySortedSelectionAscending]);
      
      setIsLoader(false);
    } else if (algorithmChecked === "Пузырек") {
      setIsLoader(true);
      setDirection("Ascending");
     
      // сортирую пузырьком по возрастанию
      const arraySortedBubbleAscending = await sortBubbleAscending(arrayToRender, setArrayToRender);
      console.log(arraySortedBubbleAscending); 
      setArrayToRender([...arraySortedBubbleAscending]);
      setIsLoader(false);
    }

  }


  // Запускаю сортировку по убыванию (выбором либо пузырьком)
  const sortArrayInDescendingOrder = async () => {

    if (algorithmChecked === "Выбор") {
      setIsLoader(true);
      setDirection("Descending");
      
      // сортирую выбором по убыванию
      const arraySortedSelectionDescending = await sortSelectionDescending(arrayToRender, setArrayToRender);
      console.log(arraySortedSelectionDescending);
      // записываю результат в стейт
      setArrayToRender([...arraySortedSelectionDescending]);
      setIsLoader(false);
    } else if (algorithmChecked === "Пузырек") {
      setIsLoader(true);
      setDirection("Descending");
      
      // сортирую пузырьком по убыванию
      const arraySortedBubbleDescending = await sortBubbleDescending(arrayToRender, setArrayToRender);
      console.log(arraySortedBubbleDescending); 
      // записываю результат в стейт
      setArrayToRender([...arraySortedBubbleDescending]);
      setIsLoader(false);
    }

  }

// Определяю, активен ли лоудер кнопки "По возрастанию"
const isAscendingLoaderActive = () => {
  if (direction === "Ascending" && isLoader) {
    return true;
  } else {
    return false;
  }
}

// Определяю, активен ли лоудер кнопки "По убыванию"
const isDescendingLoaderActive = () => {
  if (direction === "Descending" && isLoader) {
    return true;
  } else {
    return false;
  }
}


// Настройка disabled у кнопок
const isAscendingButtonDisabled = () => {
  if (direction === "Descending" && isLoader) {
    return true;
  } else {
    return false;
  }
}

const isDescendingButtonDisabled = () => {
  if (direction === "Ascending" && isLoader) {
    return true;
  } else {
    return false;
  }
}

const isNewArrayButtonDisabled = () => {
  if (isLoader) {
    return true;
  } else {
    return false;
  }
}


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
          isLoader={isAscendingLoaderActive()}
          disabled={isAscendingButtonDisabled()}
        />
        <Button 
          text="По убыванию" 
          type="button" 
          extraClass={styles.descendingButton}
          onClick={sortArrayInDescendingOrder}
          sorting={Direction.Descending}
          isLoader={isDescendingLoaderActive()}
          disabled={isDescendingButtonDisabled()}
        />
        </div> 
        <Button 
          text="Новый массив" 
          type="button" 
          extraClass={styles.renderNewArrayButton}
          onClick={renderGeneratedArray}
          disabled={isNewArrayButtonDisabled()}
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
