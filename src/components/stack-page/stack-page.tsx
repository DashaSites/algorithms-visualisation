import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";
import { delay } from "../../universal-functions/delay";
import { CircleElement } from "../../types/circle-element";



export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [stackOperation, setStackOperation] = useState("");

  const stackRef = useRef(new Stack<CircleElement>());

  const stack = stackRef.current; // сохраняю проекцию стека
  // Получаю массив элементов из стека. Таким образом инициализируется первый, пустой массив:
  const [stackElements, setStackElements] = useState(stack.getElements());


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  const handlePush = async () => {
    setStackOperation("Добавляю");

    if (inputValue) {
      stack.push({ // кладу в массив стека объект, в котором есть и строка, и цвет кружка
        value: inputValue,
        state: ElementStates.Changing
      })
      setStackElements(stack.getElements()); // обновляю проекцию стека
      setInputValue(""); // очищаю инпут
    }

    await delay(500);

    stack.peak()!.state = ElementStates.Default; // перекрашиваю кружок обратно
    setStackElements(stack.getElements());

    setStackOperation("");
  }


  const handlePop = async () => {
    setStackOperation("Удаляю");

    stack.peak()!.state = ElementStates.Changing; // обновляю свойство цвета

    await delay(500);

    stack.pop();
    setStackElements(stack.getElements());

    setStackOperation("");
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


  // Настройка лоудеров
  const isAddButtonLoaderActive = () => {
    if (stackOperation === "Добавляю" && isLoader) {
      return true;
    } else {
      return false;
    }
  }

  const isDeleteButtonLoaderActive = () => {
    if (stackOperation === "Удаляю" && isLoader) {
      return true;
    } else {
      return false;
    }
  }
  
  // Настройка дизейбла для кнопок "Удалить" и "Очистить"
  const isDeleteOptionDisabled = () => {
    const stackLength = stack.getSize();
    if (stackLength) {
      return false;
    } else {
      return true;
    }
  }



  return (
    <SolutionLayout title="Стек">
      <form className={styles.controlsBlock}>
        <div className={styles.controlsSubBlock}>
          <div className={styles.inputBlock}>
            <Input
              placeholder="Введите значение"
              type="text" 
              extraClass={styles.input}
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
            isLoader={isAddButtonLoaderActive()}
            disabled={inputValue ? false : true}
          />
          <Button 
            text="Удалить" 
            type="button"
            onClick={handlePop}
            isLoader={isDeleteButtonLoaderActive()}
            disabled={isDeleteOptionDisabled()}
          />
        </div>
        <div>
          <Button 
            text="Очистить" 
            type="button"
            onClick={handleReset}
            disabled={isDeleteOptionDisabled()}
          />
        </div>
      </form>

      <ul className={styles.circlesBlock}>
        {stackElements.map((element, index) => (
          <li key={index}>
            <Circle
              index={index} // номер индекса элемента
              letter={element.value} // введенное в инпут value
              state={element.state}
              head={index === stack.getSize()-1 ? "top" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
