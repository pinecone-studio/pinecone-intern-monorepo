import { ClassType } from '@/generated';

describe('ClassCardTab Component', () => {
  beforeEach(() => {
    // Mock the GraphQL query
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetClasses') {
        req.reply({
          data: {
            getClasses: [
              { id: '1', name: 'Coding Class', classType: ClassType.Coding },
              { id: '2', name: 'Design Class', classType: ClassType.Design },
              { id: '3', name: 'Mixed Class', classType: ClassType.Coding },
            ],
          },
        });
      }
    }).as('getClasses');

    // Visit the page containing the ClassCardTab component
    cy.visit('/'); // Assuming the component is on the home page
    cy.wait('@getClasses');
  });

  it('renders the component', () => {
    cy.get('[data-testid="class-card-tab"]').should('exist');
  });

  it('displays the search input', () => {
    cy.get('input[placeholder="Сурагч, Анги, гэх/м..."]').should('exist');
  });

  it('displays the tabs', () => {
    cy.get('button').contains('Бүгд').should('exist');
    cy.get('button').contains('Кодинг').should('exist');
    cy.get('button').contains('Дизайн').should('exist');
  });

  it('displays the "Add Class" button', () => {
    cy.get('button').contains('Анги').should('exist');
  });

  it('displays class cards when data is loaded', () => {
    cy.get('.grid-cols-4').should('exist');
    cy.get('.grid-cols-4').children().should('have.length.gt', 0);
  });

  it('filters classes when tabs are clicked', () => {
    cy.get('button').contains('Кодинг').click();
    cy.get('.grid-cols-4').children().should('have.length.gt', 0);

    cy.get('button').contains('Дизайн').click();
    cy.get('.grid-cols-4').children().should('have.length.gt', 0);

    cy.get('button').contains('Бүгд').click();
    cy.get('.grid-cols-4').children().should('have.length.gt', 0);
  });

  it('displays loading state', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetClasses') {
        req.reply({
          delay: 1000,
          data: { getClasses: [] },
        });
      }
    }).as('getClassesDelayed');

    cy.visit('/');
    cy.contains('Loading...').should('be.visible');
    cy.wait('@getClassesDelayed');
  });

  it('displays error state', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetClasses') {
        req.reply({
          forceNetworkError: true,
        });
      }
    }).as('getClassesError');

    cy.visit('/');
    cy.wait('@getClassesError');
    cy.contains('Error').should('be.visible');
  });

  it('allows searching', () => {
    cy.get('input[placeholder="Сурагч, Анги, гэх/м..."]').type('Coding');
    // Note: Implement search functionality in the component and update this test
  });
});
