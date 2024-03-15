import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";


describe("Circle component testing", () => {

  // БЕЗ БУКВЫ
  it("Is circle without letter displayed correctly", () => { 
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // С БУКВАМИ
  it("Is circle with letter displayed correctly", () => { 
    const tree = renderer.create(<Circle letter="Something" />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // С HEAD
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle head="top" />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // С REACT-ЭЛЕМЕНТОМ В HEAD
  it("Is circle with react element in head displayed correctly", () => {

    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // С TAIL
  it("Is circle with tail displayed correctly", () => { 
    const tree = renderer.create(<Circle tail="tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // С REACT-ЭЛЕМЕНТОМ В TAIL
  it("Is circle with react element in tail displayed correctly", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // С INDEX
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle index={3} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // С ПРОПОМ isSmall === true
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // СО СТЕЙТОМ DEFAULT
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // СО СТЕЙТОМ CHANGING
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // СО СТЕЙТОМ MODIFIED
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});