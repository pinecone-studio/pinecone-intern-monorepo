import { mount } from 'cypress/react';
import { Message } from '@/components/chat/Message';

describe('Message Component', () => {
  it('should render input and send button', () => {
    mount(<Message />);
    cy.get('input[type="text"]').should('exist').and('have.attr', 'placeholder', 'Message');
    cy.get('button').should('exist').and('contain.text', 'Send');
  });

  it('should not send message when input is empty', () => {
    mount(<Message />);
    cy.get('button').contains('Send').click();
    cy.get('.user-message').should('not.exist');
  });

  it('should add a user message on send', () => {
    mount(<Message />);
    cy.get('input[type="text"]').type('Hello world');
    cy.get('button').contains('Send').click();
    cy.contains('Hello world').should('be.visible');
  });

  it('should scroll to bottom button appear when user scrolls up', () => {
    mount(<Message />);

    for (let i = 0; i < 20; i++) {
      cy.get('input[type="text"]').type(`Test ${i}{enter}`);
    }

    cy.get('[data-testid="chat-container"]').scrollTo('top');
    cy.contains('Scroll to Bottom').should('be.visible');
  });

  it('should stop streaming when stop button is clicked', () => {
    mount(<Message />);
    cy.get('input[type="text"]').type('test streaming{enter}');

    cy.get('button').contains('Stop').click();
    cy.get('button').contains('Send').should('be.visible');
  });
});
