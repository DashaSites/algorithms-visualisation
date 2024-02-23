import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <form>
        <Input>
        </Input>
        <div>
          <Button>

          </Button>
          <Button>

          </Button>
          <Button>

          </Button>
        </div>
      </form>
      <ul>
        <li>
          <Circle>

          </Circle>
        </li>
      </ul>
    </SolutionLayout>
  );
};
