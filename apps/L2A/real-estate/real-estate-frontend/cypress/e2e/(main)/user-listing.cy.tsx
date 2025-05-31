describe('UserListingPage E2E', () => {
  beforeEach(() => {
    cy.fixture('userListingFallback.json').then((mockData) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'Me') {
          req.reply({ data: { me: { id: 'mock-user-id' } } });
        } else if (req.body.operationName === 'GetPostsByUserId') {
          req.reply(mockData);
        }
      });
    });

    cy.visit('/user-listing');
    cy.contains('Миний зарууд', { timeout: 10000 }).should('exist');
  });

  it('renders header and all status tabs including "Зарууд"', () => {
    const tabs = ['Зарууд', 'Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'];
    tabs.forEach((tab) => {
      cy.contains('button', tab).should('exist');
    });
  });

  it('shows loading skeleton initially', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Me') {
        req.reply({ data: { me: { id: 'mock-user-id' } } });
      } else if (req.body.operationName === 'GetPostsByUserId') {
        req.reply(async (res) => {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          res.send({ data: { getPostsByUserId: [] } });
        });
      }
    });

    cy.visit('/user-listing');
    cy.get('[data-testid="skeleton-loader"]').should('exist');
  });

  it('displays all listings under "Зарууд" tab', () => {
    cy.contains('button', 'Зарууд').click();
    cy.get('table tbody tr').should('have.length', 3); // adjust expected count based on fixture
  });

  ['Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'].forEach((status) => {
    it(`filters listings when "${status}" tab is clicked`, () => {
      cy.contains('button', status).click();

      if (status === 'Хүлээгдэж буй') {
        cy.get('table tbody tr').should('have.length', 2);
        cy.get('table tbody tr').each(($row) => {
          cy.wrap($row).contains('Хүлээгдэж буй');
        });
      } else if (status === 'Зарагдаж байгаа') {
        cy.get('table tbody tr').should('have.length', 1);
        cy.get('table tbody tr').first().contains('Зарагдаж байгаа');
      } else {
        cy.get('table tbody tr').should('have.length', 0);
      }
    });
  });

  it('renders fallback image and price if missing', () => {
    cy.contains('button', 'Зарууд').click();

    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.get('img')
          .should('have.attr', 'src')
          .and('match', /url=%2Fplaceholder\.png/); // <-- updated here
        cy.contains('Тодорхойгүй').should('exist');
      });
  });

  it('renders correct translated status and formatted price', () => {
    cy.contains('button', 'Зарууд').click();

    cy.get('table tbody tr')
      .eq(1)
      .within(() => {
        cy.contains('Хүлээгдэж буй').should('exist');
        cy.contains('1,000,000₮').should('exist');
      });
  });

  it('shows 3 or more action icons per listing row', () => {
    cy.contains('button', 'Зарууд').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('svg').should('have.length.at.least', 3);
    });
  });
});
