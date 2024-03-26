import { routes } from "../support/constants";

describe("String testing", () => {

  beforeEach("open string page", () => {
    cy.visit(routes.pageString);
  });

  it("checks if the add button is disabled while the input is empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Развернуть").should("be.disabled");
  });

  it("checks if a string is being reversed correctly and animation works on each step", () => {
    cy.get("input").type("dasha");
    cy.get("button").contains("Развернуть").should("not.be.disabled").click();

    // Удостоверилась, что по клику по кнопке отрисовались кружки
    cy.get("[class*=circle_content]").as("outputArray");
    
    const finalArray = ["a", "h", "s", "a", "d"];
    const circleSelector = "[class*=circle_circle]";

    // Проверяю состояние массива после переворачивания: шаг 1
    cy.get("@outputArray").should("have.length", 5).each(($element, index, array) => {
      cy.wrap($element).find(circleSelector).as("circleElement");
      if (index === 0 || index === (array.length-1)) {
        cy.get("@circleElement").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_changing");
        });
      }
    });

    cy.wait(1000);

    // Шаг-2: проверяю состояние
    cy.get("@outputArray").should("have.length", 5).each(($element, index, array) => {
      cy.wrap($element).find(circleSelector).as("circleElement");
      if (index === 0 || index === (array.length-1)) {
        cy.get("@circleElement").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_modified");
        });
      }
      if (index === 1 || index === (array.length-2)) {
        cy.get("@circleElement").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_changing");
        });
      }
    });

    cy.wait(1000);

    // Шаг-3: проверяю состояние
    cy.get("@outputArray").should("have.length", 5).each(($element, index, array) => {
      cy.wrap($element).find(circleSelector).as("circleElement");
      if (index === 1 || index === (array.length-2)) {
        cy.get("@circleElement").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_modified");
        });
      }
      if (index === 2) {
        cy.get("@circleElement").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_changing");
        });
      }
    });

    cy.wait(1000);

    // Шаг-4: проверяю состояние
    cy.get("@outputArray").should("have.length", 5).each(($element) => {
      cy.wrap($element).find(circleSelector).as("circleElement");
      cy.get("@circleElement").invoke("attr", "class").then(classes => {
        expect(classes).to.contain("circle_modified");
      });
    });

    // Проверяю, что текст массива отрендерился правильно
    cy.get("@outputArray").should("have.length", 5).each(($element, index) => {
      cy.wrap($element).find(circleSelector).as("circleElement"); // кружок конкретного элемента
      cy.get("@circleElement").should("have.text", finalArray[index]);
    });
  });
  
});