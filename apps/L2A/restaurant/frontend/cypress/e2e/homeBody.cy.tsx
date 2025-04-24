import HomeSheet from '@/app/_components/Sheet';
import { mount } from 'cypress/react';

describe('HomeBody Component', () => {
  it('renders HomeSheet component', () => {
    mount(<HomeSheet />);
    cy.get('[data-testid="home-sheet"]').should('exist');
  });
});
