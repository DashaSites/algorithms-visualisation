import { routes } from "../support/constants";

describe("Finonacci sequence testing", () => {

  beforeEach("open fibonacci page", () => {
    cy.visit(routes.fibonacci);
  })

  it("checks if the add button is disabled while the input is empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Рассчитать").should("be.disabled");
  })

  it("checks if the fibonacci sequence is being generated correctly", () => {
    cy.get("input").type("5").should("have.value", "5");
    cy.contains("Рассчитать").should("not.be.disabled").click();

    const expectedArray = [1, 1, 2, 3, 5, 8];
    const expectedArrayJson = JSON.stringify(expectedArray);
    const actualFibonacciArray = [];
    const circleSelector = "[class*=circle_circle]"; // в названии класса фигурирует 'circle_circle'

    cy.wait(7000);
    
    // По селектору li найдет все li на странице:
    cy.get("li").should("have.length", 6).as("actualArray");
    cy.get("@actualArray").each(($element: string, index: number) => {
      // метод find() найдет все дочерние элементы с таким селектором:
      cy.get($element).find(circleSelector).as("circleElement"); // здесь он будет один
      cy.get("@circleElement").should("have.text", expectedArray[index]);
    });
  })

});