describe('Personal Information Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/graphql', (req) => {
      if (req.body.operationName === 'GetUser') {
        req.reply({
          data: {
            getUser: {
              id: '682207ae2c5870fba2e6da4c',
              firstName: 'John sdadsadsadsa',
              lastName: 'Doe',
              birth: '1995-01-01T00:00:00.000Z',
            },
          },
        });
      }

      if (req.body.operationName === 'UpdatePersonalInformation') {
        req.reply({
          data: {
            updatePersonalInformation: {
              id: '682207ae2c5870fba2e6da4c',
              success: true,
            },
          },
        });
      }
    });

    cy.visit('/profile?userId=123');
  });

  it('1. should display personal information form', () => {
    cy.get('[data-cy="Personal-Information-Page"]').should('exist');
    cy.contains('Personal Information').should('exist');
  });

  it('2. should display personal information form', () => {
    cy.get('[data-cy="Personal-Information-Page"]').should('exist');
  });

  it('3. When user does not enter firstname, it should display error message', () => {
    cy.get('[data-cy=Personal-First-Name-Input]').clear().should('have.value', '');
    cy.get('[data-cy=Personal-Update-Button]').click();
    cy.get('[data-cy=Personal-First-Name-Input-Error-Message]').should('be.visible').and('contain', 'First name must be at least 2 characters');
  });

  it('4. When user does not enter lastname, it should display error message', () => {
    cy.get('[data-cy=Personal-Last-Name-Input]').clear().should('have.value', '');
    cy.get('[data-cy=Personal-Update-Button]').click();
    cy.get('[data-cy=Personal-Last-Name-Input-Error-Message]').should('be.visible').and('contain', 'Last name must be at least 2 characters');
  });

  it('5. updates personal information successfully', () => {
    cy.get('[data-cy=Personal-First-Name-Input]').clear().type('Jane');
    cy.get('[data-cy=Personal-Last-Name-Input]').clear().type('Smith');
    cy.get('[data-cy=Personal-Birth-Drop-Down]').click();

    cy.contains('button', '25').click();

    cy.wait(1000);

    cy.get('form').submit();

    cy.contains('Successfully updated!').should('be.visible');
  });

  it('6. If no data is returned, form should not be filled', () => {
    cy.visit('/profile');

    cy.get('[data-cy=Personal-First-Name-Input]').type('Jane');
    cy.get('[data-cy=Personal-Last-Name-Input]').type('Smith');
    cy.get('[data-cy=Personal-Birth-Drop-Down]').click();

    cy.contains('button', '25').click();

    cy.wait(1000);

    cy.get('form').submit();
  });

  it('7. If data user has no firsname', () => {
    cy.intercept('POST', 'api/graphql', (req) => {
      if (req.body.operationName === 'GetUser') {
        req.reply({
          data: {
            getUser: {
              id: '682207ae2c5870fba2e6da4c',
              firstName: null,
              lastName: null,
              birth: null,
            },
          },
        });
      }
    });

    cy.contains('Personal Information').should('exist');
    cy.wait(1000);
  });
});
