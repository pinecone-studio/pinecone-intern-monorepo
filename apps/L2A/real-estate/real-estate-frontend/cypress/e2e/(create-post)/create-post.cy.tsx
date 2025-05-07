describe('CreatePostCard form', () => {
  beforeEach(() => {
    cy.visit('/create-post');
  });

  it('shows validation errors when submitting empty form', () => {
    cy.contains('Зар оруулах хүсэлт илгээх').click();

    cy.contains('Төрлөө сонгоно уу').should('be.visible');
    cy.contains('Нэр заавал оруулна уу').should('be.visible');
    cy.contains('Үнэ заавал оруулна уу').should('be.visible');
    cy.contains('Талбайн утгыг заавал оруулна уу').should('be.visible');
    cy.contains('Өрөөний тоог заавал оруулна уу').should('be.visible');
    cy.contains('Ариун цэврийн өрөөний тоог заавал оруулна уу').should('be.visible');
  });

 it('submits the form when all fields are filled correctly', () => {
  cy.window().then((win) => {
    cy.stub(win.console, 'log').as('consoleLog');
  });

  cy.get('[data-testid="type"]').click();
  cy.contains('Орон сууц').click();

  cy.get('input[name="name"]').type('Саруул хотхон 3 өрөө');
  cy.get('input[name="price"]').type('200000000');
  cy.get('input[name="field"]').type('80');
  cy.get('input[name="room"]').type('3');
  cy.get('input[name="restroom"]').type('2');

  cy.contains('Зар оруулах хүсэлт илгээх').click();

  cy.get('@consoleLog').should('have.been.calledWithMatch', {
    name: 'Саруул хотхон 3 өрөө',
    price: '200000000',
    field: '80',
    room: '3',
    restroom: '2',
  });
});
});
