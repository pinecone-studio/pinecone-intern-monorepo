import { mount } from 'cypress/react';
import { ScrollToBottom } from '@/components/chat/ScrollToBottom';

describe('ScrollToBottom Component', () => {
  it('should render scroll button and call scroll handler', () => {
    const onScroll = cy.stub().as('onScrollToBottom');

    mount(<ScrollToBottom onClick={onScroll} />);

    cy.contains('Scroll to Bottom').click();
    cy.get('@onScrollToBottom').should('have.been.calledOnce');
  });
});
