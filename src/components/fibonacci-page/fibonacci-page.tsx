import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacciSequence } from "./utils";
import { delay } from "../../universal-functions/delay";



// Задача: сгенерировать и отобразить n чисел последовательности Фибоначчи
export const FibonacciPage: React.FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  
  // Стейт для лоудера на кнопке
  const [isLoader, setIsLoader] = useState(false);


  const getIsDisabled = () => {
    if (inputValue && Number(inputValue) > 0 && Number(inputValue) < 20) {
      return false;
    } else {
      return true;
    }
  }

  // Переключатель для кнопки: вызываемая здесь функция возвращает boolean:
  const isDisabled = getIsDisabled();


  // Обработчик изменения инпута обновляет стейт
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


// Массив, в котором лежит полученная последовательность Фибоначчи
const outputArrayWithFibonacciSequence = getFibonacciSequence(parseInt(inputValue));


const [arrayToRender, setArrayToRender] = useState<number[]>([]);
                                          //здесь необходимо определить тип, 
                                          // иначе он будет считаться типом never
                                          // и это создаст проблемы

// Функция, которая постепенно рендерит полученный через алгоритм массив чисел
const renderArrayWithDelay = async () => {

  setIsLoader(true);
  
  // каким бы ни было предыдущее состояние инпута, 
  // тут я его первым делом обнуляю
  setArrayToRender([]); 
  
  // создаю пустой массив, куда постепенно, с промежутком в 500 мс,
  // буду складывать элементы последовательности Ф., отображая их в кружках
  let arrayToStoreValuesRenderingWithDelay = [];

  // цикл, чтобы пройтись по всей последовательности и задать промежуток
  for (let i = 0; i < outputArrayWithFibonacciSequence.length; i++) {

      
    // перед каждым шагом цикла делаю паузу в полсекунды
    await delay(500);
    
    // кладу в массив для отображения очередной элемент массива
    arrayToStoreValuesRenderingWithDelay.push(outputArrayWithFibonacciSequence[i]);
    console.log(arrayToStoreValuesRenderingWithDelay);

    setArrayToRender([...arrayToStoreValuesRenderingWithDelay]);
    
  }

  // итоговое действие - сохраняю в стейт новый массив, 
  // внутрь которого копирую прежний, к которому добавился новый кружок с числом
  setArrayToRender([...arrayToStoreValuesRenderingWithDelay]);
  setIsLoader(false);

  

}


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.inputBlock}>
        <div className={styles.inputSubBlock}>
          <Input
            extraClass ={styles.input}
            type="number"
            max="0"
            value={inputValue}
            onChange={handleChange} 
          />
          <p className={styles.subscript}>
            Максимальное число — 19
          </p>
        </div>
        <Button 
          text="Рассчитать" 
          type="submit"
          isLoader={isLoader}
          disabled={isDisabled} 
          extraClass={styles.calculateButton}
          onClick={renderArrayWithDelay} 
        />
      </form>
      
      {/* А здесь будут кружочки */}
      <ul className={styles.circlesBlock}>
        {arrayToRender.map((elem, index) => (
           <li key={index} className={styles.circleElement}>
           <Circle
             index={index}
             letter={String(elem)}
           />
         </li>
        ))}


      </ul>
     
    </SolutionLayout>
  );
};
