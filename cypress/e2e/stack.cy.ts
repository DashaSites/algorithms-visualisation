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

    cy.get("[class*=circle_content]").first().as('firstElement');
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
    })

    //cy.get('.check-box-sub-text').should('not.exist');


  })

});