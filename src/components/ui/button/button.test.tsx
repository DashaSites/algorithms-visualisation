import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from "./button";


describe("Button component testing", () => {

  it("Is button with text displayed correctly", () => {
    const tree = renderer.create(<Button text="Какой-то текст" />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it("Is button without text displayed correctly", () => {
    const tree = renderer.create(<Button text="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it("Is disabled button displayed correctly", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it("Is button with loader displayed correctly", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it("Is a callback function being called correctly with a buttonclick", () => {
    const someFunction = jest.fn(); // моковая функция
    render(<Button onClick={someFunction} text="Сделать" />);
    const button = screen.getByText("Сделать");
    fireEvent.click(button);
    // if there are some precise arguments given to `someFunction` maybe 
    // use `toHaveBeenCalledWith` instead
    expect(someFunction).toHaveBeenCalled();
  });
});

