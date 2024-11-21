describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });

  it('Should render the Container component', () => {
    cy.get('[data-cy="Container"]').should('be.visible');
  });
  it('should render profile', () => {
    cy.get('[data-cy=Profile-Page]').click();
  });
  it('Enters all values', () => {
    cy.get('[data-cy=Profile-Phone-Input]').type('number');
    cy.get('[data-cy=Profile-Email-Input]').type('Test@gmail.com');
    cy.get('[data-cy=Profile-Submit-Button]').click();
  });
  it('should render history', () => {
    cy.get('[data-cy=Profile-Page-History]').click();
  });
  it('should render forgetPassword', () => {
    cy.get('[data-cy=Profile-Page-ForgetPassword]').click();
  });
  // it('should allow the input name and select', () => {
  //   cy.get('[data-cy=Profile-Password-Input]').type('test');
  //   cy.get('[data-cy=Profile-Password-Input-icon]').click();
  //   cy.get('[data-cy=Profile-RePassword-Input]').type('test');
  //   cy.get('[data-cy=Profile-RePassword-Input-icon]').click();
  //   cy.get('[data-cy=Profile-New-Password-Input]').type('test');
  //   cy.get('[data-cy=Profile-New-Password-Input-icon]').click();
  //   cy.get('[data-cy=Profile-Submit-Button]').click();
  // });
});
