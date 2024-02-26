type QueueType<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  isEmpty: () => boolean;
  getElements: () => (T | null)[];
  getTail: () => T | null;
};


export class Queue<T> implements QueueType<T> {
  private container: (T | null)[] = []; 
  private head = 0; // переменная для отслеживания начала
  private tail = 0; // переменная для отслеживания конца
  private readonly size: number = 0; // максимально допустимый размер очереди
  private length: number = 0; // length не может превышать size

  constructor(size: number) {
    this.size = size;
    this.container = Array(size); 
  }


  // добавляю элемент в конец очереди
  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } 
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  // обнуляю элемент в начале очереди, возвращаю новый начальный элемент 
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    const item = this.container[this.head];
    delete this.container[this.head];
    this.head++;
    this.length--;
    return item;
  };


  // возвращаю элемент, который лежит в начале очереди
  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };


  // проверяю, пуста ли очередь 
  isEmpty = () => {
    return this.length === 0;
  }


  // возвращаю все элементы массива
  getElements = () => {
    return this.container;
  }


  // возвращаю последний элемент массива
  getTail = () => {
    return this.container[this.length - 1];
  }
}



// Источник: https://codezen.ru/struktura-dannyh-i-realizatsiya-ocheredi-v-javascript
