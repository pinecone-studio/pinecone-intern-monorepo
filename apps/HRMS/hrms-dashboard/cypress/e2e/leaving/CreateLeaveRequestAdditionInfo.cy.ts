describe('assessment page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('1. should disable the button when clicked', () => {
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
    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('button[data-cy="next-btn"]').click();
    cy.get('[data-cy="step3SubstituteError"]').should('contain', 'Ажил шилжүүлэн өгөх ажилтны нэр оруулна уу');
    cy.get('[data-cy="step3WorkBriefError"]').should('contain', 'Шилжүүлэн өгч буй ажлын талаар товч оруулна уу');
    cy.get('[data-cy="step3ApprovedByError"]').should('contain', 'Хүсэлт батлах хүнээ сонгоно уу');
  });

  it('2. should fill Additional information inputs and move to succeeded section', () => {
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
    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('[data-cy="step3Substitute"]').type('Ajiltan-1');
    cy.get('[data-cy="step3WorkBrief"]').type('Shaltgaan-1');
    cy.get('[data-cy="step3ApprovedBy"]').select(1);
    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('[data-cy="LeaveRequestSucceeded"]').contains('Чөлөөний хүсэлт амжилттай илгээгдлээ');
  });

  it('3. should return to Previous step', () => {
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
    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
    cy.get('[data-cy="returnPreviousStep"]').click();
  });
});
