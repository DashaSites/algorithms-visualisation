import { baseURL } from "../support/constants";

describe('Application availability testing', () => {
  it('checks if my app opens', () => {
    cy.visit(baseURL);
  })
});