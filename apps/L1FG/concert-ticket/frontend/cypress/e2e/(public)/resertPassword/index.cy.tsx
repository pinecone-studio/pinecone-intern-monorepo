/* eslint-disable no-secrets/no-secrets */
import { hasOperationName } from 'cypress/support/app.po';

describe('resers password page', () => {
  beforeEach(() => {
    cy.visit('/resetPassword');
  });
  // it('1.should render page', () => {
  //   cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
  //     if (hasOperationName(req, 'RequestChangePassword')) {
  //       req.reply({ body: { data: {} } });
  //     }
  //   }).as('gqlRequestChangePassword');
  //   cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
  //     if (hasOperationName(req, 'UpdateForgetPasswordInput')) {
  //       req.reply({ body: { data: {} } });
  //     }
  //   }).as('gqlUpdateForgetPasswordInput');

  //   cy.get('[data-cy="forget-email-input"]').should('be.visible');
  //   cy.get('[data-cy="forget-email-input"]').type('email@gmail.com');
  //   cy.get('[data-cy="forget-button"]').click();
  //   cy.wait('@gqlRequestChangePassword');
  //   cy.get('[data-cy="otp-code"]').first().should('be.visible');
  //   cy.get('[data-cy="otp-code"]').each(($el, index) => {
  //     cy.wrap($el).type(`${index + 1}`);
  //   });
  //   cy.get('[data-cy="otp-next"]').click();
  //   cy.wait('@gqlUpdateForgetPasswordInput');
  // });
  it('2.email input error messgae', () => {
    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (hasOperationName(req, 'RequestChangePassword')) {
        req.reply({
          body: { error: true },
        });
      }
    }).as('gqlRequestChangePassword');
    cy.get('[data-cy="forget-email-input"]').should('be.visible');
    cy.get('[data-cy="forget-email-input"]').type('email@gmail.com');
    cy.get('[data-cy="forget-button"]').click();
    cy.wait('@gqlRequestChangePassword');
  });
  // it('3.otp back input ', () => {
  //   cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
  //     if (hasOperationName(req, 'RequestChangePassword')) {
  //       req.reply({ body: { data: {} } });
  //     }
  //   }).as('gqlRequestChangePassword');

  //   cy.get('[data-cy="forget-email-input"]').should('be.visible');
  //   cy.get('[data-cy="forget-email-input"]').type('email@gmail.com');
  //   cy.get('[data-cy="forget-button"]').click();
  //   cy.wait('@gqlRequestChangePassword');
  //   cy.get('[data-cy="otp-code"]').first().should('be.visible');
  //   cy.get('[data-cy="otp-code"]').each(($el, index) => {
  //     cy.wrap($el).type(`${index + 1}`);
  //   });
  //   cy.get('[data-cy="otp-code"]').each(($el, index) => {
  //     cy.wrap($el).type(`${index - 1}`);
  //   });
  //   cy.get('[data-cy="otp-code"]').eq(5).type('{backspace}');

  //   cy.get('[data-cy="otp-code"]').eq(5).should('have.value', '');

  //   cy.get('[data-cy="otp-back"]').click();
  // });
  // it('5.should render page', () => {
  //   cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
  //     if (hasOperationName(req, 'RequestChangePassword')) {
  //       req.reply({ body: { data: {} } });
  //     }
  //   }).as('gqlRequestChangePassword');
  //   cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
  //     if (hasOperationName(req, 'UpdateForgetPasswordInput')) {
  //       req.reply({ body: { data: {} } });
  //     }
  //   }).as('gqlUpdateForgetPasswordInput');

  //   cy.get('[data-cy="forget-email-input"]').should('be.visible');
  //   cy.get('[data-cy="forget-email-input"]').type('email@gmail.com');
  //   cy.get('[data-cy="forget-button"]').click();
  //   cy.wait('@gqlRequestChangePassword');
  //   cy.get('[data-cy="otp-code"]').first().should('be.visible');
  //   cy.get('[data-cy="otp-code"]').each(($el, index) => {
  //     cy.wrap($el).type(`${index + 1}`);
  //   });
  //   cy.get('[data-cy="otp-next"]').click();
  //   cy.wait('@gqlUpdateForgetPasswordInput');
  //   cy.get('[data-cy="password"]').should('be.visible');
  //   cy.get('[data-cy="password"]').type('111111');
  //   cy.get('[data-cy="rePassword"]').should('be.visible');
  //   cy.get('[data-cy="rePassword"]').type('111111');
  //   cy.get('[data-cy="CreateNewPassword"]').click();
  // });
});
