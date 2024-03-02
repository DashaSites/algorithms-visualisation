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
  //deleteTail: () => Node<T> | null;
  //addByIndex: (element: T, index: number) => void;
  //deleteByIndex: (index: number) => void;
  getSize: () => number;
  toArray: () => T[]; // возвращаю массив с нодами
};

export class LinkedList<T> implements LinkedListType<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

 
  // вернуть последний элемент из списка
  getTail = () => {
    let current: Node<T> | null = this.head;
    while (current?.next) {
      current = current.next;
    }
    return current;
  };



  // + Добавить элемент в конец списка
  append(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } 

    if (this.tail) {
      this.tail.next = node;
    }

    this.tail = node;

    this.size++;
  }

  // Добавить элемент в начало списка
  prepend(element: T) {
    const node = new Node(element, this.head);

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.size++;
  }


  // Удалить первый элемент из списка
  deleteHead() {
    if (this.head === null) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) { // если в списке минимум два элемента
      this.head = this.head.next;
    } else { // если в списке всего один элемент
      this.head = null;
    }

    this.size--;
    return deletedHead;
  }




  deleteTail() {
    if (this.head === null) {
      return null;
    }

    // Получить элемент tail и положить его в переменную
    // Если список состоит из одного элемента (head === tail), то обнулить heaf
    // Положить this.head во временную переменную current
    // Итерироваться по списку, пока current не сравняется с tail, увеличивая
    // этот показатель на единицу
    // Обнулить последний элемент: current.next = null
    // Присвоить последнему элементу значение current: tail = current
    // ДЛЯ ЭТОГО НАДО СОХРАНИТЬ tail В КОНСТРУКТОРЕ



  }


  // Вернуть размер списка
  getSize = () => {
    return this.size;
  }


  // Вернуть весь список в массиве
  toArray = () => {
    let myArray = [];
    let current = this.head;

    while (current) { // итерируемся столько раз, сколько есть элементов
      myArray.push(current.value);
      current = current.next;
    }

    return myArray;
  }







}
