import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";


describe("Circle component testing", () => {
  // без буквы
  it("Is circle without letter displayed correctly", () => { 
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // с буквами
  it("Is circle with letter displayed correctly", () => { 
    const tree = renderer.create(<Circle letter="Something" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // с head
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle head="top" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // с react-элементом в head
  it("Is circle with react element in head displayed correctly", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // с tail
  it("Is circle with tail displayed correctly", () => { 
    const tree = renderer.create(<Circle tail="tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // с react-элементом в tail
  it("Is circle with react element in tail displayed correctly", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // с index
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle index={3} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // с пропом isSmall === true
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // со стейтом default
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // со стейтом changing
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  // со стейтом modified
  it("Is circle with head displayed correctly", () => { 
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});