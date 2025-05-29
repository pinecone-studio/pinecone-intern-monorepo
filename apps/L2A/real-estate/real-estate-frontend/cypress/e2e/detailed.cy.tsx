describe('Property Detail Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'GetPostById') {
        req.reply({ fixture: 'getPostById.json' });
      }
      if (req.body.operationName === 'GetPosts') {
        req.reply({ body: { data: { getPosts: [] } } });
      }
    }).as('graphql');

    cy.visit('/detailed/mock-id-123');
  });

  it('renders main image and thumbnails', () => {
    cy.get('img[alt="Main Property"]').should('exist');
    cy.get('img[alt="Thumbnail"]').should('have.length.at.least', 2);
  });

 it('updates main image on thumbnail click', () => {
  cy.get('img[alt="Thumbnail"]').eq(1).click();

  cy.get('img[alt="Main Property"]')
    .should('have.attr', 'src')
    .then((attr) => {
      const decoded = decodeURIComponent(attr?.toString() ?? '');
      expect(decoded).to.include('/sample2.jpg');
    });
});


  it('renders location, description and title', () => {
    cy.contains('Зайсан хотхон').should('exist');
    cy.contains('Улаанбаатар, Баянзүрх, Зайсангийн гудамж').should('exist');
    cy.contains('Энэхүү орон сууц').should('exist');
  });

  it('falls back to placeholder if image is null', () => {
  cy.intercept('POST', '/api/graphql', (req) => {
    if (req.body.operationName === 'GetPostById') {
      req.reply({
        body: {
          data: {
            getPostById: {
              _id: 'mock-id-123',
              title: 'Тест байр',
              number: '99112233',
              size: 80,
              totalRooms: 3,
              restrooms: 1,
              garage: true,
              completionDate: '2020',
              windowsCount: 4,
              windowType: 'вакум',
              floorNumber: 5,
              totalFloors: 12,
              roofMaterial: 'паркет',
              balcony: true,
              location: {
                city: 'Улаанбаатар',
                district: 'Сүхбаатар',
                address: 'Төв гудамж',
              },
              description: 'Зураггүй байр.',
              images: [null], 
            },
          },
        },
      });
    }

    if (req.body.operationName === 'GetPosts') {
      req.reply({ body: { data: { getPosts: [] } } });
    }
  }).as('graphql');

  cy.visit('/detailed/mock-id-123');

  cy.get('img[alt="Main Property"]').should('exist');
  cy.get('img[alt="Thumbnail"]').should('exist').click();
  cy.get('img[alt="Main Property"]')
    .should('have.attr', 'src')
    .then((attr) => {
      const decoded = decodeURIComponent(attr?.toString() ?? '');
      expect(decoded).to.include('/placeholder.png'); 
    });
});

});
