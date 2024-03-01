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
  //deleteFromHead: () => Node<T> | null;
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

  // добавить в конец списка
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

  // добавить в начало списка
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
  // deleteFromHead() {

  // }


}
