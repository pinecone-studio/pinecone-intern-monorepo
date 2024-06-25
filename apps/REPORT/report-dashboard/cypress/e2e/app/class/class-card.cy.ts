describe('ClassCard Component', () => {
  beforeEach(() => {
    // Mock the API call that fetches the class data
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetClasses') {
        req.reply({
          data: {
            getClasses: [
              {
                __typename: 'Class',
                name: 'Test Class',
                startDate: '2023-01-01',
                endDate: '2023-12-31',
                teachers: ['Teacher 1', 'Teacher 2'],
              },
            ],
          },
        });
      }
    }).as('getClasses');

    // Visit the page that contains the ClassCard component
    cy.visit('http://localhost:4200/');
    cy.wait('@getClasses');
  });

  it('renders the component', () => {
    cy.get('[data-testid="class-card"]').should('exist');
  });

  it('displays the class name', () => {
    cy.get('[data-testid="class-card"] h3').should('have.text', 'Test Class');
  });

  it('displays the class date range', () => {
    cy.get('[data-testid="class-card"] p').first().should('have.text', '2023-01-01 - 2023-12-31');
  });

  it('displays teacher names', () => {
    cy.get('[data-testid="class-card"]').contains('Teacher 1').should('exist');
    cy.get('[data-testid="class-card"]').contains('Teacher 2').should('exist');
  });

  it('renders the correct number of teacher tags', () => {
    cy.get('[data-testid="class-card"] div > div.flex.py-\\[2px\\]').should('have.length', 2);
  });

  it('renders the DropDownMenuButton', () => {
    cy.get('[data-testid="class-card"] button').should('exist'); // Assuming DropDownMenuButton renders a button
  });

  it('has correct styling', () => {
    cy.get('[data-testid="class-card"]')
      .should('have.class', 'flex')
      .and('have.class', 'flex-col')
      .and('have.class', 'items-start')
      .and('have.class', 'gap-[12px]')
      .and('have.class', 'relative')
      .and('have.class', 'w-[416px]')
      .and('have.class', 'p-[24px]')
      .and('have.class', 'border')
      .and('have.class', 'border-[#E0E0E0]')
      .and('have.class', 'bg-[#FFFFFF]')
      .and('have.class', 'rounded-lg')
      .and('have.class', 'group')
      .and('have.class', 'cursor-pointer');
  });

  it('handles missing data gracefully', () => {
    // Mock an API response with incomplete data
    cy.intercept('POST', '/graphql', {
      data: {
        getClasses: [{ name: 'Incomplete Class' }],
      },
    }).as('getIncompleteClasses');

    cy.visit('http://localhost:4200/');
    cy.wait('@getIncompleteClasses');

    cy.get('[data-testid="class-card"] h3').should('have.text', 'Incomplete Class');
    cy.get('[data-testid="class-card"] p').first().should('have.text', ' - ');
    cy.get('[data-testid="class-card"] div > div.flex.py-\\[2px\\]').should('not.exist');
  });
});
