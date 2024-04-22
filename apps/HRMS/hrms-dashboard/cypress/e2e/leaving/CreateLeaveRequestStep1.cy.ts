describe('assessment page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('1.Should display Leave Request btn', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').should('be.visible');
  });

  it('2. Should show Leave Request modal', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
  });
  it('3. Should check if date is typed', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('input').eq(0).type('12/30/2000');
    cy.get('input').eq(0).should('have.value', '12/30/2000');
  });

  it('4. should select a date in the DatePicker', () => {
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
    cy.get('input[name="step1Date"]').invoke('val').should('contain', '20');
  });

  it('5. should change the year', () => {
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
    cy.get('div[aria-live="polite"]').click();
    cy.get('div[role="radiogroup"]').within(() => cy.get('div').eq(0).click());
  });

  it('6. should go to next and previous month', () => {
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
    cy.get('button[title="Next month"]').click();
    cy.get('button[title="Previous month"]').click();
  });

  it('7. Check if WorkerName is selected', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="name-select-input"]').click();
    cy.get('ul[role="listbox"]').eq(0).click();
    cy.get('input[name="step1UserName"]')
      .invoke('val')
      .then((selectedValue) => {
        expect(selectedValue).to.exist;
      });
  });

  it('8. Check if type is selected', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="type-select-input"]').click();
    cy.get('ul[role="listbox"]').eq(0).click();
    cy.get('input[name="step1LeaveType"]')
      .invoke('val')
      .then((selectedValue) => {
        expect(selectedValue).to.exist;
      });
  });

  it('9. should be clicked and close the modal', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="modal-closing-btn"]').click();
  });

  it('10. should be disabled when inputs are empty', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('input[name=step1UserName]')
      .parent()
      .within(() => cy.get('div').should('have.value', ''));
    cy.get('input[name=step1LeaveType]')
      .parent()
      .within(() => cy.get('div').should('have.value', ''));
    cy.get('button[data-cy="next-btn"]').should('be.disabled');
  });

  it('11. should not be disabled when inputs are filled and be clicked', () => {
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
  });
});
