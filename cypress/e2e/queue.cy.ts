import { routes } from "../support/constants";

describe("Queue testing", () => {

  beforeEach("open stack page", () => {
    cy.visit(routes.queue);
  });

  
  it("checks if the add button is disabled while the input is empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить").should("be.disabled");
  });


  it("checks if a new element is being added correctly and animation works on each step", () => {
    cy.get("input").type("33");
    cy.get("button").contains("Добавить").click();

    cy.get("[class*=circle_content]").first().as("firstElement");
    cy.get("@firstElement").contains("33");
    cy.get("@firstElement").contains("head");
    cy.get("@firstElement").contains("tail");
    cy.get("@firstElement").children("[class*=circle_changing]");
    cy.wait(500);
    cy.get("@firstElement").children("[class*=circle_default]");

    cy.get("input").type("44");
    cy.get("button").contains("Добавить").click();
    cy.wait(500);

    cy.get("[class*=circle_content]").should("have.length", 7).each(($element, index) => {
        if (index === 0) {
            cy.wrap($element).contains("33");
            cy.wrap($element).contains("head");
        }
        if (index === 1) {
            cy.wrap($element).contains("44");
            cy.wrap($element).contains("tail");
        }
    });
  });


  it("checks if an element is being removed correctly", () => {
    cy.get("input").type("33");
    cy.get("button").contains("Добавить").click();

    cy.get("[class*=circle_content]").first().as("firstElement");
    cy.get("@firstElement").contains("33");
    cy.get("@firstElement").contains("head");
    cy.get("@firstElement").contains("tail");
    cy.get("@firstElement").children("[class*=circle_changing]");
    cy.wait(500);
    cy.get("@firstElement").children("[class*=circle_default]");

    cy.get("input").type("44");
    cy.get("button").contains("Добавить").click();
    cy.wait(500);

    cy.get("[class*=circle_content]").should("have.length", 7).each(($element, index) => {
      if (index === 0) {
          cy.wrap($element).contains("33");
          cy.wrap($element).contains("head");
      }
      if (index === 1) {
          cy.wrap($element).contains("44");
          cy.wrap($element).contains("tail");
      }
    });

    cy.contains("Удалить").click();
    cy.get("@firstElement").children("[class*=circle_changing]");
    cy.wait(500);

    cy.get("[class*=circle_content]").should("have.length", 7).each(($element, index) => {
      if (index === 0) {
          cy.wrap($element).contains("33").should("not.exist");
      }
      if (index === 1) {
          cy.wrap($element).contains("44");
          cy.wrap($element).contains("head");
          cy.wrap($element).contains("tail");
      }
    });
  });

  
  it("checks if the clear button works correctly", () => {
    cy.get("input").type("33");
    cy.get("button").contains("Добавить").click();
    cy.get("[class*=circle_content]").first().as("firstElement");
    cy.get("@firstElement").contains("33");
    cy.get("@firstElement").contains("head");
    cy.get("@firstElement").contains("tail");
    cy.get("@firstElement").children("[class*=circle_changing]");
    cy.wait(500);
    cy.get("@firstElement").children("[class*=circle_default]");

    cy.get("input").type("44");
    cy.get("button").contains("Добавить").click();
    cy.wait(500);

    cy.get("input").type("55");
    cy.get("button").contains("Добавить").click();
    cy.wait(500);

    cy.get("[class*=circle_content]").should("have.length", 7).each(($element, index) => {
      if (index === 0) {
        cy.wrap($element).contains("33");
        cy.wrap($element).contains("head");  
      }
      if (index === 1) {
        cy.wrap($element).contains("44");
      }
      if (index === 2) {
        cy.wrap($element).contains("55");
        cy.wrap($element).contains("tail");
      }
    });

    // Очищаю очередь
    cy.contains("Очистить").click();

    cy.get("[class*=circle_content]").should("have.length", 7).each(($element, index) => {
      if (index === 0) {
          cy.wrap($element).contains("33").should("not.exist");
          cy.wrap($element).contains("head").should("not.exist");
          cy.wrap($element).contains("tail").should("not.exist");
      }
      if (index === 1) {
        cy.wrap($element).contains("44").should("not.exist");
        cy.wrap($element).contains("head").should("not.exist");
        cy.wrap($element).contains("tail").should("not.exist");
      }
      if (index === 2) {
        cy.wrap($element).contains("55").should("not.exist");
        cy.wrap($element).contains("head").should("not.exist");
        cy.wrap($element).contains("tail").should("not.exist");
      }
    });
  });
});