import { ClassType } from '@/generated';

describe('Index Page', () => {
  beforeEach(() => {
    // Mock the API response for ClassCardTab
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetClasses') {
        req.reply({
          data: {
            getClasses: [
              {
                id: '1',
                name: 'Test Class 1',
                startDate: '2023-01-01',
                endDate: '2023-12-31',
                teachers: ['Teacher 1', 'Teacher 2'],
                classType: ClassType.Coding,
              },
              {
                id: '2',
                name: 'Test Class 2',
                startDate: '2023-02-01',
                endDate: '2023-11-30',
                teachers: ['Teacher 3'],
                classType: ClassType.Design,
              },
            ],
          },
        });
      }
    }).as('getClasses');

    // Visit the index page
    cy.visit('/');
  });

  it('renders the page', () => {
    cy.get('div').should('exist');
  });

  it('contains the ClassCardTab component', () => {
    cy.get('[data-testid="class-card-tab"]').should('exist');
  });

  it('loads class data correctly', () => {
    cy.wait('@getClasses');
    cy.get('[data-testid="class-card"]').should('have.length', 2);
  });

  it('displays class information correctly', () => {
    cy.get('[data-testid="class-card"]')
      .first()
      .within(() => {
        cy.contains('Test Class 1').should('be.visible');
        cy.contains('2023-01-01 - 2023-12-31').should('be.visible');
        cy.contains('Teacher 1').should('be.visible');
        cy.contains('Teacher 2').should('be.visible');
      });
  });

  it('allows filtering of classes', () => {
    cy.get('button').contains('Кодинг').click();
    cy.get('[data-testid="class-card"]').should('have.length', 1);
    cy.contains('Test Class 1').should('be.visible');

    cy.get('button').contains('Дизайн').click();
    cy.get('[data-testid="class-card"]').should('have.length', 1);
    cy.contains('Test Class 2').should('be.visible');

    cy.get('button').contains('Бүгд').click();
    cy.get('[data-testid="class-card"]').should('have.length', 2);
  });

  it('renders correctly on different viewport sizes', () => {
    // Test on mobile
    cy.viewport('iphone-6');
    cy.get('[data-testid="class-card-tab"]').should('be.visible');

    // Test on tablet
    cy.viewport('ipad-2');
    cy.get('[data-testid="class-card-tab"]').should('be.visible');

    // Test on desktop
    cy.viewport(1920, 1080);
    cy.get('[data-testid="class-card-tab"]').should('be.visible');
  });
});
