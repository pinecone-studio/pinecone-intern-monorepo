import { ClassType } from '@/generated';

describe('Index Page', () => {
  beforeEach(() => {
    // Visit the index page
    cy.visit('/');
  });

  it('renders the page', () => {
    cy.get('div').should('exist');
  });

  it('contains the ClassCardTab component', () => {
    cy.get('[data-testid="class-card-tab"]').should('exist');
  });
});
