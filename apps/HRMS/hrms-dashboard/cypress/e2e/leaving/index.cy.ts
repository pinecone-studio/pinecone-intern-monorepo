describe('Leaving page', () => {
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
  //   cy.get('input').eq(0).type('2024-01-01');
  // });

  it('4. should select a date in the DatePicker', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('button')
      .filter('[aria-label]')
      .each(($button) => {
        const ariaLabel = $button.attr('aria-label');
        if (ariaLabel?.includes('choose date')) {
          cy.wrap($button).click();
        }
      });

    // cy.get('button')
    //   .filter('[role]')
    //   .each(($button) => {
    //     const role = $button.attr('role');
    //     if (role?.includes('gridcell')) {
    //       cy.wrap($button).click();
    //     }
    //   });
    // cy.contains('.MuiPickersDay-root', '20').click();
    // cy.get('[aria-label="choose date"]').should('have.value', '20');
  });

  // cy.get('button').invoke('attr', 'aria-label').should('contain', 'choose date');

  // it('Check fixed date selection', () => {
  //   cy.get('button').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('div').contains('Чөлөөний хуудас бөглөх');
  //   // cy.get('input[type=date]').type('2019-09-18');
  //   // Open date picker
  //   cy.get('datepicker').click();
  //   // Select year
  //   cy.get('.react-datepicker__year-select').select('2030');
  //   // Select month
  //   cy.get('.react-datepicker__month-select').select('June');
  //   // Select day
  //   cy.get(`.react-datepicker__day--0${23}`).first().click();
  //   // Assert input date value
  //   cy.get('#datePickerMonthYearInput').should('have.value', '06/23/2030');
  // });

  // it('4. Check if WorkerName is selected', () => {
  //   cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
  //   cy.get('[data-cy="name-select-input"]').click();
  //   cy.get('ul[role="listbox"]').contains('WorkerName').click();
  //   // cy.get('[data-cy="name-select-input"]').should('have.value', 'WorkerName');
  //   cy.get('[data-cy="name-select-input"]').within(() =>
  //     cy
  //       .get('div')
  //       .first()
  //       .within(() => cy.get('div').should('have.value', 'WorkerName'))
  //   );
  // });

  // it('should be clicked and close the modal', () => {
  //   cy.get('button').then(($button) => {
  //     if ($button.find('svg').length > 0) {
  //       cy.wrap($button).click();
  //     } else {
  //       cy.log('Button does not contain svg file');
  //     }
  //   });
  // });

  // it('should be disabled when inputs are empty', () => {
  //   cy.get('button').contains('дараах').click().should('be.disabled');
  // });
});
