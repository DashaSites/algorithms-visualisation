import { routes } from "../support/constants";

describe("Queue testing", () => {

  beforeEach("open stack page", () => {
    cy.visit(routes.queue);
  })

  
  it("checks if the add button is disabled while the input is empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить").should("be.disabled");
  })


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

  })


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

  /*
  it("checks if the clear button works correctly", () => {

    const circleColoredSelector = "[class*=circle_circle]";
    // Добавляю первый элемент
    cy.get("input").type("1");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").first().as("firstElement");
    cy.get("@firstElement").contains("1");

    cy.get("@firstElement").find(circleColoredSelector).as("firstElementCircle");
    cy.get("@firstElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    })
    cy.wait(1000);
    cy.get("@firstElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // Добавляю второй элемент
    cy.get("input").type("2");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").should('have.length', 2);
    cy.get("[class*=circle_content]").last().as("lastElement");
    cy.get("@lastElement").find(circleColoredSelector).as("lastElementCircle");
    cy.get("@lastElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    })
    cy.wait(1000);
    cy.get("@lastElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // Добавляю третий элемент
    cy.get("input").type("3");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").should('have.length', 3);
    cy.get("[class*=circle_content]").last().as("lastElement");
    cy.get("@lastElement").contains("3");
    cy.get("@lastElement").find(circleColoredSelector).as("lastElementCircle");
    cy.get("@lastElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    })
    cy.wait(1000);
    cy.get("@lastElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // Очищаю стек
    cy.contains("Очистить").click();
    cy.get("[class*=circle_content]").should('have.length', 0);
  });

  */
});