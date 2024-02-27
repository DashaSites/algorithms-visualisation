import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./utils";
import { delay } from "../../universal-functions/delay";


// Тип объекта, который отрендерится в массиве объектов
export type CircleElement = { 
  value: string;
  state?: ElementStates;
};



const initialArray = [
  { 
    value: "a",
    state: ElementStates.Changing
  },
  { 
    value: "b",
    state: ElementStates.Changing
  },  
  { 
    value: "c",
    state: ElementStates.Changing
  },
  { 
    value: "d",
    state: ElementStates.Changing
  },
  { 
    value: "",
    state: ElementStates.Default
  },
  { 
    value: "",
    state: ElementStates.Changing
  },
  { 
    value: "afg",
    state: ElementStates.Changing
  }
]


export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState("");
  const [ arrayToRender, setArrayToRender] = useState(initialArray);
  const [operation, setOperation] = useState("");

  // Создаю экземпляр класса
  const queueRef = useRef(new Queue<CircleElement>(7));
  // Cохраняю объект экземпляра класса в переменной queue
  const queue = queueRef.current;
  // Получаю массив из 7 undefined элементов из очереди
  const [queueElements, setQueueElements] = useState(queue.getElements());


  console.log(`getElements() from queue`, queue.getElements()); 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  // Добавление элемента
  const addElement = async () => {
    setOperation("Добавляю")
    
    if (inputValue) {
      queue.enqueue({ // кладу в массив очереди объект, в котором есть строка и стейт кружка
        value: inputValue,
        state: ElementStates.Changing
      })

      setQueueElements(queue.getElements()); // обновляю проекцию очереди

      setInputValue(""); // очищаю инпут
    }

    await delay(500);

    queue.getTail()!.state = ElementStates.Default;
    setQueueElements(queue.getElements());

    setOperation("");
  }

  // Удаление элемента
  const deleteElement = async () => {

    setOperation("Удаляю");

    queue.peek()!.state = ElementStates.Changing;

    await delay(500);

    queue.dequeue();
    setQueueElements(queue.getElements());


    setOperation("");
  }


  // Обнуление массива
  const resetQueue = () => {
    queue.clear();
    setQueueElements(queue.getElements());
  }


  // Настройка дизейбла для кнопок "Удалить" и "Очистить"
  const isDeleteOptionDisabled = () => {
    if (queue.isEmpty() === true) {
      return true;
    } else {
      return false;
    }
  }



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
            onClick={addElement}
            disabled={!inputValue || queueElements[6] !== undefined ? true : false}
          />
          <Button 
            text="Удалить" 
            type="button"
            onClick={deleteElement}
            disabled={isDeleteOptionDisabled()}
          />
        </div>
        <div>
          <Button 
            text="Очистить" 
            type="button"
            onClick={resetQueue}
            disabled={isDeleteOptionDisabled()}
          />
        </div>
      </form>

      <ul className={styles.circlesBlock}>
        {queueElements.map((element, index) => (
          <li key={index}>
            <Circle
              index={index}
              letter={element ? element.value : ""}
              state={element ? element.state : ElementStates.Default}
              head={element !== undefined && element === queue.peek() ? "head" : ""}
              tail={element !== undefined && element === queue.getTail() ? "tail" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
