import { initiateResetPassword, enterOTPAndSetNewPassword, handleErrorsAndEdgeCases1, handleErrorsAndEdgeCases2 } from './helper-function.cy';
describe('articles page', () => {
  beforeEach(() => cy.visit('/reset-password'));

  it('1. Should display reset-form-1', () => {
    cy.get('[data-testid="reset-form1-container"]').should('exist').should('be.visible');
  });
  it('2. When user enters no value on the inputs and click on the send mail button, it should display an error messages', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
  });
  it('3. When user types on the email input clicks on button, it should show success message', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    cy.contains('Амжилттай илгээгдлээ').should('be.visible');
  });
  it('4. Should display reset-form-2', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    cy.contains('Амжилттай илгээгдлээ').should('be.visible');
    cy.get('[data-testid="reset-form2-container"]').should('exist').should('be.visible');
  });
  it('4.5. When user clicks on Resend button, it should send otp again', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    cy.contains('Амжилттай илгээгдлээ').should('be.visible');
    cy.get('[data-testid="reset-form2-container"]').should('exist').should('be.visible');
    cy.get('[data-cy="Reset-Form2-Again-Button"]').should('exist').click();
    cy.contains('Амжилттай илгээгдлээ').should('be.visible');
  });
  it('5. When user enters no value on the inputs and click on the reset-form2 button, it should display an error messages', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
  });
  it('6. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    cy.get('input[name="code"]').type('1234');
    cy.contains('Нууц үг сэргээх кодоо оруулна уу').should('not.exist');
  });
  it('7. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
  });
  it('8. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
  });
  it('9. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('111111');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой');
  });
  it('10. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('11111111');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Жижэг үсэг байх ёстой');
  });
  it('11. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('11111111q');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Том үсэг байх ёстой');
  });
  it('12. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('11111111qQ');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Тусгай тэмдэгт байх ёстой');
  });
  it('13. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('11111111qQ!');
  });
  it('14. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('11111111qQ!');
    cy.get('input[name="reNewPassword"]').type('11111');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үг буруу байна');
  });
  it('15. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('11111111qQ!');
    cy.get('input[name="reNewPassword"]').type('11111111qQ!');
  });
  it('16. When user types on the OTP input, an error message should disappear', () => {
    initiateResetPassword('Имэйл хаяг аа оруулна уу');
    enterOTPAndSetNewPassword('donotdelete498@gmail.com');
    handleErrorsAndEdgeCases1('Нууц үг сэргээх кодоо оруулна уу');
    handleErrorsAndEdgeCases2('1234');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form3-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Нууц үгээ оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ давтаж оруулна уу');
    cy.get('input[name="newPassword"]').type('11111111qQ!');
    cy.get('input[name="reNewPassword"]').type('11111111qQ!');
    cy.get('[data-cy="Reset-Form3-Button"]').should('exist').click();
    cy.contains('Нэг удаагын код буруу байна').should('be.visible');
  });
});
