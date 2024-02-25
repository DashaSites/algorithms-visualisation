import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";
import { delay } from "../../universal-functions/delay";

// 1) ПРИ НАЖАТИИ НА КНОПКУ СТАВИТЬ НА НЕЕ ЛОУДЕР, А ОСТАЛЬНЫЕ КНОПКИ ДИЗЕЙБЛИТЬ
// 2) СОХРАНИТЬ В СТЕЙТ НЕ СТЕК=МАССИВ СТРОК, А СТРОК=МАССИВ ОБЪЕКТОВ
// 3) СДЕЛАТЬ 2 ФУНКЦИИ АСИНХРОННЫМИ, И ВНУТРИ НИХ КРАСИТЬ КРУЖКИ НА ПОЛСЕКУНДЫ

export type CircleElement = { // Тип объекта, который отрендерится в массиве объектов
  value: string;
  state?: ElementStates;
};

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState("");
  //const [outputArray, setOutputArray] = useState([]);
  const stackRef = useRef(new Stack<string>());

  const stack = stackRef.current;
  // Получаю массив элементов из стека. Было:
  const [stackElements, setStackElements] = useState(stack.getElements());


  // Получаю изначальное значение массива объектов: {value: число, state: ElementStates.Default}
  const getOutputElementsInitialState = (input: string) => {
    if (input.length < 1) {
      return [];
    } else {
      return [
        {
          value: input,
          state: ElementStates.Default,
        },
      ];
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  const handlePush = () => {

    if (inputValue) {
      stack.push(inputValue);
      setStackElements(stack.getElements()); // обновляю проекцию стека
      setInputValue(""); // очищаю инпут
    }

  }


  const handlePop = () => {

    stack.pop();
    setStackElements(stack.getElements());

  }


  const handleReset = () => {

    const stackLength = stack.getSize();
    let i = 0;
    while (i < stackLength) {
      stack.pop();
      i++;
    }

    setStackElements(stack.getElements()); 
  }



//const testStack = [2, 5, 4, 7, 8, 3, 77]

  return (
    <SolutionLayout title="Стек">
      <form className={styles.controlsBlock}>
        <div className={styles.controlsSubBlock}>
          <div className={styles.inputBlock}>
            <Input
              placeholder = "Введите значение"
              type ="text" 
              extraClass ={styles.input}
              maxLength={4}
              value={inputValue}
              onChange={handleChange}  
            />
            <p className={styles.subscript}>Максимум — 4 символа</p>
          </div>
          <Button
            text="Добавить" 
            type="button"
            onClick={handlePush}
          />
          <Button 
            text="Удалить" 
            type="button"
            onClick={handlePop}
          />
        </div>
        <div>
          <Button 
            text="Очистить" 
            type="button"
            onClick={handleReset}
          />
        </div>
      </form>

      <ul className={styles.circlesBlock}>
        {stackElements.map((element, index) => (
          <li key={index}>
            <Circle
              index={index} // номер индекса элемента
              letter={element} // введенное в инпут value
              //state={element.state}
              //head={} сделать проверку: если это последний элемент, то написать над ним "top"
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
