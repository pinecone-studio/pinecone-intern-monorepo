describe('Chat Page', () => {
  beforeEach(() => {
    cy.visit('/chat');
  });
  it('1) renders the chat UI properly', () => {
    cy.contains('h1', 'Chat').should('be.visible');
    cy.get('input[placeholder="Message"]').should('exist');
    cy.contains('button span.sr-only', 'Send').should('exist');
  });
  it('2) lets the user send a message and renders it', () => {
    const userMsg = 'Hello world';
    cy.get('input[placeholder="Message"]').type(`${userMsg}{enter}`);
    cy.contains(userMsg).should('exist').and('have.class', 'text-white');
  });
  it('3) simulates bot streaming after user message', () => {
    cy.get('input[placeholder="Message"]').type('What is AI?{enter}');

    cy.get('.text-black, .dark\\:text-white').should('exist');

    cy.contains('button span.sr-only', 'Stop').should('exist');
    cy.wait(1000);
    cy.contains('button span.sr-only', 'Send').should('exist');
  });

  it('4) allows stopping the streaming response', () => {
    cy.get('input[placeholder="Message"]').type('Interrupt testInterrupt testInterrupt testInterrupt testInterrupt testInterrupt testInterrupt testInterrupt testInterrupt test{enter}');

    cy.get('button span.sr-only').contains('Stop').parent('button').should('be.visible').click();
    cy.get('button span.sr-only').contains('Send').parent('button').should('be.visible');
  });

  it('5) shows scroll-to-bottom button when scrolled up and scrolls on click', () => {
    for (let i = 0; i < 15; i++) {
      cy.get('input[placeholder="Message"]').type(`Test message ${i}{enter}`);
    }

    cy.wait(500);
    cy.get('main').scrollTo('top');
    cy.contains('button', 'Scroll to Bottom ↓').should('be.visible').click();

    cy.get('main').should('not.contain.text', 'Scroll to Bottom ↓');
  });

  it('6) copies bot message to clipboard', () => {
    const userMsg = 'Give me a fun fact';
    cy.get('input[placeholder="Message"]').type(`${userMsg}{enter}`);
    cy.wait(1000);
    cy.contains('button', 'Copy').click();
  });
});
