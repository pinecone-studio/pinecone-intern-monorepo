describe('AddClassModal', () => {
  beforeEach(() => {
    cy.visit('/class');
    cy.contains('Анги').click();
  });

  it('renders the modal correctly', () => {
    cy.get('[data-testid="modal-content"]').should('be.visible');
    cy.get('[data-testid="modal-header"]').should('contain', 'Анги нэмэх');
  });

  it('validates required fields', () => {
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="class-name-input"]').parent().should('contain', 'Ангийн нэр оруулна уу');
    cy.get('[data-testid="teacher1-input"]').parent().should('contain', 'Багш 1-н нэр оруулна уу');
    cy.get('[data-testid="teacher2-input"]').parent().should('contain', 'Багш 2-н нэр оруулна уу');
    cy.get('[data-testid="start-date-input"]').parent().should('contain', 'Эхлэх огноо оруулна уу');
    cy.get('[data-testid="end-date-input"]').parent().should('contain', 'Дуусах огноо оруулна уу');
  });

  it('allows input in all fields', () => {
    cy.get('[data-testid="class-name-input"]').should('be.visible').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').should('be.visible').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').should('be.visible').type('Teacher Two');

    // Date picker interactions
    cy.get('[data-testid="start-date-input"]').click();
    cy.get('[name="day"]').contains('27').click();
    cy.get('[data-testid="end-date-input"]').click();
    cy.get('[name="day"]').contains('29').click();

    cy.get('[data-testid="class-name-input"]').should('have.value', 'Test Class');
    cy.get('[data-testid="teacher1-input"]').should('have.value', 'Teacher One');
    cy.get('[data-testid="teacher2-input"]').should('have.value', 'Teacher Two');
    cy.get('[data-testid="start-date-input"]').should('not.have.value', 'Pick a date');
    cy.get('[data-testid="end-date-input"]').should('not.have.value', 'Pick a date');
  });

  it('selects class types correctly', () => {
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'false');

    cy.get('[data-testid="design-radio-container"]').click();

    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'false');

    cy.get('[data-testid="coding-radio-container"]').click();

    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'false');
  });

  it('submits the form with valid data', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateClass') {
        req.reply({
          statusCode: 200,
          body: {
            data: { createClass: {} },
          },
        });
      }
    }).as('graphqlSuccess');
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const today = date.getDate();
    date.setDate(date.getDate() + 2);
    const futureDate = date.getDate();

    cy.get('[data-testid="teacher1-input"]').type('Teacher One');
    cy.get('[data-testid="start-date-input"]').click();
    cy.get('[name="day"]').contains(today).click();
    cy.get('[data-testid="teacher2-input"]').type('Teacher Two');

    cy.get('[data-testid="end-date-input"]').click();
    cy.get('[name="day"]').contains(futureDate).click();

    cy.get('[data-testid="submit-button"]').click();
    cy.visit('/class');
    cy.wait('@graphqlSuccess');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Ангийг амжилттай нэмлээ!');
    });
  });

  it('handles GraphQL errors', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateClass') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'Ангийг нэмэхэд алдаа гарлаа.' }],
          },
          delayMs: 500,
        });
      }
    }).as('graphqlError');

    cy.get('[data-testid="class-name-input"]').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').type('2024-01-01');
    cy.get('[data-testid="end-date-input"]').type('2024-12-31');

    cy.get('[data-testid="submit-button"]').click();

    cy.visit('/class');

    cy.wait('@graphqlError');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Ангийг нэмэхэд алдаа гарлаа.');
    });
  });
});
