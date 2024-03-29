import { routes } from "../support/constants";

describe("Linked List testing", () => {

  beforeEach("open linked list page", () => {
    cy.visit(routes.list);
    cy.get("[data-cy='inputValue']").as("inputValue");
    cy.get("[data-cy='inputIndex']").as("inputIndex");
  });


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


  it("checks if the default list is being rendered correctly", () => {
    // Нашла все output-элементы и записала этот массив в алиас
    cy.get("[class*=circle_content]").as("outputArray");
    // Положила в селектор сам кружок, который при анимации будет менять цвет
    const circleSelector = "[class*=circle_circle]";

    // Проверяю первоначальное состояние отрисованного массива:
    cy.get("@outputArray").should("have.length", 4).each(($element, index) => {

      // Проверяю, что head и tail стоят на своих местах, а кружки - синего цвета
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

      // Проверяю, что значения во всем массиве правильные:
      const expectedDefaultArrayNumbers = ["0", "34", "8", "1"];
  
      const textTypeCircles = cy.get("[class*=text_type_circle]");
  
      textTypeCircles.then($elements => {
        const countOfElements = $elements.length;
        expect(countOfElements).to.equal(4);
        const elementsTexts = $elements.toArray().map((element) => element.innerText );
        expect(elementsTexts).to.deep.equal(expectedDefaultArrayNumbers); 
      });

    });
  });


  it("checks if a new element is being added correctly into head", () => {
    cy.get("@inputValue").type("123");
    cy.get("button").contains("Добавить в head").should("not.be.disabled").click();

    // Нашла все круглые элементы
    cy.get("[class*=circle_content]").as("outputArray");
    // Проверяю, появился ли у первого из них розовый кружок
    cy.get("@outputArray").eq(0).find("[class*=circle_circle]").as("circle");
    cy.get("@circle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

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

    // У первого элемента есть надпись head, а у последнего - tail
    cy.get("@outputArray").eq(0).should("contain", "head");
    cy.get("@outputArray").eq(4).should("contain", "tail");
  });


  it("checks if a new element is being added correctly into tail", () => {    
    cy.get("@inputValue").type("456");
    cy.get("button").contains("Добавить в tail").should("not.be.disabled").click();

    cy.get("[class*=circle_content]").as("outputArray");
    const circleSelector = "[class*=circle_circle]";
    cy.get("@outputArray").eq(3).find(circleSelector).as("circleForth");
    cy.get("@circleForth").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    cy.get("@outputArray").eq(4).find(circleSelector).as("circleFifth");
    cy.get("@circleFifth").invoke("attr", "class").then(classes => {
       expect(classes).to.contain("circle_modified");
    });

    // Порверяю, что новый массив правильный:
    const actualArray = ["0", "34", "8", "1", "456"];
    const textTypeCircles = cy.get("[class*=text_type_circle]");

    textTypeCircles.then($elements => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(5);
      const elementsTexts = $elements.toArray().map((element) => element.innerText );
      expect(elementsTexts).to.deep.equal(actualArray); 
    });

    // Через секунду зеленый кружок становится синим
    cy.wait(1000);

    cy.get("@circleFifth").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // У первого элемента есть надпись head, а у последнего - tail
    cy.get("@outputArray").eq(0).should("contain", "head");
    cy.get("@outputArray").eq(4).should("contain", "tail");
  });


  it("checks if a new element is being added by index correctly", () => {
    cy.get("@inputValue").type("789");
    cy.get("@inputIndex").type("1");
    cy.get("button").contains("Добавить по индексу").should("not.be.disabled").click();

    // Нашла все круглые элементы
    cy.get("[class*=circle_content]").as("outputArray");
    // Проверяю, появился ли у первого из них розовый кружок
    const circleSelector = "[class*=circle_circle]";
    cy.get("@outputArray").eq(0).find(circleSelector).as("circleFirst");
    cy.get("@circleFirst").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    cy.get("@circleFirst").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    cy.get("@outputArray").eq(1).find(circleSelector).as("circleSecond");
    cy.get("@circleSecond").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    cy.get("@circleSecond").invoke("attr", "class").then(classes => {
       expect(classes).to.contain("circle_modified");
    });

    // Порверяю, что новый массив правильный:
    const actualArray = ["0", "789", "34", "8", "1"];
    const textTypeCircles = cy.get("[class*=text_type_circle]");

    textTypeCircles.then($elements => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(5);
      const elementsTexts = $elements.toArray().map((element) => element.innerText );
      expect(elementsTexts).to.deep.equal(actualArray); 
    });

    // Через секунду зеленый кружок становится синим
    cy.wait(1000);

    cy.get("@circleSecond").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // У первого элемента есть надпись head, а у последнего - tail
    cy.get("@outputArray").eq(0).should("contain", "head");
    cy.get("@outputArray").eq(4).should("contain", "tail");
  });


  it("checks if a new element is being removed correctly from head", () => {
    cy.get("button").contains("Удалить из head").should("not.be.disabled").click();

    cy.get("[class*=circle_content]").as("outputArray");
    cy.get("@outputArray").eq(0).find("[class*=circle_small]").as("circle");
    cy.get("@circle").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    // Порверяю, что новый массив правильный:
    const actualArray = ["34", "8", "1"];
    const textTypeCircles = cy.get("[class*=text_type_circle]");

    textTypeCircles.then($elements => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(3);
      const elementsTexts = $elements.toArray().map((element) => element.innerText );
      expect(elementsTexts).to.deep.equal(actualArray); 
    });

    // Все большие кружки - синие
    cy.get("[class*=circle_circle]").as("circleElements");
    cy.get("@circleElements").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // У первого элемента есть надпись head, а у последнего - tail
    cy.get("@outputArray").eq(0).should("contain", "head");
    cy.get("@outputArray").eq(2).should("contain", "tail");
  });


  it("checks if a new element is being removed correctly from tail", () => {
    cy.get("button").contains("Удалить из tail").should("not.be.disabled").click();

    // Нашла все круглые элементы
    cy.get("[class*=circle_content]").as("outputArray");
    // Проверяю, появился ли у последнего из них розовый кружок
    cy.get("@outputArray").eq(3).find("[class*=circle_small]").as("circleSmall");
    cy.get("@circleSmall").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    // Порверяю, что новый массив правильный:
    const actualArray = ["0", "34", "8"];
    const textTypeCircles = cy.get("[class*=text_type_circle]");

    textTypeCircles.then($elements => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(3);
      const elementsTexts = $elements.toArray().map((element) => element.innerText );
      expect(elementsTexts).to.deep.equal(actualArray); 
    });

    // Все большие кружки - синие
    cy.get("[class*=circle_circle]").as("circleElements");
    cy.get("@circleElements").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // У первого элемента есть надпись head, а у последнего - tail
    cy.get("@outputArray").eq(0).should("contain", "head");
    cy.get("@outputArray").eq(2).should("contain", "tail");
  });


  it("checks if an element is being removed by index correctly", () => {
    cy.get("@inputIndex").type("1");
    cy.get("button").contains("Удалить по индексу").should("not.be.disabled").click();

    // Нашла все круглые элементы
    cy.get("[class*=circle_content]").as("outputArray");
    // Проверяю, стал ли первый кружок розовым
    const circleSelector = "[class*=circle_circle]";
    cy.get("@outputArray").eq(0).find(circleSelector).as("circleFirst");
    cy.get("@circleFirst").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);
    // Стал ли второй кружок розовым
    cy.get("@outputArray").eq(1).find(circleSelector).as("circleSecond");
    cy.get("@circleSecond").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    cy.get("@circleSecond").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });
    // Появился ли у второго элемента маленький розовый кружок
    cy.get("@outputArray").eq(1).find("[class*=circle_small]").as("circleSmall");
    cy.get("@circleSmall").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_changing");
    });

    cy.wait(1000);

    // Порверяю, что новый массив правильный:
    const actualArray = ["0", "8", "1"];
    const textTypeCircles = cy.get("[class*=text_type_circle]");

    textTypeCircles.then($elements => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(3);
      const elementsTexts = $elements.toArray().map((element) => element.innerText );
      expect(elementsTexts).to.deep.equal(actualArray); 
    });

    // Все большие кружки - синие
    cy.get(circleSelector).as("circleElements");
    cy.get("@circleElements").invoke("attr", "class").then(classes => {
      expect(classes).to.contain("circle_default");
    });

    // У первого элемента есть надпись head, а у последнего - tail
    cy.get("@outputArray").eq(0).should("contain", "head");
    cy.get("@outputArray").eq(2).should("contain", "tail");
  });

});
