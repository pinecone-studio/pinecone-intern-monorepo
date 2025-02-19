/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/// <reference types="cypress" />
import 'cypress-file-upload';

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});
Cypress.Commands.add('login', (email, password) => {
  cy.getByData('login-email-input').type(`${email}`);
  cy.getByData('login-password-input').type(`${password}`);
  cy.getByData('login-submit-button').click();
});

//  cy.intercept('POST', 'api/graphql', (req) => {
//         if (req.body.operationName === 'Login') {

//           req.reply({
//             statusCode: 200,
//             body: {
//               data: {
//                 Login:{}
//               }
//             }
//           });
//         }
//       }).as('GetMatchedUsers');
