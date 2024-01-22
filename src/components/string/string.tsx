import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";

export const StringComponent: React.FC = () => {





  
  return (
    <SolutionLayout title="Строка">
      <div className={styles.inputAndButtonBox}>
        <Input className={styles.input} />

      </div>
     
    </SolutionLayout>
  );
};
