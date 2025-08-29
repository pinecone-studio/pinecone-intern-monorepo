import Navigation from '@/app/(public)/navigate/page';

jest.mock('@/components/Navbar', () => ({
  Navbar: () => <div data-testid="mock-navbar">Mock Navbar</div>,
}));

describe('<Navigation />', () => {
  it('renders navbar', () => {
    cy.mount(<Navigation />);
    cy.get('[data-testid=mock-navbar]').should('exist');
  });

  it('renders order details title', () => {
    cy.mount(<Navigation />);
    cy.contains('Захиалгын дэлгэрэнгүй').should('exist');
  });

  it('renders order number', () => {
    cy.mount(<Navigation />);
    cy.contains('#31321').should('exist');
  });

  it('renders order status', () => {
    cy.mount(<Navigation />);
    cy.contains('Бэлтгэгдэж буй').should('exist');
  });

  it('renders order date', () => {
    cy.mount(<Navigation />);
    cy.contains('2024.10.19 12:37').should('exist');
  });

  it('renders food items with price', () => {
    cy.mount(<Navigation />);
    cy.get('p').contains('Taco').should('exist');
    cy.get('p').contains('15.6k').should('exist');
  });

  it('renders quantity controls', () => {
    cy.mount(<Navigation />);
    cy.contains('+').should('exist');
    cy.contains('-').should('exist');
  });
});
