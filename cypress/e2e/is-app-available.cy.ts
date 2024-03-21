import { baseURL } from "../support/constants";

describe('Application opening testing', () => {
  it('If my app opens', () => {
    cy.visit(baseURL);
  })
});