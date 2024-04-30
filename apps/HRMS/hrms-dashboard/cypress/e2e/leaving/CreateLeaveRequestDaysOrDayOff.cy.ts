describe('assessment page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('1. should select radio button with value of Days or DayOff and move to next step', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');

    cy.get('button')
      .filter('[aria-label]')
      .each(($button) => {
        const ariaLabel = $button.attr('aria-label');
        if (ariaLabel?.includes('Choose date')) {
          cy.wrap($button).click();
        }
      });
    cy.contains('.MuiPickersDay-root', '20').click();

    cy.get('[data-cy="name-select-input"]').click();
    cy.get('ul[role="listbox"]').eq(0).click();

    cy.get('[data-cy="type-select-input"]').click();
    cy.get('ul[role="listbox"]').eq(0).click();

    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('[data-cy="radioButtonDays"]').click();
    cy.get('[data-cy="radioButtonDayOff"]').click();
    cy.get('[data-cy="next-btn"]').click();
  });

  it('1. should return to Previous step', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');

    cy.get('button')
      .filter('[aria-label]')
      .each(($button) => {
        const ariaLabel = $button.attr('aria-label');
        if (ariaLabel?.includes('Choose date')) {
          cy.wrap($button).click();
        }
      });
    cy.contains('.MuiPickersDay-root', '20').click();

    cy.get('[data-cy="name-select-input"]').click();
    cy.get('ul[role="listbox"]').eq(0).click();

    cy.get('[data-cy="type-select-input"]').click();
    cy.get('ul[role="listbox"]').eq(0).click();

    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('[data-cy="returnPreviousStep"]').click();
  });
});
