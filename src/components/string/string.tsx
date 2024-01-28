import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useOutputElements } from "./utils";


export const StringComponent: React.FC = () => {

  // 1) Подаём на вход строку, на выходе получаем массив состояний, 
  // где каждое состояние фиксирует шаг алгоритма.
  // После этого в компоненте прогоняем полученный массив состояний 
  // с неким интервалом и отрисовать каждое состояние. 
  // Получаем визуализацию алгоритма, хотя сам алгоритм остаётся изолированным.


  const [inputValue, setInputValue] = useState("");
  const [isArrayReversed, setIsArrayReversed] = useState(false);
  
  // Стейт для лоудера на кнопке
  const [isLoader, setIsLoader] = useState(false);
  // Переключатель вкл/выкл для кнопки
  const isDisabled = inputValue ? false : true;


  // Обработчик изменения инпута обновляет состояние
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  const invertArray = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsArrayReversed(!isArrayReversed);
    setIsLoader(true);
  }

  // Массив, в котором лежит развернутая строка
  const outputElementsToRender = useOutputElements(inputValue, isArrayReversed);


  //const arrayToRender = isArrayReversed ? outputElementsToRender : inputValue.split("");


  return (
    <SolutionLayout title="Строка">
        <form className={styles.inputBlock} onSubmit={invertArray}>
          <div className={styles.inputSubBlock}>
            <Input 
              maxLength={11} 
              type ="text" 
              extraClass ={styles.input}
              value={inputValue}
              onChange={handleChange} 
            />
            <p className={styles.subscript}>
              Максимум — 11 символов
            </p>
          </div>
          <Button 
            text="Развернуть" 
            type="submit"
            isLoader={isLoader}
            disabled={isDisabled}
          />
        </form>
        
        {/* Кружочки с values инпута */}
        <ul className={styles.circlesBlock}>
               
          {outputElementsToRender.map((element, index) => (
            <li key={index} className={styles.circleElement}>
              <Circle
                letter={element.symbol}
                state={element.state}
              />
            </li>
          ))}
        </ul>
    </SolutionLayout>
  );
};