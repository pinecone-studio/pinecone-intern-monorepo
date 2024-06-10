describe('Calculate salary', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('1.Modal should open when click on cal salary button', () => {
    cy.get('[data-testid="calculateBtn"]').should('exist').should('be.visible').click();
    cy.get('[data-testid="modalContent"]').should('exist').should('be.visible');
  });
  it('2. When user enters no value on the inputs ', () => {
    cy.get('[data-testid="calculateBtn"]').should('exist').click();
    cy.get('[data-testid="title"]').contains('Цалингийн мэдээлэл үүсгэх').should('exist');
    cy.get('[data-testid="startDate"]').contains('Эхлэх огноо').should('exist');
    cy.get('[data-testid="chooseStartDay"]').contains('yyy:hh:mm').should('exist').click();
    cy.get('[data-testid="lastdate"]').contains('Дуусах огноо').should('exist');
    cy.get('[data-testid="chooseLastDay"]').contains('yyy:hh:mm').should('exist').click();
    cy.get('[data-testid="SubmitBtn"]').contains('Цалин бодох').should('exist');
  });
  it('3. when user choose start date,start date should display', () => {
    cy.get('[data-testid="calculateBtn"]').should('exist').should('be.visible').click();
    cy.get('[data-testid="chooseStartDay"]').should('exist').click();

    cy.get('[data-testid="chooseLastDay"]').contains('yyy:hh:mm').should('exist').click();
    cy.get('[data-testid="chooseLastDay"]').should('exist').click();
    cy.get('[data-testid="SubmitBtn"]').click();
  });
});
