describe('personal information', () => {
  const props = {
    lastName: 'М.Ганбат',
    email: 'Zoloosoko0526@gmail.com',
  };
  beforeEach(() => cy.visit('/employee-details'));
  it('should update button', () => {
    cy.get('[data-testid="personal-Information-test"]').should('exist').and('have.text', 'Хувийн мэдээлэл');
  });

  it('lastname text', () => {
    cy.get('[data-testid="lastName-text"]').should('exist').and('have.text', props.lastName);
  });

  it('phoneNumber text', () => {
    cy.get('[data-testid="phoneNumber-text"]').should('exist').and('have.text', '+97680556021');
  });

  it('email text', () => {
    cy.get('[data-testid="email-text"]').should('exist').and('have.text', props.email);
  });

  it('address text', () => {
    cy.get('[data-testid="address-text"]').should('exist').and('have.text', 'Ulaanbaatar ,Mongolia');
  });
});
