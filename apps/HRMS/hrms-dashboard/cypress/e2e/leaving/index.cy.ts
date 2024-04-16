describe('Leaving page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('1.Should display Leave Request btn', () => {
    cy.get('button').contains('Чөлөөний хуудас бөглөх').should('be.visible');
  });

  it('2. Should be clicked and show Leave Request modal', () => {
    cy.get('button').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('div').contains('Чөлөөний хуудас бөглөх');
  });
  // it('3. Should check if first input is date', () => {
  //   cy.get('button').contains('Чөлөөний хуудас бөглөх').click();
  //   cy.get('div').contains('Чөлөөний хуудас бөглөх');
  //   cy.get('input').eq(0).type('2024-01-01');
  // });

  it('Check fixed date selection', () => {
    cy.get('button').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('div').contains('Чөлөөний хуудас бөглөх');
    // cy.get('input[type=date]').type('2019-09-18');
    // Open date picker
    cy.get('datepicker').click();
    // Select year
    cy.get('.react-datepicker__year-select').select('2030');
    // Select month
    cy.get('.react-datepicker__month-select').select('June');
    // Select day
    cy.get(`.react-datepicker__day--0${23}`).first().click();
    // Assert input date value
    cy.get('#datePickerMonthYearInput').should('have.value', '06/23/2030');
  });

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
