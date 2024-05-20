describe('assessment page', () => {
  beforeEach(() => cy.visit('/login'));

  it('1.Should display Leave Request btn', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').should('be.visible');
  });

  it('2. Should show Leave Request modal and close the modal', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="modal-closing-btn"]').click();
    cy.get('[data-cy="HomePageHeader"]').should('exist');
  });
  it('3. Should check if date is typed', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="date-picker-container"]').type('2000-01-01');
    cy.get('[data-cy="date-picker-container"]').should('have.value', '2000-01-01');
  });

  it('4. Check if WorkerName is selected', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="name-select-input"]').select(1);
    cy.get('[data-cy="name-select-input"]')
      .invoke('val')
      .then((selectedValue) => {
        return expect(selectedValue).to.exist;
      });
  });

  it('5. Check if type is selected', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="type-select-input"]').select(1);
    cy.get('[data-cy="type-select-input"]')
      .invoke('val')
      .then((selectedValue) => {
        return expect(selectedValue).to.exist;
      });
  });

  it('6. should be clicked and close the modal', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="modal-closing-btn"]').click();
  });

  it('7. should be disabled when inputs are empty', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('button[data-cy="next-btn"]').click();
    cy.get('[data-cy="step1DateError"]').should('contain', 'Огноо оруулна уу');
    cy.get('[data-cy="step1UserNameError"]').should('contain', 'Нэрээ сонгоно уу');
    cy.get('[data-cy="step1LeaveTypeError"]').should('contain', 'Шалтгаанаа сонгоно уу');
    cy.get('button[data-cy="next-btn"]').should('be.disabled');
  });

  it('8. should not be disabled when inputs are filled and be clicked', () => {
    cy.get('input[name="emailorPhone"]').type('tengis@#gmail.com');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.get('[data-cy="sidebarItem"]').contains('Чөлөө').click();
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('[data-cy="request-modal"]').contains('Чөлөөний хуудас бөглөх');
    cy.get('[data-cy="date-picker-container"]').type('2000-01-01');
    cy.get('[data-cy="name-select-input"]').select(1);
    cy.get('[data-cy="type-select-input"]').select(1);
    cy.get('button[data-cy="next-btn"]').should('not.be.disabled').click();
  });
});
