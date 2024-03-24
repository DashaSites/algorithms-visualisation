import { routes } from "../support/constants";

describe('Routing testing', () => {
  
  it('checks if string page opens', () => {
    cy.visit(routes.pageString);
  });

  it('checks if fibonacci page opens', () => {
    cy.visit(routes.fibonacci);
  });

  it('checks if sorting page opens', () => {
    cy.visit(routes.sorting);
  });

  it('checks if stack page opens', () => {
    cy.visit(routes.stack);
  });

  it('checks if queue page opens', () => {
    cy.visit(routes.queue);
  });

  it('checks if list page opens', () => {
    cy.visit(routes.list);
  });
});