import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../universal-functions/delay";
import { LinkedList } from "./utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";



// Тип объекта, который отрендерится в массиве объектов
export type CircleElement = { 
  value: string;
  state?: ElementStates;
};


// Массив объектов, который рендерится при загрузке
const initialArray: CircleElement[] = [
  { 
    value: "0",
    state: ElementStates.Default
  },
  { 
    value: "34",
    state: ElementStates.Default
  },  
  { 
    value: "8",
    state: ElementStates.Default
  },
  { 
    value: "1",
    state: ElementStates.Default
  }
]


export const ListPage: React.FC = () => {

  // Создаю экземпляр класса
  const linkedListRef = useRef(new LinkedList<CircleElement>(initialArray));

  // Cохраняю объект экземпляра класса в переменной linkedList
  const linkedList = linkedListRef.current;


  // Получаю массив из элементов связного списка
  const [linkedListElements, setLinkedListElements] = useState(linkedList.toArray());







  const handleAddElementToHead = () => {


  }





  const handleAddElementToTail = () => {

  }





  const handleDeleteHead = () => {
    linkedList.deleteHead();
    setLinkedListElements(linkedList.toArray());
    console.log(linkedListElements)
  }

  

  const handleDeleteTail = () => {
    linkedList.deleteTail();
    setLinkedListElements(linkedList.toArray());
    console.log(linkedListElements)
  }


















  
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controlsContainer}>
        <form className={styles.controlsBlock}>
          <div className={styles.inputBlock}>
            <Input
              placeholder="Введите значение"
              type="text"
              extraClass={styles.input}
              maxLength={4}
              //value={inputValue}
              //onChange={handleChange}  
            />
            <p className={styles.subscript}>Максимум — 4 символа</p>
          </div>
          <div className={styles.buttonsBlock}>
            <Button
              text="Добавить в head"
              type="button"
              onClick={handleAddElementToHead}
              //disabled={}
            />
            <Button
              text="Добавить в tail"
              type="button"
              onClick={handleAddElementToTail}
              //disabled={}
            />
            <Button
              text="Удалить из head"
              type="button"
              onClick={handleDeleteHead}
              //disabled={}
            />
            <Button
              text="Удалить из tail"
              type="button"
              onClick={handleDeleteTail}
              //disabled={handleDeleteTail}
            />
          </div>
        </form>
        <form className={styles.controlsBlock}>
          <Input
            placeholder="Введите индекс"
            type="text"
            extraClass={styles.input}
            maxLength={4}
            //value={inputValue}
            //onChange={handleChange}  
          />
          <div className={styles.buttonsByIndexBlock}>
            <Button
              text="Добавить по индексу"
              type="button"
              extraClass={styles.buttonByIndex}
              //onClick={}
              //disabled={}
            />
            <Button
              text="Удалить по индексу"
              type="button"
              extraClass={styles.buttonByIndex}
              //onClick={}
              //disabled={}
            />
          </div>
        </form>
      </div>
      <ul className={styles.circlesBlock}>
        {linkedListElements.map((element, index) => (
          <li key={index} className={styles.circleBlock}>
            <Circle
              index={index} // номер индекса элемента
              letter={element.value} // введенное в инпут value
              state={element.state} // цвет кружка
              extraClass={styles.circle}
              //head={}
              tail={element !== undefined && element === linkedList.getTail() ? "tail" : ""}
            />
            {index < linkedListElements.length-1 ? <ArrowIcon /> : null}
          </li>
        ))}

      </ul>
    </SolutionLayout>
  );
};
