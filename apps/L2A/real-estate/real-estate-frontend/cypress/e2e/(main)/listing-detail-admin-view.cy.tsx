/* eslint-disable no-secrets/no-secrets */
describe('ListingDetailAdminView E2E', () => {
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

    cy.visit('/admin/details/0001');
    cy.get('[data-testid="admin-details-page"]').should('exist');
  });

  it('displays correct general information section', () => {
    cy.contains('Ерөнхий мэдээлэл').should('be.visible');
    cy.contains('Н.Мөнхтунгалаг').should('be.visible');
    cy.contains('99112233').should('be.visible');
    cy.contains('Seoul royal county хотхон').should('be.visible');
    cy.contains('880,000,000₮').should('be.visible');
    cy.contains('200м²').should('be.visible');
    cy.contains('4 өрөө').should('be.visible');
    cy.contains('2').should('be.visible');
    cy.contains('Байхгүй').should('be.visible');
  });

  it('renders image gallery with 8 images', () => {
    cy.contains('Зураг').should('be.visible');
    cy.get('img[alt="listing"]').should('have.length', 8);
  });

  it('displays correct location section', () => {
    cy.contains('Байршил').should('be.visible');
    cy.contains('Хан-Уул').should('be.visible');
    cy.contains('1-р хороо').should('be.visible');
    cy.contains('Зайсан толгойн урд').should('be.visible');
  });

  it('shows building details section', () => {
    const buildingDetails = ['2012', '6', 'Төмөр вакум', '4 давхарт', '5 давхар', 'Ламинат', 'Байгаа', 'Байгаа'];

    cy.contains('Барилгын дэлгэрэнгүй').should('be.visible');
    buildingDetails.forEach((text) => {
      cy.contains(text).should('exist');
    });
  });

  it('can change status dropdown and show success toast', () => {
    cy.get('select').should('have.value', 'Хүлээгдэж буй');
    cy.get('select').select('Зөвшөөрөх');
    cy.get('select').should('have.value', 'Зөвшөөрөх');
    cy.contains('Төлөв амжилттай солигдлоо').should('be.visible');
    cy.contains('Thank you for your review!').should('be.visible');
  });
});
