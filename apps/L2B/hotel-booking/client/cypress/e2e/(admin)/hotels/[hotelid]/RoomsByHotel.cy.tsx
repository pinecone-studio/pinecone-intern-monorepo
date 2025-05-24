describe.only('RoomsByHotel Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'RoomsByHotel') {
        req.reply({
          data: {
            roomsByHotel: [
              {
                id: '1',
                roomNumber: '101',
                name: 'Mock Room 1',
                pricePerNight: 120,
                type: 'twin',
                images: ['https://via.placeholder.com/100'],
              },
              {
                id: '2',
                roomNumber: '202',
                name: 'Mock Room 2',
                pricePerNight: 150,
                type: 'family',
                images: ['https://via.placeholder.com/100'],
              },
              {
                id: '3',
                roomNumber: '303',
                name: 'Mock Room 3',
                pricePerNight: 90,
                type: 'single',
                images: ['https://via.placeholder.com/100'],
              },
              {
                id: '4',
                roomNumber: '404',
                name: 'Unknown Room',
                pricePerNight: 100,
                type: 'unknown',
                images: ['https://via.placeholder.com/100'],
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

  it('should navigate to room detail page on row click', () => {
    cy.get('table').contains('td', 'Mock Room 1').parents('tr').click();

    cy.location('pathname').should('eq', '/hotels/hotel-id/1');
  });
});
