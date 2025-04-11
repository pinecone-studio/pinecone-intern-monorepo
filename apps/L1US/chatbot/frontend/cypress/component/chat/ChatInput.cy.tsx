import { mount } from 'cypress/react';
import { ChatInput } from '@/components/chat/ChatInput';

describe('ChatInput Component', () => {
  it('should render input and send button', () => {
    const onSend = cy.stub().as('onSendStub');
    const onChange = cy.stub().as('onChangeStub');
    const onStop = cy.stub().as('onStopStub');
    mount(
      <ChatInput
        input=""
        isStreaming={false}
        onChange={() => onChange}
        onSend={() => onSend}
        onStop={() => onStop}
      />
    );

    cy.get('input[type="text"]').should('exist');
    cy.get('button').should('contain.text', 'Send');
  });

  it('should show stop button when streaming', () => {
    const onSend = cy.stub().as('onSendStub');
    const onChange = cy.stub().as('onChangeStub');
    const onStop = cy.stub().as('onStopStub');
    mount(
      <ChatInput
        input="streaming test"
        isStreaming={true}
        onChange={() => onChange}
        onSend={() => onSend}
        onStop={() => onStop}
      />
    );

    cy.get('button').should('contain.text', 'Stop');
  });

  it('should call onSend when Enter is pressed', () => {
    const onChange = cy.stub().as('onChangeStub');
    const onStop = cy.stub().as('onStopStub');
    const onSend = cy.stub().as('onSendStub');
    mount(
      <ChatInput
        input="test"
        isStreaming={false}
        onChange={() => onChange}
        onSend={() => onSend}
        onStop={() => onStop}
      />
    );

    cy.get('input').type('{enter}');
    cy.get('@onSendStub').should('have.been.calledOnce');
  });

  it('should call onStop when Stop button is clicked', () => {
    const onSend = cy.stub().as('onSendStub');
    const onChange = cy.stub().as('onChangeStub');
    const onStop = cy.stub().as('onStopStub');
    mount(
      <ChatInput
        input="streaming test"
        isStreaming={true}
        onChange={() => onChange}
        onSend={() => onSend}
        onStop={() => onStop}
      />
    );

    cy.get('button').contains('Stop').click();
    cy.get('@onStopStub').should('have.been.calledOnce');
  });
});
