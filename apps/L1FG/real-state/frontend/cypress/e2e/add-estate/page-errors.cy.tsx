import 'cypress-file-upload';
describe('AddEstate Page Errors', () => {
  beforeEach(() => {
    // Set the authentication token in local storage
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });

    // Visit the add estate page
    cy.visit('/add-estate');
  });

  it('should show error when no files are selected', () => {
    // Fill out property details section
    cy.get('[data-cy=property-details]').within(() => {
      cy.get('select[name="houseType"]').select('Apartment');
      cy.get('input[name="title"]').type('Sample Title');
      cy.get('input[name="price"]').type('1000');
      cy.get('input[name="size"]').type('100 sqm');
      cy.get('input[name="totalRooms"]').type('3');
      cy.get('select[name="garage"]').should('be.visible').select('Тийм');
    });

    // Fill out description section
    cy.get('[data-cy=description-section]').within(() => {
      cy.get('textarea[name="description"]').type('Sample description');
    });

    // Fill out restrooms section
    cy.get('[data-cy=restrooms-section]').within(() => {
      cy.get('input[name="restrooms"]').type('2');
    });

    // Fill out town details section
    cy.get('[data-cy=town-details]').within(() => {
      cy.get('input[name="subDistrict"]').type('Sample SubDistrict');
      cy.get('input[name="district"]').type('Sample District');
      cy.get('input[name="city"]').type('Ulaanbaatar');
      cy.get('input[name="address"]').should('not.be.disabled').type('123 Main St');
    });

    // Fill out windows section
    cy.get('[data-cy=windows-section]').within(() => {
      cy.get('input[name="completionDate"]').type('2023-01-01');
      cy.get('input[name="windowsCount"]').type('4');
      cy.get('input[name="windowType"]').type('Double Glazed');
    });

    // Fill out floor details section
    cy.get('[data-cy=floor-details-section]').within(() => {
      cy.get('input[name="floorMaterial"]').type('Wood');
      cy.get('input[name="floorNumber"]').type('5');
      cy.get('input[name="totalFloors"]').type('10');
    });

    // Fill out balcony and lift section
    cy.get('[data-cy=balcony-lift-section]').within(() => {
      cy.get('select[name="balcony"]').select('Тийм');
      cy.get('select[name="lift"]').select('Тийм');
    });

    // Submit the form without selecting files
    cy.get('form').submit();

    // Verify the error message
    cy.contains('Зураг оруулна уу').should('be.visible');
  });
});
