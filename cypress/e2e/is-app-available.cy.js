describe('Application opening testing', () => {
  it('Does my app open', () => {
    cy.visit('http://localhost:3000/')
  })
});