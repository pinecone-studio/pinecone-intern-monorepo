describe('Contact Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/graphql', (req) => {
      if (req.body.operationName === 'GetUser') {
        req.reply({
          data: {
            getUser: {
              id: '682207ae2c5870fba2e6da4c',
              phone: '12345678',
              email: 'test@email.com',
              emergencyPhone: '87654321',
              relation: 'Parent',
            },
          },
        });
      }

      if (req.body.operationName === 'UpdateContact') {
        req.reply({
          data: {
            updateContact: {
              id: '682207ae2c5870fba2e6da4c',
              success: true,
            },
          },
        });
      }
    });

    cy.visit('/contact?userId=123');
  });

  it('1. should display contact form', () => {
    cy.get('[data-cy="Contact-Page"]').should('exist');
  });

  it('2. When user does not enter phone, it should display error message', () => {
    cy.get('[data-cy="Contact-Phone-Input"]').clear().should('have.value', '');
    cy.get('[data-cy="Contact-Update-Button"]').click();
    cy.get('[data-cy="Contact-Phone-Input-Error-Message"]').should('be.visible').and('contain', 'Phone number must be at least 8 digits.');
  });

  it('3. When user does not enter email, it should display error message', () => {
    cy.get('[data-cy="Contact-Email-Input"]').clear().should('have.value', '');
    cy.get('[data-cy="Contact-Update-Button"]').click();
    cy.get('[data-cy="Contact-Email-Input-Error-Message"]').should('be.visible').and('contain', 'Email is required.');
  });

  it('4. When user does not enter emergencyPhone, it should display error message', () => {
    cy.get('[data-cy="Contact-Emergency-Input"]').clear().should('have.value', '');
    cy.get('[data-cy="Contact-Update-Button"]').click();
    cy.get('[data-cy="Contact-Emergency-Input-Error-Message"]').should('be.visible').and('contain', 'Emergency phone must be at least 8 digits.');
  });

  it('5. When user does not enter relation, it should display error message', () => {
    cy.reload();
    cy.get('[data-cy="Contact-Update-Button"]').click();
    cy.get('[data-cy="Contact-Relation-Select-Error-Message"]').should('be.visible').and('contain', 'Relation is required.');
  });

  it('6. should open the select dropdown', () => {
    cy.get('[data-cy="Contact-Relation-Select"]').click();
    cy.get('[data-cy="SelectItem-Parent"]').should('be.visible');
    cy.get('[data-cy="SelectItem-Sibling"]').should('be.visible');
  });

  it('7. updates contact successfully', () => {
    cy.get('[data-cy="Contact-Phone-Input"]').clear().type('87654321');
    cy.get('[data-cy="Contact-Email-Input"]').clear().type('test@gmail.com');
    cy.get('[data-cy="Contact-Emergency-Input"]').clear().type('12345678');
    cy.get('[data-cy="Contact-Relation-Select"]').click();

    cy.get('[data-cy="SelectItem-Parent"]').click();
    cy.get('[data-cy="Contact-Relation-Select"]').should('contain', 'Parent');

    cy.wait(1000);

    cy.get('form').submit();

    cy.contains('Successfully updated!').should('be.visible');
  });

  it('8. If no data is returned, form should not be filled', () => {
    cy.get('[data-cy="Contact-Phone-Input"]').clear().type('87654321');
    cy.get('[data-cy="Contact-Email-Input"]').clear().type('test@gmail.com');
    cy.get('[data-cy="Contact-Emergency-Input"]').clear().type('12345678');
    cy.get('[data-cy="Contact-Relation-Select"]').click();

    cy.get('[data-cy="SelectItem-Parent"]').click();
    cy.get('[data-cy="Contact-Relation-Select"]').should('contain', 'Parent');

    cy.wait(1000);

    cy.get('form').submit();
  });

  it('9. should not call GetUser if userId is missing', () => {
    cy.intercept('POST', 'api/graphql', (req) => {
      if (req.body.operationName === 'GetUser') {
        req.reply({
          data: {
            getUser: {
              id: '682207ae2c5870fba2e6da4c',
              phone: null,
              email: null,
              emergencyPhone: null,
              relation: null,
            },
          },
        });
      }
    });

    cy.contains('Contact info').should('exist');
    cy.wait(1000);
  });
});
