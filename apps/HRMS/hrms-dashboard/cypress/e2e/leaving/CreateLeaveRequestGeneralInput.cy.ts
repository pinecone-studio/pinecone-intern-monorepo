describe('assessment page', () => {
  beforeEach(() => cy.visit('/leaving'));

  // it('1.Should display Leave Request btn', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').should('be.visible');
  // });

  // it('2. Should show Leave Request modal', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
  // });
  // it('3. Should check if date is typed', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
  //   cy.get('[data-cy="date-picker-container"]').type('2000-01-01');
  //   cy.get('input').eq(0).should('have.value', '2000-01-01');
  // });

  // it('4. Check if WorkerName is selected', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
  //   cy.get('[data-cy="name-select-input"]').select(1);
  //   cy.get('[data-cy="name-select-input"]')
  //     .invoke('val')
  //     .then((selectedValue) => {
  //       return expect(selectedValue).to.exist;
  //     });
  // });

  // it('5. Check if type is selected', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
  //   cy.get('[data-cy="type-select-input"]').select(1);
  //   cy.get('[data-cy="type-select-input"]')
  //     .invoke('val')
  //     .then((selectedValue) => {
  //       return expect(selectedValue).to.exist;
  //     });
  // });

  // it('6. should be clicked and close the modal', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
  //   cy.get('[data-cy="modal-closing-btn"]').click();
  // });

  it('7. should be disabled when inputs are empty', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="date-picker-container"]').should('have.value', '');
    cy.get('[data-cy="type-select-input"]').invoke('val').should('have.value', '');
    cy.get('[data-cy="name-select-input"]').should('have.value', '');
    cy.get('[data-cy="type-select-input"]').should('have.value', '');
    cy.get('button[data-cy="next-btn"]').should('be.disabled');
  });

  // it('8. should not be disabled when inputs are filled and be clicked', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');

  //   cy.get('button')
  //     .filter('[aria-label]')
  //     .each(($button) => {
  //       const ariaLabel = $button.attr('aria-label');
  //       if (ariaLabel?.includes('Choose date')) {
  //         cy.wrap($button).click();
  //       }
  //     });
  //   cy.contains('.MuiPickersDay-root', '20').click();

  //   cy.get('[data-cy="name-select-input"]').click();
  //   cy.get('ul[role="listbox"]').eq(0).click();

  //   cy.get('[data-cy="type-select-input"]').click();
  //   cy.get('ul[role="listbox"]').eq(0).click();

  //   cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
  // });
});
