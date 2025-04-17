import { mount } from 'cypress/react';
import { ChatMessage } from '@/components/chat/ChatMessage';

describe('ChatMessage Component', () => {
  it('should render a user message', () => {
    mount(<ChatMessage role="user" content="Hello world" />);
    cy.contains('Hello world').should('be.visible');
  });

  it('should render a bot message with copy button', () => {
    const content = 'I am a bot';
    mount(<ChatMessage role="bot" content={content} />);
    cy.contains('I am a bot').should('be.visible');
    cy.contains('Copy').should('be.visible');
  });

  it('should call onCopy when Copy button is clicked', () => {
    mount(<ChatMessage role="bot" content="copy me" />);
    cy.contains('Copy').click();
    cy.get('@onCopyStub').should('have.been.calledOnce');
  });
});
