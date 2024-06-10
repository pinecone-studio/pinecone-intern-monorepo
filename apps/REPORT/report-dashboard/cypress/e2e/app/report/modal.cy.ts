describe('Modal Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200', {
      onBeforeLoad: (win) => {
        win.onerror = null;
      },
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true,
    });
    cy.get('[data-testid="trigger-button"]').click();
  });

  it('opens the dialog on button click', () => {
    cy.get('[data-testid="dialog-content"]').should('be.visible');
  });

  it('should reset the state values when the dialog is closed and reopened', () => {
    cy.get('[data-testid="date-picker-button"]').click();
    cy.get('[data-testid="calendar"] button').then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons[randomIndex]).click({ force: true });
    });
    cy.get('[data-testid="date-picker-button"]').should('not.contain', 'Pick a date');
    cy.get('[data-testid="dialog-content"]').within(() => {
      cy.get('button').contains('Close').click({ force: true });
    });
    cy.get('[data-testid="trigger-button"]').click();
    cy.get('[data-testid="date-picker-button"]').should('contain', 'Pick a date');
  });

  it('allows a random date to be selected', () => {
    cy.get('[data-testid="date-picker-button"]').click();
    cy.get('[data-testid="calendar"] button').then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons[randomIndex]).click({ force: true });
    });
    cy.get('[data-testid="date-picker-button"]').invoke('text').should('not.contain', 'Pick a date');
  });

  it('transitions to next steps after selecting a date', () => {
    cy.get('[data-testid="date-picker-button"]').click();

    cy.get('[data-testid="calendar"] button').then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons[randomIndex]).click({ force: true });
    });

    cy.get('[data-testid="continue-button"]').click();

    cy.get('[data-testid="next-7-days"]').should('be.visible');
  });

  it('toggles checkboxes for next 7 days', () => {
    cy.get('[data-testid="date-picker-button"]').click();
    cy.get('[data-testid="calendar"] button').then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons[randomIndex]).click({ force: true });
    });
    cy.get('[data-testid="continue-button"]').click();
    cy.get('[data-testid="checkbox-0"]').click();
    cy.get('[data-testid="checkbox-0"]').should('have.attr', 'aria-checked', 'true');
  });

  it('enables send report button when at least one day is checked', () => {
    cy.get('[data-testid="date-picker-button"]').click();
    cy.get('[data-testid="calendar"] button').then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons[randomIndex]).click({ force: true });
    });
    cy.get('[data-testid="continue-button"]').click();
    cy.get('[data-testid="checkbox-0"]').click();
    cy.get('[data-testid="send-report-button"]').should('not.be.disabled');
  });

  it('displays console log for selected days', () => {
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });
    cy.get('[data-testid="date-picker-button"]').click();
    cy.get('[data-testid="calendar"] button').then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons[randomIndex]).click({ force: true });
    });
    cy.get('[data-testid="continue-button"]').click();
    cy.get('[data-testid="checkbox-0"]').click();
    cy.get('[data-testid="send-report-button"]').click();
    cy.get('@consoleLog').should(
      'be.calledWith',
      Cypress.sinon.match((msg) => {
        return msg.startsWith('Sending these days:');
      })
    );
  });
});
