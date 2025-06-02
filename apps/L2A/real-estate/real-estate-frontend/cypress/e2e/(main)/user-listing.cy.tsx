describe('User Listing Page (via UI login)', () => {
  const email = 'duuavia01@gmail.com';
  const password = 'qwerty';

  beforeEach(() => {
    cy.intercept('POST', '**/api/graphql').as('graphql');

    cy.visit('/signin');
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait('@graphql');
    cy.visit('/user-listing');
    cy.contains('Миний зарууд', { timeout: 10000 }).should('exist');
  });

  it('shows listings and placeholder image when no images present', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'GetPostsByUserId') {
        req.alias = 'getListingsNoImage';
        req.reply({
          data: {
            getPostsByUserId: [
              {
                _id: 'listing-1',
                title: 'Placeholder Test',
                images: [],
                status: 'PENDING',
                price: null,
                propertyOwnerId: 'mock-user-id',
              },
            ],
          },
        });
      }
    });

    cy.visit('/user-listing');
    cy.wait('@getListingsNoImage');
    cy.get('table tbody tr').first().find('img').should('have.attr', 'src').and('include', 'placeholder.png');

    cy.get('table tbody tr').first().contains('Тодорхойгүй');
  });

  it('shows listings and placeholder image when no images present', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'GetPostsByUserId') {
        req.alias = 'getListingsNoImage';
        req.reply({
          data: {
            getPostsByUserId: [
              {
                _id: 'listing-1',
                title: 'Placeholder Test',
                images: [],
                status: null,
                price: null,
                propertyOwnerId: 'mock-user-id',
              },
            ],
          },
        });
      }
    });

    cy.visit('/user-listing');
    cy.wait('@getListingsNoImage');
    cy.get('table tbody tr').first().find('img').should('have.attr', 'src').and('include', 'placeholder.png');
    cy.get('table tbody tr').first().contains('Тодорхойгүй');
  });

  it('filters by status correctly', () => {
    const statuses = ['Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Зарууд'];

    statuses.forEach((statusLabel) => {
      cy.get('button').contains(statusLabel).click({ force: true });
    });
  });

  it('shows action buttons per listing', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('svg').should('have.length.at.least', 3);
    });
  });

  it('filters listings when non-default tab is selected', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'Me') {
        req.reply({ data: { me: { id: 'mock-user-id' } } });
      } else if (req.body.operationName === 'GetPostsByUserId') {
        req.alias = 'getTabFilterData';
        req.reply({
          data: {
            getPostsByUserId: [
              {
                _id: 'listing-2',
                title: 'Filter Test',
                images: [],
                status: 'SOLD',
                price: 1000000,
                propertyOwnerId: 'mock-user-id',
              },
            ],
          },
        });
      }
    });

    cy.visit('/user-listing');
    cy.wait('@getTabFilterData');
    cy.get('button').contains('Зарагдсан').click({ force: true });

    cy.get('table tbody tr').should('have.length', 1);
    cy.contains('Зарагдсан');
  });
});
