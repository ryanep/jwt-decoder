/// <reference types="cypress"/>

describe('decoder', () => {
  it('should display page', () => {
    cy.visit('/');
    cy.get('#encoded').should('exist');
    cy.get('#decoded').should('exist');
  });
});
