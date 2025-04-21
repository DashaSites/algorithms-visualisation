### Algorithms Visualisation

A React + TypeScript app that animates the step-by-step execution of classic algorithms and data structure operations. Designed to help users intuitively understand how algorithms work by visualizing each step with animations and color changes.

Includes interactive visualizations for:
- **String reversal** — swap letters with animated two-pointer traversal
- **Fibonacci sequence** — generate numbers with staged appearance
- **Sorting algorithms** — selection and bubble sort, visualized with animated bar movement
- **Stack** — push, pop, and clear operations with dynamic top marker and circle highlights
- **Queue** — enqueue and dequeue with animated head/tail shifts and index labeling
- **Linked list** — insert/delete at head, tail, or by index, animated step-by-step

🔗  [Live demo](https://gorgeous-pika-7c0b56.netlify.app/)

#### Technologies:
- TypeScript
- React
- Custom classes for data structures (Stack, Queue, LinkedList)
- Animation logic using timeouts and state control

Each algorithm is implemented with strict typing and structured data classes. Controls are disabled during animation to prevent interruptions. Visual feedback is provided with loaders and color changes to indicate active, processing, and completed steps.
