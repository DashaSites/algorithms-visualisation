import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./utils";

export const StringComponent: React.FC = () => {

  // 1) РАЗОБРАТЬСЯ С ХУКОМ useForm и применить его?
  // 2) ПЕРЕПИСАТЬ АЛГОРИТМ, ЧТОБЫ ОН ПРИНИМАЛ НА ВХОД МАССИВ, А НЕ СТРОКУ(!)
  // + 3) СДЕЛАТЬ, ЧТОБЫ В МАССИВЕ МЭПИЛИСЬ values из инпута
  // 4) ВНЕДРИТЬ В ВЕРСТКУ АЛГОРИТМ, ЧТОБЫ ОН ЗАРАБОТАЛ
  // 5) ПРИДУМАТЬ, КАК ВНЕДРИТЬ АНИМАЦИЮ

  const [inputValue, setInputValue] = useState("");
  //const [isLoader, setIsLoader] = useState(false);
  //const arrayOfValues = Array.from( /* добавить сюда
  // коллекцию всех значений в инпуте */ );

    const arrayOfValues = Array.from(inputValue.split(""));

    console.log(arrayOfValues);



  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  const turnArrayAround = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    reverseString(arrayOfValues);



    

    // Вызвать мой алгоритм с массивом arrayOfValues как параметр
    
  
    setInputValue("");
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
        
        {/* А здесь будут кружочки */}
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