

describe('articles page', () => {
  beforeEach(() => cy.visit('/signup'));

  it('1. Should display signup form', () => {
    cy.get('[data-testid="sign-up-form-container"]').should('exist').should('be.visible');
  });
  it('2. When user enters no value on the inputs and click on the sign up button, it should display an error messages', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(2).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
  });

  it('3. When the user types an invalid email or phone number in the emailOrPhoneNumber input, it should display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
    cy.get('input[name="emailOrPhoneNumber"]').type('1234');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг байх ёстой');
  });

  it('4. When user types on the emailOrPhoneNumber input, an error message should disappear', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.contains('Утас эсвэл имэйл хаяг оруулна уу').should('not.exist');
  });

  it('5. When user types on the password input, it should display an error message saying it has to be more than 8 characters', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('input[name="password"]').type('1234567');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой');
  });

  it('6. When user types on the password input with 7 digit, it should display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('input[name="password"]').type('1234567');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой');
  });

  it('7. When user types on the password input with no lowercase letter, it should display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('input[name="password"]').type('12345678');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Жижэг үсэг байх ёстой');
  });

  it('8. When user types on the password input with no uppercase letter, it should display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('input[name="password"]').type('12345678a');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Том үсэг байх ёстой');
  });

  it('9. When user types on the password input with no special character, it should display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('input[name="password"]').type('12345678aB');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Тусгай тэмдэгт байх ёстой');
  });

  it('10. When password, confirmPassword does not match, it should display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('input[name="password"]').type('12345678aB!');
    cy.get('input[name="confirmPassword"]').type('12345678!');
    cy.get('[data-testid="helperText"]').eq(2).should('exist').should('contain', 'Нууц үг буруу байна');
  });

  it('11. When password, confirmPassword matchs, it should not display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('input[name="password"]').type('12345678aB!');
    cy.get('input[name="confirmPassword"]').type('12345678aB!');
    cy.get('[data-cy="Sign-Up-Button"]').should('not.be.disabled');
  });
});

