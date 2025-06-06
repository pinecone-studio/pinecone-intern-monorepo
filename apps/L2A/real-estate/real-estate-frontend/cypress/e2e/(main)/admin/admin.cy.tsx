/* eslint-disable no-secrets/no-secrets */
/* eslint-disable complexity */
describe('Admin Listing Table - Filter by Tab', () => {
  beforeEach(() => {
    const mockAdminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJpZCI6ImFkbWluLWlkIiwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsImlzQWRtaW4iOnRydWV9.' +
      'signature-placeholder';

    cy.window().then((win) => {
      win.localStorage.setItem('token', mockAdminToken);
    });

    cy.intercept('POST', '**/graphql', (req) => {
      const operationName = req.body.operationName;
      const query = req.body.query || '';

      if (operationName === 'Me' || query.includes('query Me')) {
        req.alias = 'getMe';
        req.reply({
          data: {
            me: {
              id: 'admin-id',
              email: 'admin@test.com',
              isAdmin: true,
            },
          },
        });
        return;
      }

      if (operationName === 'GetPosts' || query.includes('query GetPosts')) {
        req.alias = 'getPosts';
        req.reply({
          data: {
            getPosts: [
              {
                _id: 'listing-1',
                title: 'Гоё байр',
                ownerName: 'owner-001',
                number: '99119911',
                status: 'APPROVED',
              },
              {
                _id: 'listing-2',
                title: 'Хүлээгдэж буй байр',
                ownerName: 'owner-002',
                number: '88112233',
                status: 'PENDING',
              },
              {
                _id: 'listing-3',
                title: 'Хассан байр',
                ownerName: 'owner-003',
                number: '77112233',
                status: 'BLOCKED',
              },
            ],
          },
        });
        return;
      }

      if (operationName === 'GetPostById' || query.includes('query GetPostById')) {
        req.alias = 'getPostById';
        req.reply({
          data: {
            getPostById: {
              _id: 'listing-2',
              title: 'Хүлээгдэж буй байр',
              propertyOwnerId: 'owner-002',
              number: '88112233',
              status: 'PENDING',
              description: 'Дэлгэрэнгүй мэдээлэл',
              location: {
                city: 'Улаанбаатар',
                district: 'Баянзүрх',
              },
            },
          },
        });
        return;
      }
    });

    cy.visit('/admin');
    cy.wait('@getPosts', { timeout: 10000 });
  });

  it('displays only listings that match the selected tab (Зөвшөөрсөн)', () => {
    cy.contains('Зөвшөөрсөн').click().should('have.class', 'font-semibold');

    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr').within(() => {
      cy.contains('Гоё байр').should('exist');
      cy.contains('99119911').should('exist');
      cy.contains('owner-001').should('exist');
    });
  });

  it('shows empty message when no listings match tab', () => {
    cy.contains('Татгалзсан').click();
    cy.contains('Энэ төлөвт зар алга.').should('exist');
  });

  it('clicking row navigates to detail page and shows detail content', () => {
    cy.contains('Хүлээгдэж буй').click();
    cy.get('table tbody tr').first().click();

    cy.url().should('include', '/admin/details/listing-2');
    cy.contains('Ерөнхий мэдээлэл').should('exist');
    cy.contains('Төлөв').should('exist');
  });
});
