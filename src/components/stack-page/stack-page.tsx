import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";

export const StackPage: React.FC = () => {





const testStack = [2, 5, 4, 7, 8, 3, 77]

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
            />
            <p className={styles.subscript}>Максимум — 4 символа</p>
          </div>
          <Button
            text="Добавить" 
            type="button"
          />
          <Button 
            text="Удалить" 
            type="button"
          />
        </div>
        <div>
          <Button 
            text="Очистить" 
            type="button"
          />
        </div>
      </form>

      <ul className={styles.circlesBlock}>
        {testStack.map((element, index) => (
          <li key={index}>
            <Circle
              index={index}
              letter={String(element)}
              //head={} сделать проверку: если это последний элемент, то над ним написано "top"
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
