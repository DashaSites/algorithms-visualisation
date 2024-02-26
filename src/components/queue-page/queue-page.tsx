import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
//import { Stack } from "./utils"; // Здесь будет Queue //
import { delay } from "../../universal-functions/delay";


// Тип объекта, который отрендерится в массиве объектов
export type CircleElement = { 
  value: string;
  state?: ElementStates;
};


// 1) ДОБАВИТЬ 7 КРУЖКОВ С ИНДЕКСАМИ
// 2) СОЗДАТЬ КЛАСС QUEUE
// 3) СОХРАНИТЬ В ЭТОМ КОМПОНЕНТЕ ПРОЕКЦИЮ ОЧЕРЕДИ-КЛАССА

const initialArray = [
  { 
    value: "",
    state: ElementStates.Default
  },
  { 
    value: "",
    state: ElementStates.Default
  },  
  { 
    value: "",
    state: ElementStates.Default
  },
  { 
    value: "",
    state: ElementStates.Default
  },
  { 
    value: "",
    state: ElementStates.Default
  },
  { 
    value: "",
    state: ElementStates.Default
  },
  { 
    value: "",
    state: ElementStates.Default
  }
]


export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState("");
  const [arrayToRender, setArrayToRender] = useState(initialArray);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  console.log(inputValue)





const testQueue = ["2", "4", "6", "8", "3", "5", "7"]

  return (
    <SolutionLayout title="Очередь">
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
            //onClick={handleAddToQueue}
            //isLoader={isAddButtonLoaderActive()}
            disabled={inputValue ? false : true}
          />
          <Button 
            text="Удалить" 
            type="button"
            //onClick={handleDeleteFromQueue}
            //isLoader={isDeleteButtonLoaderActive()}
            //disabled={isDeleteOptionDisabled()}
          />
        </div>
        <div>
          <Button 
            text="Очистить" 
            type="button"
            //onClick={handleReset}
            //disabled={isDeleteOptionDisabled()}
          />
        </div>
      </form>

      <ul className={styles.circlesBlock}>
        {arrayToRender.map((element, index) => (
          <li key={index}>
            <Circle
              index={index}
              letter={element.value}
              //state={element.state}
              //head={index === stack.getSize()-1 ? "top" : ""}
              //tail={}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
