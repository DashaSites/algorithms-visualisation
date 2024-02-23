
// Тип элементов, хранящихся в стеке
type StackType<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getElements: () => T[];
};


export class Stack<T> implements StackType<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length) {
       this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length) {
      return this.container[this.container.length-1];
    } else {
     return null; 
    }
  };

  // Длина стека
  getSize = () => this.container.length;

  // Все элементы стека
  getElements = () => {
    return this.container;
  };
}