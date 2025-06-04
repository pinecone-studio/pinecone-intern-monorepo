describe('Hotel Detail Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              hotel: {
                name: 'Test Hotel',
                description: 'Perfect place to relax',
                starRating: 4,
                rating: 9.1,
                location: 'Ulaanbaatar, Mongolia',
                phone: '+976 99112233',
                amenities: ['Free WiFi', 'Pool', 'Gym'],
                images: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg'],
              },
            },
          },
        });
      }
    }).as('getHotel');
  });

  it('renders hotel detail correctly', () => {
    cy.visit('/hotel-detail/682f064a66e855f927b15767');
    cy.wait('@getHotel');

    cy.contains('Test Hotel').should('be.visible');
    cy.contains('Perfect place to relax').should('be.visible');
    cy.contains('Excellent').should('be.visible');
    cy.contains('+976 99112233').should('be.visible');
    cy.contains('Ulaanbaatar, Mongolia').should('be.visible');

    // Check images rendered
    cy.get('img').should('have.length.at.least', 5);

    // Check star rating (4 filled, 1 empty)
    cy.get('svg.h-5.w-5.fill-amber-400').should('have.length', 4);
    cy.get('svg.h-5.w-5.text-gray-300').should('have.length', 1);

    // Amenities
    cy.contains('Free WiFi');
    cy.contains('Gym');
    cy.contains('Pool');
  });
});
