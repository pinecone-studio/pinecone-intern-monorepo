describe('CreatePostCard form', () => {
  it('fills out and submits the form correctly', () => {
    cy.visit('/create-post'); 

    cy.get('input[name="name"]').type('Тест байр');
    cy.get('input[name="price"]').type('150000000');
    cy.get('input[name="field"]').type('80');
    cy.get('input[name="room"]').type('3');
    cy.get('input[name="restroom"]').type('2');

    cy.contains('Зар оруулах хүсэлт илгээх').click();

    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('formSubmit');
    });

    cy.get('@formSubmit').should('be.calledWithMatch', {
      name: 'Тест байр',
      price: 150000000,
      field: 80,
      room: 3,
      restroom: 2,
    });
  });
});
