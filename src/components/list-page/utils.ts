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
  deleteFromHead: () => Node<T> | null;
  //deleteFromTail: () => Node<T> | null;
  //addByIndex: (element: T, index: number) => void;
  //deleteByIndex: (index: number) => void;
  //getSize: () => number;
};

export class LinkedList<T> implements LinkedListType<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    // СОХРАНИТЬ tail В КОНСТРУКТОРЕ!
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

  // добавить элемент в конец списка
  append(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      const tail = this.getTail()!;

      tail.next = node;
    }
    this.size++;
  }

  // добавить элемент в начало списка
  prepend(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }


  // удалить первый элемент из списка
  deleteFromHead() {
    if (this.head === null) {
      return null;
    }

    const deletedElement = this.head;

    if (this.head.next) { // если в списке минимум два элемента
      this.head = this.head.next;
    } else { // если в списке всего один элемент
      this.head = null;
    }

    this.size--;
    return deletedElement;
  }




  deleteFromTail() {
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







}
