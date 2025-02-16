export const hasOperationName = (req: any, operationName: string) => {
  const { body } = req;
  return Object.prototype.hasOwnProperty.call(body, 'operationName') && body.operationName === operationName;
};
describe(' order page', () => {
  beforeEach(() => {
    cy.visit('/order/test-order-id');
    localStorage.setItem('user', JSON.stringify({ _id: 'ajksdf;asdfkj' }));
  });
  it('order update successful', () => {
    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (hasOperationName(req, 'OrderUpdate')) {
        req.reply({
          body: { data: {} },
        });
      }
    }).as('gqlUpdateOrder');

    cy.get('[data-cy="order-phone-input"]').should('be.visible');
    cy.get('[data-cy="order-phone-input"]').type('11111111');

    cy.get('[data-cy="order-email-input"]').should('be.visible');
    cy.get('[data-cy="order-email-input"]').type('test@gmail.com');
    cy.get('[data-cy="order-save-input"]').click();
    cy.wait('@gqlUpdateOrder');
  });

  it('order update feild', () => {
    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (hasOperationName(req, 'OrderUpdate')) {
        req.reply({
          body: { error: true },
        });
      }
    }).as('gqlUpdateOrder');

    cy.get('[data-cy="order-phone-input"]').should('be.visible');
    cy.get('[data-cy="order-phone-input"]').type('11111111');

    cy.get('[data-cy="order-email-input"]').should('be.visible');
    cy.get('[data-cy="order-email-input"]').type('test@gmail.com');
    cy.get('[data-cy="order-save-input"]').click();
    cy.wait('@gqlUpdateOrder');
  });

  it('user undefined', () => {
    localStorage.removeItem('user');
    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (hasOperationName(req, 'OrderUpdate')) {
        req.reply({
          body: { error: true },
        });
      }
    }).as('gqlUpdateOrder');

    cy.get('[data-cy="order-phone-input"]').should('be.visible');
    cy.get('[data-cy="order-phone-input"]').type('11111111');
    cy.get('[data-cy="order-email-input"]').should('be.visible');
    cy.get('[data-cy="order-email-input"]').type('test@gmail.com');
    cy.get('[data-cy="order-save-input"]').click();
  });
  it('user history modal ', () => {
    cy.get('[data-cy="order-data"]').should('be.visible');
    cy.get('[data-cy="order-data"]').click();
  });
  it('password update modal ', () => {
    cy.get('[data-cy="order-pass"]').should('be.visible');
    cy.get('[data-cy="order-pass"]').click();
  });
});
