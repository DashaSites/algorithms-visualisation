
type StackType<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getElements: () => T[];
};


export class Stack<T> implements StackType<T> { // <T> БУДЕТ ОБЪЕКТОМ
  
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length) {
       this.container.pop();
    }
  };

  // Возвращает последний добавленный элемент
  peak = (): T | null => {
    if (this.container.length) {
      return this.container[this.container.length-1];
    } else {
     return null; 
    }
  };

  // Возвращает текущую длину стека
  getSize = () => this.container.length;

  // Возвращает массив элементов стека
  getElements = () => {
    return [
      ...this.container
    ];
  };

}