describe('empty spec', () => {
  const addNewTodo = (cy: Cypress.cy & CyEventEmitter, content: string) => {
    cy.get('#new-todo-input').type(content);
    cy.get('#todo-submit-button').click();
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('is able to be opened', () => {
    cy.visit('/');
  });

  it('adds new todos', () => {
    const todoContent = 'This is a new todo';
    addNewTodo(cy, todoContent);
    cy.get('.todo-item').contains(todoContent).should('exist');
    cy.get('#new-todo-input').should('have.value', '');
  });

  it('renders completed todos with strike through', () => {
    addNewTodo(cy, 'A sample todo');
    cy.get('.todo-item').first().find('input').click();
    cy.get('.todo-item-label')
      .first()
      .should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)');
  });

  it('renders how many todos are not completed yet', () => {
    cy.get('#todo-count-label').should('have.text', 'All done!');
    addNewTodo(cy, 'First todo');
    cy.get('#todo-count-label').should('have.text', 'Only 1 task remaining');
    addNewTodo(cy, 'Second todo');
    cy.get('#todo-count-label').should('have.text', '2 tasks remaining');
    cy.get('.todo-item').first().find('input').click();
    cy.get('#todo-count-label').should('have.text', 'Only 1 task remaining');
  });
});
