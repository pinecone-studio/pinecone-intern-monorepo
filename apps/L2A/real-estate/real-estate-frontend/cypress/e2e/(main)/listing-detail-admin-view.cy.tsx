
describe('ListingDetailAdminView E2E', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      const op = req.body.operationName;

      if (op === 'GetPosts') {
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
      }

      if (op === 'GetPostById') {
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
      }

      if (op === 'UpdatePostStatus') {
        req.reply({
          data: {
            updatePostStatus: true,
          },
        });
      }
    });

    cy.visit('/admin/details/0001');
    cy.get('[data-testid="admin-details-page"]').should('exist');
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
