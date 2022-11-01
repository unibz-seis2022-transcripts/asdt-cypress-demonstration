describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/');
  });

  it('renders completed todos with strike through', () => {
    cy.get('.todo-item').first().find('input').click();
    cy.get('.todo-item')
      .first()
      .should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)');
  });
});
