describe('GuestOptions Component', () => {
  beforeEach(() => {
    // Adjust this according to your actual route/component mounting
    cy.visit('/');
  });

  it('opens the guest options popover and displays initial counts', () => {
    cy.get('[data-cy=guest-options-trigger]').click();
    cy.get('[data-cy=guest-options-content]').should('be.visible');
    cy.get('[data-cy=adult-count]').should('contain.text', '1');
    cy.get('[data-cy=room-count]').should('contain.text', '1');
  });

  it('increments and decrements adult and room counts correctly', () => {
    cy.get('[data-cy=guest-options-trigger]').click();

    // Increment adults
    cy.get('[data-cy=increment-adults]').click();
    cy.get('[data-cy=adult-count]').should('contain.text', '2');

    // Decrement adults
    cy.get('[data-cy=decrement-adults]').click();
    cy.get('[data-cy=adult-count]').should('contain.text', '1');

    // Increment rooms
    cy.get('[data-cy=increment-rooms]').click();
    cy.get('[data-cy=room-count]').should('contain.text', '2');

    // Decrement rooms
    cy.get('[data-cy=decrement-rooms]').click();
    cy.get('[data-cy=room-count]').should('contain.text', '1');
  });

  it('updates guest info text after changing values', () => {
    cy.get('[data-cy=guest-options-trigger]').click();
    cy.get('[data-cy=increment-adults]').click();
    cy.get('[data-cy=increment-rooms]').click();

    cy.get('[data-cy=guest-options-done]').click();
    cy.get('[data-cy=guest-options-info]').should('contain.text', '2 travellers, 2 rooms');
  });

  it('closes the popover on Done click', () => {
    cy.get('[data-cy=guest-options-trigger]').click();
    cy.get('[data-cy=guest-options-done]').click();
    cy.get('[data-cy=guest-options-content]').should('not.exist');
  });
});
