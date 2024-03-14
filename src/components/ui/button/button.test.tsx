// import { someFunction } from "./..";

describe("testing component Button", () => { // Тест-сьют = объединение нескольких проверок

  it("Is button with text displayed correctly", () => { // Тест-кейс
    // Arrange
    const a = 1;
    const b = 2;
    const expected = 3;


    // Act
    //const actual = someFunction(a, b);

    // Assert
    // В функцию expect передаю результат вычислений, и после того, как expect отработал,
    // мы можем вызвать ряд методов, чтобы проверить результат.
    // Чтобы запустить этот тест, написать в терминале: npm run test button.test.js
    //expect(actual).toBe(expected);
  })


  it("Is button without text displayed correctly", () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expected = 3;


    // Act
    //const actual = someFunction(a, b);

    // Assert
    //expect(actual).toBe(expected);
  })


  it("Is disabled button displayed correctly", () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expected = 3;


    // Act
    //const actual = someFunction(a, b);

    // Assert
    //expect(actual).toBe(expected);
  })



  it("Is button with loader displayed correctly", () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expected = 3;


    // Act
    //const actual = someFunction(a, b);

    // Assert
    //expect(actual).toBe(expected);
  })



  it("Is callback function being called with button click correctly", () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expected = 3;


    // Act
    //const actual = someFunction(a, b);

    // Assert
    //expect(actual).toBe(expected);
  })
});