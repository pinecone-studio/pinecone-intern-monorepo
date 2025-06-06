/* eslint-disable no-secrets/no-secrets */
describe('StatusSelect Component E2E', () => {
  beforeEach(() => {
    const mockAdminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJpZCI6ImFkbWluLWlkIiwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsImlzQWRtaW4iOnRydWV9.' +
      'signature-placeholder';

    cy.window().then((win) => {
      win.localStorage.setItem('token', mockAdminToken);
    });

    cy.intercept('POST', '**/graphql', (req) => {
      const op = req.body.operationName;

      if (op === 'Me') {
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

      if (op === 'GetPosts') {
        req.alias = 'getPosts';
        req.reply({
          data: {
            getPosts: [
              {
                _id: '0001',
                title: 'Seoul royal county хотхон',
                propertyOwnerId: 'user-001',
                number: '99112233',
                status: 'PENDING',
              },
            ],
          },
        });
        return;
      }

      if (op === 'GetPostById') {
        req.alias = 'getPostById';
        req.reply({
          data: {
            getPostById: {
              _id: '0001',
              title: 'Seoul royal county хотхон',
              propertyOwnerId: 'user-001',
              number: '99112233',
              status: 'PENDING',
              ownerName: 'Н.Мөнхтунгалаг',
              price: 880000000,
              size: 200,
              totalRooms: 4,
              restrooms: 2,
              garage: 'Байхгүй',
              description: 'Зайсан толгойн урд',
              location: {
                city: 'Хан-Уул',
                district: '1-р хороо',
                street: 'Зайсан толгойн урд',
              },
              images: Array(8).fill('/listing.jpg'),
              yearBuilt: '2012',
              windowsCount: 6,
              windowType: 'Төмөр вакум',
              doorType: 'Төмөр вакум',
              floorNumber: 4,
              totalFloors: 5,
              roofMaterial: 'Ламинат',
              balcony: 'Байгаа',
              lift: 'Байгаа',
              type: 'APARTMENT',
            },
          },
        });
        return;
      }

      if (op === 'UpdatePostStatus') {
        req.alias = 'updatePostStatus';
        req.reply({
          data: {
            updatePostStatus: true,
          },
        });
        return;
      }
    });

    cy.visit('/admin');
    cy.wait('@getPosts');
    cy.get('table tbody tr').first().click();
    cy.wait('@getPostById');
  });

  it('initially shows the correct selected status', () => {
    cy.get('select').should('have.value', 'Хүлээгдэж буй');
  });

  it('changes status and shows success message', () => {
    cy.get('select').select('Зөвшөөрөх');
    cy.get('select').should('have.value', 'Зөвшөөрөх');
    cy.contains('Төлөв амжилттай солигдлоо').should('be.visible');
    cy.contains('Thank you for your review!').should('be.visible');

    cy.wait(3000); // Wait for toast to disappear
    cy.contains('Төлөв амжилттай солигдлоо').should('not.exist');
  });

  it('does not show message when same value is selected again', () => {
    cy.get('select').select('Хүлээгдэж буй');
    cy.contains('Төлөв амжилттай солигдлоо').should('not.exist');
  });
});
