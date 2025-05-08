describe('CreatePostCard form', () => {
  beforeEach(() => {
    cy.visit('/create-post');
  });

  it('should show validation messages when submitting empty form', () => {
    cy.contains('Зар оруулах хүсэлт илгээх').click();

    cy.contains('Төрлөө сонгоно уу').should('exist');
    cy.contains('Нэр заавал оруулна уу').should('exist');
    cy.contains('Үнэ заавал оруулна уу').should('exist');
    cy.contains('Талбайн утгыг заавал оруулна уу').should('exist');
    cy.contains('Өрөөний тоог заавал оруулна уу').should('exist');
    cy.contains('Ариун цэврийн өрөөний тоог заавал оруулна уу').should('exist');
  });

  it('should submit the form with valid inputs', () => {
     cy.window().then((win) => {
       cy.spy(win.console, 'log').as('consoleLog');
     });
     
    cy.get('input[name="name"]').type('Туршилтын байр');
    cy.get('input[name="price"]').type('150000000');
    cy.get('input[name="field"]').type('80');
    cy.get('input[name="room"]').type('3');
    cy.get('input[name="restroom"]').type('2');

    cy.get('[data-testid="type"]').click();
    cy.get('[data-testid="type-option-apartment"]').click();

    cy.contains('Зар оруулах хүсэлт илгээх').click();

    cy.get('@consoleLog').should('be.calledWithMatch', {
      name: 'Туршилтын байр',
      price: 150000000,
      field: 80,
      room: 3,
      restroom: 2,
      type: 'apartment',
    });
  });
});
