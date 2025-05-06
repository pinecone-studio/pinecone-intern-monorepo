describe('CreatePostCard Form', () => {
  beforeEach(() => {
    cy.visit('/create-post');
  });

  it('should show validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('[name="name"]').siblings('.error-message').should('contain', 'Нэр заавал оруулна уу');
    cy.get('[name="price"]').siblings('.error-message').should('contain', 'Үнэ заавал оруулна уу');
    cy.get('[name="field"]').siblings('.error-message').should('contain', 'Талбайн утгыг заавал оруулна уу');
    cy.get('[name="room"]').siblings('.error-message').should('contain', 'Өрөөний тоог заавал оруулна уу');
    cy.get('[name="restroom"]').siblings('.error-message').should('contain', 'Ариун цэврийн өрөөний тоог заавал оруулна уу');
  });

  it('should show a specific error when the price is invalid', () => {
    cy.get('[name="name"]').type('Test Property');
    cy.get('[name="price"]').type('-5');
    cy.get('[name="field"]').type('50');
    cy.get('[name="room"]').type('3');
    cy.get('[name="restroom"]').type('2');

    cy.get('button[type="submit"]').click();

    cy.get('[name="price"]').siblings('.error-message').should('contain', 'Үнэ 0-ээс их байх ёстой');
  });

  it('should submit the form with valid data', () => {
    cy.get('[name="name"]').type('Test Property');
    cy.get('[name="price"]').type('1000');
    cy.get('[name="field"]').type('50');
    cy.get('[name="room"]').type('3');
    cy.get('[name="restroom"]').type('2');

    cy.window().then((window) => {
      cy.spy(window.console, 'log');
    });

    cy.get('button[type="submit"]').click();

    cy.window().its('console.log').should('be.calledWith', 'Form data', {
      name: 'Test Property',
      price: '1000',
      field: '50',
      room: '3',
      restroom: '2',
    });
  });
});
