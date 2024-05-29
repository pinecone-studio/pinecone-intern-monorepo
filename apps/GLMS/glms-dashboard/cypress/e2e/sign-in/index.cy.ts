describe('articles page', () => {
  beforeEach(() => cy.visit('/sign-in'));

  it('1. Should display signin form', () => {
    cy.get('[data-testid="sign-in-form-container"]').should('exist').should('be.visible');
  });

  it('2. When user enters no value on the inputs and click on the sign in button, it should display an error messages', () => {
    cy.get('[data-cy="Sign-In-Button"]').should('exist');
    cy.get('[data-cy="Sign-In-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').click();
    cy.get('input[name="password"]').click();
    cy.get('[data-testid="helperText"]').eq(0).should('exist');
    cy.get('[data-testid="helperText"]').eq(0).should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
    cy.get('input[name="emailOrPhoneNumber"]').click();
    cy.get('[data-testid="helperText"]').eq(1).should('exist');
    cy.get('[data-testid="helperText"]').eq(1).should('contain', 'Нууц үгээ оруулна уу');
  });

  it("3. When user clicks on the signin button with same emailOrPhonenumber, password and confirmPassword, it should shows 'Имэйл/Утас эсвэл нууц үг буруу байна' message ", () => {
    cy.get('[data-cy="Sign-In-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('input[name="password"]').type('12345678aB!');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.contains('Имэйл/Утас эсвэл нууц үг буруу байна').should('be.visible');
  });

  it("4. When user clicks on the signin button, it should create new user and shows 'Амжилттай нэвтэрлээ' message", () => {
    cy.get('[data-cy="Sign-In-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('hadabagi85@gmail.com');
    cy.get('input[name="password"]').type('hi');
    cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-In-Button"]').click();
    cy.contains('Амжилттай нэвтэрлээ').should('be.visible');
  });
});
