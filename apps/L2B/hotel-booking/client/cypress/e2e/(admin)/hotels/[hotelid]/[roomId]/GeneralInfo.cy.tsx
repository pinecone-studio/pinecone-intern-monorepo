describe('GeneralInfo feature', () => {
  const mockRoom = {
    name: 'Deluxe Suite',
    type: 'Luxury',
    pricePerNight: 150000,
    information: 'Spacious room with sea view',
  };

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query?.includes('room(')) {
        req.reply({
          data: {
            room: mockRoom,
          },
        });
      }
    }).as('getRoom');
    cy.visit('/hotels/abc123/room123');
  });

  it('renders General Info correctly', () => {
    cy.visit('/hotels/abc123/room123');
    cy.wait('@getRoom');

    cy.contains('General Info').should('exist');
    cy.contains('Edit').should('exist');

    cy.contains('Name').next().should('have.text', mockRoom.name);
    cy.contains('Type').next().should('have.text', mockRoom.type);
    cy.contains('Price per night').next().should('have.text', `${mockRoom.pricePerNight}₮`);
    cy.contains(mockRoom.information).should('exist');
  });

  it('renders correctly with array roomId', () => {
    cy.visit('/hotels/abc123/room123?roomId=room123&roomId=extra');
    cy.wait('@getRoom');
    cy.contains('General Info').should('exist');
  });
});
