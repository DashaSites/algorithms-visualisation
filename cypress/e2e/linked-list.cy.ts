import { routes } from "../support/constants";

describe("Linked List testing", () => {

  beforeEach("open linked list page", () => {
    cy.visit(routes.list);
    cy.get("[data-cy='inputValue']").as("inputValue");
    cy.get("[data-cy='inputIndex']").as("inputIndex");
  });

  
  // + 
  it("checks if the add buttons are disabled while the inputs are empty", () => {
    cy.get("@inputValue").should("have.value", "");
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
    cy.get("@inputIndex").should("have.value", "");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
  });


  // + 
  it("checks if the default list is being rendered correctly", () => {
    const expectedDefaultArrayNumbers = ["0", "34", "8", "1"];
    
    // Нашла все output-элементы (кружки с их содержимым) и записала этот массив в алиас
    cy.get("[class*=circle_content]").as("outputArray");
    // Положила в селектор сам кружок, который при анимации будет менять цвет
    const circleSelector = "[class*=circle_circle]";

    // Проверяю первоначальное состояние отрисованного массива:
    cy.get("@outputArray").should("have.length", 4).each(($element, index, array) => {

      // Проверяю, что head и tail стоят на своих местах, а кружки элементов - синего цвета
      cy.wrap($element).as("circleElement");
      if (index === 0) {
        cy.get("@circleElement").should("contain", "0");
        cy.get("@circleElement").should("contain", "head");
        cy.get("@circleElement").should("not.contain", "tail");
        cy.get("@circleElement").find(circleSelector).as("circle");
        cy.get("@circle").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_default");
        });
      } else if (index === 3) {
        cy.get("@circleElement").should("contain", "1");
        cy.get("@circleElement").should("not.contain", "head");
        cy.get("@circleElement").should("contain", "tail");
        cy.get("@circleElement").find(circleSelector).as("circle");
        cy.get("@circle").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_default");
        });
      } else {
        cy.get("@circleElement").should("not.contain", "head");
        cy.get("@circleElement").should("not.contain", "tail");
        cy.get("@circleElement").find(circleSelector).as("circle");
        cy.get("@circle").invoke("attr", "class").then(classes => {
          expect(classes).to.contain("circle_default");
        });
      }

      // Проверяю, что значения (цифры) в массиве тоже какие надо:
      const expectedDefaultArrayNumbers = ["0", "34", "8", "1"];

      const actualArray = []; // На будущее (для видоизмененного массива)
  
      const textTypeCircles = cy.get("[class*=text_type_circle]");
  
      textTypeCircles.then($elements => {
        const countOfElements = $elements.length;
        expect(countOfElements).to.equal(4);
        const elementsTexts = $elements.toArray().map((element) => element.innerText );
        expect(elementsTexts).to.deep.equal(expectedDefaultArrayNumbers); 
      });

    });
  });

  // + 
  it("checks if a new element is being added correctly into head", () => {
    
    cy.get("@inputValue").type("123");
    cy.get("button").contains("Добавить в head").should("not.be.disabled").click();

    // Нашла все элементы с классом circle_content
    cy.get("[class*=circle_content]").as("outputArray");
    // Проверяю, появился ли внутри них розовый кружок
    const circleSelector = "[class*=circle_circle]";
    cy.get("@outputArray").eq(0).find(circleSelector).as("circle");
    cy.get("@circle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    cy.get("@outputArray").eq(0).find(circleSelector).as("circle");
    cy.get("@circle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_modified");
    });

    // Порверяю, что новый массив правильный:
    const actualArray = ["123", "0", "34", "8", "1"];
    const textTypeCircles = cy.get("[class*=text_type_circle]");

    textTypeCircles.then($elements => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(5);
      const elementsTexts = $elements.toArray().map((element) => element.innerText );
      expect(elementsTexts).to.deep.equal(actualArray); 
    });

    // Через секунду большой кружок становится синим
    cy.wait(1000);

    cy.get("@circle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

  });





  




  });
