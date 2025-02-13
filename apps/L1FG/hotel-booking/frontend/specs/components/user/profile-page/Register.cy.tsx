describe('Register Form', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should render all form fields correctly', () => {
    cy.get('form').should('exist');
    cy.contains('label', 'First name').should('exist');
    cy.contains('label', 'Last name').should('exist');
    cy.contains('label', 'Date of birth').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Update profile');
  });

  describe('First Name Field', () => {
    it('should validate first name length requirements', () => {
      cy.get('input[placeholder="First Name"]').type('a');
      cy.get('button[type="submit"]').click();
      cy.contains('String must contain at least 2 character(s)').should('be.visible');

      cy.get('input[placeholder="First Name"]').clear().type('ChristopherJames');
      cy.contains('String must contain at most 16 character(s)').should('be.visible');

      cy.get('input[placeholder="First Name"]').clear().type('John');
      cy.contains('String must contain').should('not.exist');
    });
  });

  describe('Last Name Field', () => {
    it('should validate last name length requirements', () => {
      cy.get('input[placeholder="Last Name"]').type('a');
      cy.get('button[type="submit"]').click();
      cy.contains('String must contain at least 2 character(s)').should('be.visible');

      cy.get('input[placeholder="Last Name"]').clear().type('ReallyLongLastName');
      cy.contains('String must contain at most 16 character(s)').should('be.visible');

      cy.get('input[placeholder="Last Name"]').clear().type('Doe');
      cy.contains('String must contain').should('not.exist');
    });
  });

  describe('Date of Birth Field', () => {
    it('should open calendar on click', () => {
      cy.contains('button', 'Pick a date').click();
      cy.get('.rdp').should('be.visible');
    });

    it('should select a date', () => {
      cy.contains('button', 'Pick a date').click();

      cy.get('.rdp-day').not('.rdp-day_disabled').first().click();

      cy.get('.rdp').should('not.exist');
      cy.contains('button', 'Pick a date').should('not.exist');
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', () => {
      cy.get('input[placeholder="First Name"]').type('John');
      cy.get('input[placeholder="Last Name"]').type('Doe');
      cy.contains('button', 'Pick a date').click();
      cy.get('.rdp-day').not('.rdp-day_disabled').first().click();

      cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLog');
      });

      cy.get('button[type="submit"]').click();

      cy.get('@consoleLog').should('be.calledOnce');

      cy.get('pre.bg-slate-950').should('exist');
    });

    it('should show error toast on submission failure', () => {
      cy.window().then((win) => {
        cy.stub(win.console, 'error').as('consoleError');
      });

      cy.get('button[type="submit"]').click();

      cy.contains('Failed to submit the form').should('not.exist');
    });
  });

  describe('Responsive Design', () => {
    it('should be responsive across different viewports', () => {
      cy.viewport('iphone-6');
      cy.get('form').should('be.visible');

      cy.viewport('ipad-2');
      cy.get('form').should('be.visible');

      cy.viewport(1024, 768);
      cy.get('form').should('be.visible');
    });
  });

  describe('Form Reset', () => {
    it('should clear form fields properly', () => {
      cy.get('input[placeholder="First Name"]').type('John');
      cy.get('input[placeholder="Last Name"]').type('Doe');
      cy.contains('button', 'Pick a date').click();
      cy.get('.rdp-day').not('.rdp-day_disabled').first().click();

      cy.get('input[placeholder="First Name"]').clear();
      cy.get('input[placeholder="Last Name"]').clear();

      cy.get('input[placeholder="First Name"]').should('have.value', '');
      cy.get('input[placeholder="Last Name"]').should('have.value', '');
    });
  });
});
