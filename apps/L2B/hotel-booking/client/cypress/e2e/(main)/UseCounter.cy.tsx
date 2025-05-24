import React from 'react';
import CounterTestComponent from '../_components/CounterTestComponents';

describe('useCounter Hook', () => {
  it('initializes with default value and increments/decrements properly', () => {
    cy.mount(<CounterTestComponent />);

    cy.get('[data-cy=count]').should('contain.text', '1');

    // Test increment
    cy.get('[data-cy=increment]').click();
    cy.get('[data-cy=count]').should('contain.text', '2');

    // Test decrement
    cy.get('[data-cy=decrement]').click();
    cy.get('[data-cy=count]').should('contain.text', '1');

    // Try to decrement below min (1)
    cy.get('[data-cy=decrement]').click();
    cy.get('[data-cy=count]').should('contain.text', '1'); // should not go below 1
  });
});
