import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacciArray } from "./utils";



// Задача: сгенерировать и отобразить n чисел последовательности Фибоначчи
export const FibonacciPage: React.FC = () => {

  // Функция принимает количество чисел как параметр и
  // возвращает требуемый массив чисел последовательности Фибоначчи
  const getFibonacciNumbers = () => {


    // return arrayOfFibonacciNumbers = [] // up to n

  }

const inputedArr = [1, 4, 6, 8, 7, 4, 4, 6, 7, 3, 4, 6, 7, 5, 4 ,3];




  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.inputBlock}>
        <div className={styles.inputSubBlock}>
          <Input
            type="number"
            min={1} 
            max={5} 
            extraClass ={styles.input} 
          />
          <p className={styles.subscript}>
            Максимальное число — 19
          </p>
        </div>
        <Button text="Рассчитать" type="submit" extraClass={styles.calculateButton} />
      </form>
      
      {/* А здесь будут кружочки */}
      <ul className={styles.circlesBlock}>
        {inputedArr.map((elem, index) => (
           <li key={index} className={styles.circleElement}>
           <Circle
             index={index}
          
           />
         </li>
        ))}
      {/*  
        {arrayOfFibonacciNumbers.map((element, index) => (
          <li key={index} className={styles.circleElement}>
            <Circle
              index={индекс элемента в массиве}
              value={данное число из последовательности фибоначчи}
            />
          </li>
        ))}
      */}

      </ul>
     
    </SolutionLayout>
  );
};
