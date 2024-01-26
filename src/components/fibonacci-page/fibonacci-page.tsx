import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";


import { useState } from "react";


// Задача: сгенерировать и отобразить n чисел последовательности Фибоначчи



export const FibonacciPage: React.FC = () => {

  // Функция принимает количество чисел как параметр и
  // возвращает требуемый массив чисел последовательности Фибоначчи
  const getFibonacciNumbers = () => {


    // return arrayOfFibonacciNumbers = [] // up to n

  }






  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.inputBlock}>
        <div className={styles.inputSubBlock}>
          <Input minLength={1} maxLength={19} extraClass ={styles.input} />
          <p className={styles.subscript}>
            Максимальное число — 19
          </p>
        </div>
        <Button text="Рассчитать" type="submit" extraClass={styles.calculateButton} />
      </form>
      
      {/* А здесь будут кружочки */}
      <ul className={styles.circlesBlock}>
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
