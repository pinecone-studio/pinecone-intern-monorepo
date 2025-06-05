describe('Admin Listing Detail Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetPostById') {
        req.alias = 'getPostById';
        req.reply({
          data: {
            getPostById: {
              _id: '0001',
              title: 'Seoul royal county хотхон',
              propertyOwnerId: 'owner-001',
              ownerName: 'Н.Мөнхтунгалаг',
              number: '99112233',
              description: 'Гоё байр байна.',
              status: 'PENDING',
              totalRooms: 4,
              restrooms: 2,
              garage: 'Байгаа',
              price: 880000000,
              size: 200.0,
              images: ['/listing.jpg'],
              location: {
                city: 'Улаанбаатар',
                district: 'Баянзүрх',
                address: 'Улаанбаатар хот, Баянзүрх дүүрэг, 26-р хороо'
              },
              windowsCount: 6,
              windowType: 'Төмөр вакум',
              door: 'Төмөр вакум',
              floorNumber: 4,
              totalFloors: 5,
              roofMaterial: 'Ламинат',
              balcony: true,
              lift: true
            }
          }
        });
      }
    });

    cy.visit('/admin/details/0001');
    cy.wait('@getPostById');
  });

  it('should render general info correctly', () => {
    cy.contains('Ерөнхий мэдээлэл').should('exist');
    cy.contains('Н.Мөнхтунгалаг').should('be.visible');
    cy.contains('99112233').should('be.visible');
    cy.contains('Seoul royal county хотхон').should('be.visible');
    cy.contains('880,000,000₮').should('be.visible');
    cy.contains('200').should('be.visible');
    cy.contains('4').should('be.visible');
    cy.contains('2').should('be.visible');
    cy.contains('Гоё байр байна.').should('be.visible');
  });

  it('should render building details section', () => {
    cy.contains('Ламинат').should('exist');
    cy.contains('6').should('exist');
    cy.contains('Төмөр вакум').should('exist');
    cy.contains('4 давхарт').should('exist');
    cy.contains('5 давхар').should('exist');
    cy.contains('Байгаа').should('exist');
  });

  it('should render image and location section', () => {
    cy.get('img[alt="listing"]').should('exist');
    cy.contains('Баянзүрх').should('exist');
    cy.contains('Улаанбаатар').should('exist');
    cy.contains('Улаанбаатар хот, Баянзүрх дүүрэг, 26-р хороо').should('exist');
  });

  it('should show listing card and status select', () => {
    cy.get('img[alt="no image"]').should('exist');
    cy.contains('Төлөв').should('exist');
  });
});
