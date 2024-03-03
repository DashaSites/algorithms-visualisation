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

  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [currentStatus, setCurrentStatus] = useState(ElementStates.Default);


  // Создаю экземпляр класса
  const linkedListRef = useRef(new LinkedList<CircleElement>(initialArray));
  // Cохраняю объект экземпляра класса в переменной linkedList
  const linkedList = linkedListRef.current;
  // Получаю массив из элементов связного списка
  const [linkedListElements, setLinkedListElements] = useState(linkedList.toArray());



  // Пользователь вводит/меняет значение
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);   
  }

  // Пользователь вводит/меняет номер индекса
  const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);    
  }




const getHead = (index: number) => {

  if (currentOperation === "Добавляю в начало списка") {

    if (index === 0) {
      if (currentStatus === ElementStates.Changing) {
        return (
          <Circle
                letter={inputValue} // введенное в инпут value
                state={ElementStates.Changing} 
                isSmall={true}
              />
        )
      } else {
        return "head"
      }
    } else {
      return null
    }


  } else if (currentOperation === "Добавляю по индексу") {
    // cycle 
  
  }

  return index === 0 ? "head" : null;
} 



const getTail = (index: number) => {

  // if (currentOperation === "Добавляю в конец списка") {

  // }

}





  // Добавить элемент в начало списка 
  const addElementToHead = async () => {
    setCurrentOperation("Добавляю в начало списка");

    setCurrentStatus(ElementStates.Changing)

    await delay(1000)

    setCurrentStatus(ElementStates.Modified)

    const newNode = { value: inputValue, state: ElementStates.Modified}


    if (inputValue) {
      linkedList.prepend(newNode)

      setLinkedListElements(linkedList.toArray()); // обновляю проекцию списка
      
      setInputValue("")
    }

    await delay(1000)

    setCurrentStatus(ElementStates.Default)
    newNode.state = ElementStates.Default;
    setLinkedListElements(linkedList.toArray());

    setCurrentOperation("");
  }




  // Добавить элемент в конец списка 
  const addElementToTail = async () => {
    setCurrentOperation("Добавляю в конец списка");

    if (inputValue) {
      linkedList.append({
        value: inputValue,
        state: ElementStates.Changing
      })

      setLinkedListElements(linkedList.toArray()); // обновляю проекцию списка
      setInputValue(""); // очищаю инпут
    }


    setCurrentOperation("");
  }




  // Удалить элемент из начала списка
  const deleteHeadElement = async () => {

    linkedList.deleteHead();
    setLinkedListElements(linkedList.toArray());

  }



  // Удалить элемент из конца списка
  const deleteTailElement = async () => {

    linkedList.deleteTail();
    setLinkedListElements(linkedList.toArray());

  }





  const addElementByIndex = () => {
    setCurrentOperation("Добавляю по индексу");
    
    if (inputValue && indexValue) {
      linkedList.addByIndex({
        value: inputValue,
        state: ElementStates.Changing
      }, parseInt(indexValue))

      setLinkedListElements(linkedList.toArray()); // обновляю проекцию списка
      setInputValue(""); // очищаю инпут
    }




     setCurrentOperation("");
  }




const deleteElementByIndex = () => {
  setCurrentOperation("Удаляю по индексу");

  linkedList.deleteByIndex(parseInt(indexValue));
  setLinkedListElements(linkedList.toArray());



  setCurrentOperation("");
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
              value={inputValue}
              onChange={handleInputChange}  
            />
            <p className={styles.subscript}>Максимум — 4 символа</p>
          </div>
          <div className={styles.buttonsBlock}>
            <Button
              text="Добавить в head"
              type="button"
              onClick={addElementToHead}
              //disabled={}
            />
            <Button
              text="Добавить в tail"
              type="button"
              onClick={addElementToTail}
              //disabled={}
            />
            <Button
              text="Удалить из head"
              type="button"
              onClick={deleteHeadElement}
              //disabled={}
            />
            <Button
              text="Удалить из tail"
              type="button"
              onClick={deleteTailElement}
              //disabled={handleDeleteTail}
            />
          </div>
        </form>
        <form className={styles.controlsBlock}>
          <Input
            placeholder="Введите индекс"
            type="number"
            extraClass={styles.input}
            maxLength={4}
            value={indexValue}
            onChange={handleIndexChange}  
          />
          <div className={styles.buttonsByIndexBlock}>
            <Button
              text="Добавить по индексу"
              type="button"
              extraClass={styles.buttonByIndex}
              onClick={addElementByIndex}
              //disabled={}
            />
            <Button
              text="Удалить по индексу"
              type="button"
              extraClass={styles.buttonByIndex}
              onClick={deleteElementByIndex}
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
              head={getHead(index)} //index === 0 ? "head" : null
              //tail={getTail(index)} // index === linkedList.getSize()-1 ? "tail" : ""
              //isSmall={true}
            />
            {index < linkedListElements.length-1 ? <ArrowIcon /> : null}
          </li>
        ))}

      </ul>
    </SolutionLayout>
  );
};
