import { interceptGraphql } from 'cypress/utils/intercept-graphql';
/// <reference types="cypress" />
import { MailSlurp } from "mailslurp-client";

Cypress.Commands.add("createInbox", () => {
  const apiKey = "12c8e8588d9aef25e4b31fcf6c5b900f56aa5caca499bad4c14cb874ac3e17e1";
  const mailslurp = new MailSlurp({ apiKey });

  return cy.wrap(mailslurp.createInbox());
});

Cypress.Commands.add("waitForLatestEmail", (inboxId: string) => {
  const apiKey = "12c8e8588d9aef25e4b31fcf6c5b900f56aa5caca499bad4c14cb874ac3e17e1";
  const mailslurp = new MailSlurp({ apiKey });

  return cy.wrap(
    mailslurp.waitForLatestEmail(inboxId, 30000, true)
  );
});

Cypress.Commands.add('interceptGraphql', interceptGraphql);
