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
import { CircleElement } from "../../types/circle-element";
import { DELAY_IN_MS } from "../../constants/delays";




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
  const [currentPinkHeaderIndex, setCurrentPinkHeaderIndex] = useState(0);


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



// РЕАЛИЗАЦИЯ ВСЕГО, ЧТО СВЯЗАНО С ВЕРХНИМИ МАЛЕНЬКИМИ КРУЖКАМИ
const getHead = (index: number) => {

  if (currentOperation === "Добавляю в начало списка") {
    if (index === 0) {
      if (currentStatus === ElementStates.Changing) {
        return (
          <Circle
            letter={inputValue}
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
  } else if (currentOperation === "Добавляю в конец списка") {
    if (index === linkedList.getSize()-1) {
      if (currentStatus === ElementStates.Changing) {
        return (
          <Circle
            letter={inputValue}
            state={ElementStates.Changing} 
            isSmall={true}
          />
        )
      } 
    } else {
      return null
    }
  } else if (currentOperation === "Добавляю по индексу") {
    if (index === currentPinkHeaderIndex && currentStatus === ElementStates.Changing) {
      return (
        <Circle
          letter={inputValue}
          state={ElementStates.Changing} 
          isSmall={true}
        />
      )
    }
  }

  if (index === 0) {
    return "head";
  } else {
    return null;
  }
} 


// РЕАЛИЗАЦИЯ ВСЕГО, ЧТО СВЯЗАНО С НИЖНИМИ МАЛЕНЬКИМИ КРУЖКАМИ
const getTail = (index: number, element: CircleElement) => {

  if (currentOperation === "Удаляю из начала списка") {
    if (index === 0) {
      if (currentStatus === ElementStates.Changing) {
        return (
          <Circle
            letter={element.value}
            state={ElementStates.Changing} 
            isSmall={true}
          />
        )
      } 
    } else {
      return null;
    }
  } else if (currentOperation === "Удаляю из конца списка") {
    if (index === linkedList.getSize()-1) {
      if (currentStatus === ElementStates.Changing) {
        return (
          <Circle
            letter={element.value} // Число, которые было последним
            state={ElementStates.Changing} 
            isSmall={true}
          />
        )
      }
    } else {
      return null;
    }
  } else if (currentOperation === "Удаляю по индексу") {
    if (index === parseInt(indexValue) && currentStatus === ElementStates.Changing) {
      return (
        <Circle
          letter={element.value} //
          state={ElementStates.Changing} 
          isSmall={true}
          data-cy="smallCircle"  
        />
      )
    }
  }


  if (index === linkedList.getSize()-1) {
    return "tail";
  } else {
    return null;
  }
}



// РЕАЛИЗАЦИЯ ДЕЙСТВИЙ С МАССИВОМ БОЛЬШИХ КРУЖКОВ

  // Добавить элемент в начало списка 
  const addElementToHead = async () => {
    setCurrentOperation("Добавляю в начало списка");
    setCurrentStatus(ElementStates.Changing)
    await delay(DELAY_IN_MS)
    setCurrentStatus(ElementStates.Modified)

    const newNode = { value: inputValue, state: ElementStates.Modified}

    if (inputValue) {
      linkedList.prepend(newNode);
      setLinkedListElements(linkedList.toArray()); // обновляю проекцию списка
      setInputValue("") 
    }

    await delay(DELAY_IN_MS);

    setCurrentStatus(ElementStates.Default);
    newNode.state = ElementStates.Default;
    setLinkedListElements(linkedList.toArray());

    setCurrentOperation("");
  }



  // Добавить элемент в конец списка 
  const addElementToTail = async () => {
    setCurrentOperation("Добавляю в конец списка");
    setCurrentStatus(ElementStates.Changing);
    await delay(DELAY_IN_MS);
    setCurrentStatus(ElementStates.Modified);

    const newNode = { value: inputValue, state: ElementStates.Modified}

    if (inputValue) {
      linkedList.append(newNode);
      setLinkedListElements(linkedList.toArray());
      setInputValue("");
    }

    await delay(DELAY_IN_MS);

    setCurrentStatus(ElementStates.Default);
    newNode.state = ElementStates.Default;
    setLinkedListElements(linkedList.toArray());

    setCurrentOperation("");
  }



  // Удалить элемент из начала списка
  const deleteHeadElement = async () => {
    setCurrentOperation("Удаляю из начала списка");
    setCurrentStatus(ElementStates.Changing);
    await delay(DELAY_IN_MS);
    linkedList.deleteHead();
    setCurrentStatus(ElementStates.Default);
    setLinkedListElements(linkedList.toArray());
    setCurrentOperation("");
  }



  // Удалить элемент из конца списка
  const deleteTailElement = async () => {
    setCurrentOperation("Удаляю из конца списка");
    setCurrentStatus(ElementStates.Changing);
    await delay(DELAY_IN_MS);
    linkedList.deleteTail();
    setCurrentStatus(ElementStates.Default);
    setLinkedListElements(linkedList.toArray());
    setCurrentOperation("");
  }



  // Добавить элемент по индексу
  const addElementByIndex = async () => {
    setCurrentOperation("Добавляю по индексу");
    setCurrentStatus(ElementStates.Changing);

    for (let i = 0; i <= parseInt(indexValue); i++) {
      setCurrentPinkHeaderIndex(i);
      await delay(DELAY_IN_MS);
    }

    const newNode = { value: inputValue, state: ElementStates.Modified}

    if (inputValue && indexValue) {
      linkedList.addByIndex(newNode, parseInt(indexValue))
      setLinkedListElements(linkedList.toArray());
      setInputValue("");
    }

    setCurrentStatus(ElementStates.Default);
    await delay(DELAY_IN_MS);
    
    newNode.state = ElementStates.Default;

    setCurrentPinkHeaderIndex(0);
    setCurrentOperation("");
  }



  // Удалить элемент по индексу
  const deleteElementByIndex = async () => {
    setCurrentOperation("Удаляю по индексу");

    const linkedListElements = linkedList.toArray();


    for (let i = 0; i <= parseInt(indexValue); i++) {
      linkedListElements[i].state = ElementStates.Changing;

      setLinkedListElements([...linkedListElements]);
      await delay(DELAY_IN_MS);
    }

    setCurrentStatus(ElementStates.Changing);
    await delay(DELAY_IN_MS);
    linkedList.deleteByIndex(parseInt(indexValue));
    setLinkedListElements(linkedList.toArray());

    for (let i = 0; i < parseInt(indexValue); i++) {
      linkedList.toArray()[i].state = ElementStates.Default;
      setLinkedListElements(linkedList.toArray());
    }

    setCurrentStatus(ElementStates.Default);
    setCurrentOperation("");
  }


  // Определяю, есть в ли сейчас в данном кружке значение или нет
  const isLetterEmpty = (index: number) => {
    if (index === 0 && currentOperation === "Удаляю из начала списка") {
      return true;
    } else if (index === linkedList.getSize()-1 && currentOperation === "Удаляю из конца списка") {
      return true;
    } else if (index === parseInt(indexValue) && currentStatus === ElementStates.Changing && currentOperation === "Удаляю по индексу") {
      return true;
    } else {
      return false;
    } 
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
              data-cy="inputValue"  
            />
            <p className={styles.subscript}>Максимум — 4 символа</p>
          </div>
          <div className={styles.buttonsBlock}>
            <Button
              text="Добавить в head"
              type="button"
              onClick={addElementToHead}
              disabled={!inputValue ? true : false}
              isLoader={currentOperation === "Добавляю в начало списка" ? true : false}
            />
            <Button
              text="Добавить в tail"
              type="button"
              onClick={addElementToTail}
              disabled={!inputValue ? true : false}
              isLoader={currentOperation === "Добавляю в конец списка" ? true : false}
            />
            <Button
              text="Удалить из head"
              type="button"
              onClick={deleteHeadElement}
              disabled={linkedList.getTail() == null ? true : false}
              isLoader={currentOperation === "Удаляю из начала списка" ? true : false}
            />
            <Button
              text="Удалить из tail"
              type="button"
              onClick={deleteTailElement}
              disabled={linkedList.getTail() == null ? true : false}
              isLoader={currentOperation === "Удаляю из конца списка" ? true : false}
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
            data-cy="inputIndex"   
          />
          <div className={styles.buttonsByIndexBlock}>
            <Button
              text="Добавить по индексу"
              type="button"
              extraClass={styles.buttonByIndex}
              onClick={addElementByIndex}
              disabled={!inputValue || !indexValue ? true : false }
            />
            <Button
              text="Удалить по индексу"
              type="button"
              extraClass={styles.buttonByIndex}
              onClick={deleteElementByIndex}
              disabled={!indexValue ? true : false }
            />
          </div>
        </form>
      </div>
      <ul className={styles.circlesBlock}>
        {linkedListElements.map((element, index) => (
          <li key={index} className={styles.circleBlock}>
            <Circle
              index={index} // номер индекса элемента
              letter={ isLetterEmpty(index) ? "" : element.value } // введенное в инпут value
              state={element.state} // цвет кружка
              extraClass={styles.circle}
              head={getHead(index)}
              tail={getTail(index, element)}
            />
            {index < linkedListElements.length-1 ? <ArrowIcon /> : null}
          </li>
        ))}

      </ul>
    </SolutionLayout>
  );
};
