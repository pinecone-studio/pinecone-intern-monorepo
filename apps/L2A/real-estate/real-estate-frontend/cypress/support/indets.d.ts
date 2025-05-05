/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  import { CallQueryProps } from 'cypress/utils/call-query';
  import { InterceptGraphqlType } from 'cypress/utils/intercept-graphql';
  import { Email } from 'mailslurp-client';

  interface Chainable {
    /**
     * Creates a new MailSlurp inbox
     * @example cy.createInbox().then(inbox => ...)
     */
    createInbox(): Chainable<{ id: string; emailAddress: string }>;

    /**
     * Waits for the latest email in an inbox
     * @example cy.waitForLatestEmail(inbox.id).then(email => ...)
     */
    waitForLatestEmail(inboxId: string): Chainable<Email>;

    /**
     * Intercepts GraphQL requests
     */
    interceptGraphql(): void;
  }
  
  interface Chainable<Subject> {
    interceptGraphql(props: InterceptGraphqlType): void;
  }
}