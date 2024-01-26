import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./utils";

export const StringComponent: React.FC = () => {

  // 1) Сделать, чтобы в массиве мэпились не values из инпута, а перевернутый массив
  // из этих values

  // 2) Применить для этого хук useForm?

  // 3) Разобраться с анимацией


  const [inputValue, setInputValue] = useState("");
  //const [isLoader, setIsLoader] = useState(false);

   // Складываю в массив коллекцию всех values в инпуте
    const arrayOfValues = Array.from(inputValue.split(""));
    console.log(arrayOfValues);



  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  const turnArrayAround = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Вызываю мой алгоритм с массивом, полученным из стейта
    const reversedArray = reverseString(arrayOfValues);
    
    // Здесь возникает проблема: массив в кружках отображается только тогда,
    // когда меняется стейт (он же - values в инпутах). А так не должно быть.
    setInputValue(reversedArray.join(""));

    return reversedArray;
  }



  return (
    <SolutionLayout title="Строка">
        <form className={styles.inputBlock} onSubmit={turnArrayAround}>
          <div className={styles.inputSubBlock}>
            <Input maxLength={11} 
                   type ="text" 
                   extraClass ={styles.input}
                   value={inputValue}
                   onChange={onInputChange} 
            />
            <p className={styles.subscript}>
              Максимум — 11 символов
            </p>
          </div>
          <Button 
            text="Развернуть" 
            type="submit"
          />
        </form>
        
        {/* Кружочки со values инпута */}
        <ul className={styles.circlesBlock}>
               
          {arrayOfValues.map((element, index) => (
            <li key={index} className={styles.circleElement}>
              <Circle
                letter={element}
              />
            </li>
          ))}
          

        </ul>
    </SolutionLayout>
  );
};