

// Нода, в которой хранится пара value и next
export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

type LinkedListType<T> = {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => Node<T> | null;
  deleteTail: () => Node<T> | null;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
  toArray: () => T[]; // возвращаю массив с нодами
};

export class LinkedList<T> implements LinkedListType<T> { 
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor(initialArrayToRender: T[]) { // Первоначальный массив приходит из компонента
    this.head = null;
    this.tail = null;
    this.size = 0;
    // Каждый из передаваемых элементов массива помещаю в список
    initialArrayToRender.forEach(element => this.append(element));
  }



  // ++ вернуть последний элемент
  getTail = () => {
    let current: Node<T> | null = this.head;
    while (current?.next) {
      current = current.next;
    }
    return current?.value;
  };



  // ++ Добавить элемент в конец списка
  append(element: T) {
    const node = new Node(element);

    if (!this.head) {
      this.head = node;
    } 

    if (this.tail) {
      this.tail.next = node;
    }

    this.tail = node;

    this.size++;

  }



  // ++ Добавить элемент в начало списка
  prepend(element: T) {
    const node = new Node(element, this.head);

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.size++;

    return this;
  }



  // ++ Удалить первый элемент из списка
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) { // если в списке минимум два элемента
      this.head = this.head.next;
    } else { // если в списке всего один элемент
      this.head = null;
      this.tail = null;
    }

    this.size--;
    return deletedHead;
  }



  // ++ Удалить последний элемент из списка
  deleteTail() {
    if (!this.head) {
      return null;
    }

    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    // найти предпоследний элемент списка и сделать его новым хвостом
    let current = this.head;
    while (current.next) {
      if (!current.next.next) {
        current.next = null;
      } else {
        current = current.next;
      }
    }

    this.tail = current;
    this.size--;

    return deletedTail;
  }



  // ++ Добавить элемент по индексу
  addByIndex = (element: T, index: number) => {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      
      if (index === 0) { // добавить элемент в начало списка
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head; // начало отсчета, чтобы добраться до нужного индекса
        let currentIndex = 0;
        
        while (currentIndex < index) {
          currentIndex++;
          if (current?.next !== null && currentIndex !== index) {
            if (current) {
              current = current.next;
            }
          }
        }

        // добавить элемент по индексу
        if (current) {
          node.next = current.next;
          current.next = node;
        }
      }
      this.size++;
    }
    return this;
  }



  // ++ Удалить элемент по индексу
  deleteByIndex = (index: number) => {

    if (index < 0 || index >= this.size) {
      console.log('Enter a valid index');
      return;
    }

    if (!this.head) {
      return null;
    }

    let removedNode;

    if (index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
    } else { // если индекс больше ноля и валидный
      let previous = this.head;
      for (let i = 0; i < index-1; i++) {
        previous = previous.next!;
      }
      removedNode = previous.next;
      previous.next = removedNode!.next;

    }
    this.size--;
    console.log(removedNode)
    return removedNode;
  }



  // ++ Вернуть размер списка
  getSize = () => {
    return this.size;
  }



  // ++ Вернуть весь список в массиве
  toArray = () => {
    let outputArray = [];
    let current = this.head;

    while (current) { // итерируемся столько раз, сколько есть элементов
      outputArray.push(current.value);
      current = current.next;
    }

    return outputArray;
  }

}
