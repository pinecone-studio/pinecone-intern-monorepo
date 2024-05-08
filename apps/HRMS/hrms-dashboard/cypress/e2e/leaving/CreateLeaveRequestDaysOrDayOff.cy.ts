describe('assessment page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('1. should select radio button with value of Days or DayOff and move to next step', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="date-picker-container"]').type('2000-01-01');
    cy.get('[data-cy="name-select-input"]').select(1);
    cy.get('[data-cy="type-select-input"]').select(1);
    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('[data-cy="radioButtonDays"]').click();
    cy.get('[data-cy="leaveRequestDays"]').should('exist');
    cy.get('[data-cy="starDate-picker-container"]').type('2000-01-01');
    cy.get('[data-cy="endDate-picker-container"]').type('2000-01-05');

    cy.get('[data-cy="radioButtonDayOff"]').click();
    cy.get('[data-cy="leaveRequestDayOff"]').should('exist');
    cy.get('[data-cy="date-picker-container"]').type('2000-01-01');
    cy.get('[data-cy="startHour-picker-container"]').type('12:00');
    cy.get('[data-cy="endHour-picker-container"]').type('13:00');

    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
  });

  it('2. should return to Previous step', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="date-picker-container"]').type('2000-01-01');
    cy.get('[data-cy="name-select-input"]').select(1);
    cy.get('[data-cy="type-select-input"]').select(1);
    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('[data-cy="returnPreviousStep"]').click();
  });
});
