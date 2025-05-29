describe.only('RoomsByHotel Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'RoomsByHotel') {
        req.reply({
          data: {
            roomsByHotel: [
              {
                _id: '1',
                roomNumber: '101',
                name: 'Mock Room 1',
                pricePerNight: 120,
                type: 'twin',
                images: ['https://via.placeholder.com/100'],
              },
              {
                _id: '2',
                roomNumber: '202',
                name: 'Mock Room 2',
                pricePerNight: 150,
                type: 'family',
                images: ['https://via.placeholder.com/100'],
              },
              {
                _id: '3',
                roomNumber: '303',
                name: 'Mock Room 3',
                pricePerNight: 90,
                type: 'single',
                images: ['https://via.placeholder.com/100'],
              },
              {
                _id: '4',
                roomNumber: '404',
                name: 'Unknown Room',
                pricePerNight: 100,
                type: 'unknown',
                images: ['https://via.placeholder.com/100'],
              },
              {
                _id: '5',
                roomNumber: '505',
                name: 'No Image Room',
                pricePerNight: 80,
                type: 'single',
                images: [],
              },
              {
                _id: '6',
                roomNumber: '606',
                name: 'Relative Image Room',
                pricePerNight: 110,
                type: 'double',
                images: ['room1.jpg'],
              },
              {
                _id: '7',
                roomNumber: '707',
                name: null,
                pricePerNight: null,
                type: null,
                images: [],
              },
            ],
          },
        });
      }
    });

    cy.visit('/hotels/mock-hotel-id');
  });

  it('should display mocked rooms', () => {
    cy.contains('Room Types');
    cy.contains('Mock Room 1');
    cy.contains('Mock Room 2');
    cy.contains('3 Bed');
    cy.contains('2 Bed');
  });

  it('should filter by bed type tabs', () => {
    cy.contains('2 bed').click();
    cy.contains('Mock Room 1').should('exist');
    cy.contains('Mock Room 2').should('not.exist');

    cy.contains('3 bed').click();
    cy.contains('Mock Room 2').should('exist');
    cy.contains('Mock Room 1').should('not.exist');
  });

  it('should show correct bed labels including default', () => {
    cy.contains('Mock Room 3');
    cy.contains('1 Bed');
    cy.contains('Unknown Room');
    cy.contains('1 Bed');
  });

  it('should show placeholder if room has no image', () => {
    cy.contains('No Image Room');
    cy.get('table').contains('td', 'No Image Room').parent().find('img').should('not.exist');
  });

  it('should handle missing name, type, and price gracefully', () => {
    cy.contains('td', '707');
    cy.contains('td', 'null').should('not.exist');
  });

  it('should navigate to room detail page on row click', () => {
    cy.get('table').contains('td', 'Mock Room 1').parents('tr').click();

    cy.location('pathname').should('eq', '/hotels/mock-hotel-id/1');
  });
});
