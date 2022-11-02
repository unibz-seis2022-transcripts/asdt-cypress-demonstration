describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/');
  });

  it('has an input field to add new todos', () => {
    const todoContent = 'This is a new todo';
    cy.get('#new-todo-input').type(todoContent);
    cy.get('#todo-submit-button').click();
    cy.get('.todo-item').contains(todoContent).should('exist');
    cy.get('#new-todo-input').should('have.value', '');
  });

  it('renders completed todos with strike through', () => {
    cy.get('.todo-item').first().find('input').click();
    cy.get('.todo-item-label')
      .first()
      .should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)');
  });
});
