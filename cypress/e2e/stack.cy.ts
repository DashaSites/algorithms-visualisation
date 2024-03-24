import { routes } from "../support/constants";

describe("Stack testing", () => {

  beforeEach("open stack page", () => {
    cy.visit(routes.stack);
  })

  it("checks if the add button is disabled while the input is empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить").should("be.disabled");
  })

  it("checks if a new element is being added correctly and animation works on each step", () => {

    const circleColoredSelector = "[class*=circle_circle]";
    cy.get("input").type("666").should("have.value", "666");
    cy.contains("Добавить").should("not.be.disabled").click();

    cy.get("[class*=circle_content]").first().as("firstElement");
    cy.get("@firstElement").contains("666");
    cy.get("@firstElement").contains("top");
    cy.get("@firstElement").contains("0");
  

    cy.get("@firstElement").find(circleColoredSelector).as("firstElementCircle");
    cy.get("@firstElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    })

    cy.wait(1000);

    cy.get("@firstElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    cy.get("input").type("777");
    cy.contains("Добавить").click();

    cy.get("[class*=circle_content]").should('have.length', 2).each(($element, index) => {
      if (index === 0) {
        cy.wrap($element).contains("666");
      }
      if (index === 1) {
        cy.wrap($element).contains("777");
        cy.wrap($element).contains("top");
      }
    });
 
    // КАК УДАЛИТЬ: cy.get('.check-box-sub-text').should('not.exist');
  })


  it("checks if an element is being removed correctly", () => {

    const circleColoredSelector = "[class*=circle_circle]";
    // Рендер первого элемента
    cy.get("input").type("10").should("have.value", "10");
    cy.contains("Добавить").click();

    cy.get("[class*=circle_content]").first().as("firstElement");
    cy.get("@firstElement").contains("10");

    cy.get("@firstElement").find(circleColoredSelector).as("firstElementCircle");
    cy.get("@firstElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    })
    cy.wait(1000);
    cy.get("@firstElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // Рендер второго элемента
    cy.get("input").type("20");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").should('have.length', 2);
    cy.get("[class*=circle_content]").last().as("lastElement");

    /// Удаление
    cy.contains("Удалить").should("not.be.disabled").click();
     // Проверка, что кружок второго элемента загорелся розовым
    cy.get("@lastElement").find(circleColoredSelector).as("lastElementCircle");
    cy.get("@lastElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);
    // Проверка, что в массиве остался один элемент
    cy.get("[class*=circle_content]").should('have.length', 1);
    // И у него есть строковые значения "10", "top" и "0"
    cy.get("@firstElement").contains("10");
    cy.get("@firstElement").contains("top");
    cy.get("@firstElement").contains("0");
    // А его кружок - синий
    cy.get("@firstElement").find(circleColoredSelector).as("firstElementCircle");
    cy.get("@firstElementCircle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    })
  })


});