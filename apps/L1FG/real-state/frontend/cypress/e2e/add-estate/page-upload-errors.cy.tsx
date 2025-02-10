import 'cypress-file-upload';
describe('AddEstate Page Upload Errors', () => {
  beforeEach(() => {
    // Set the authentication token in local storage
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });

    // Visit the add estate page
    cy.visit('/add-estate');
  });

  it('should handle file upload error', () => {
    // Mock the fetch request to simulate a file upload error
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
      statusCode: 500,
      body: { error: 'File upload failed' },
    });

    // Fill out property details section
    cy.get('[data-cy=property-details]').within(() => {
      cy.get('select[name="houseType"]').select('Apartment');
      cy.get('input[name="title"]').type('Sample Title');
      cy.get('input[name="price"]').type('1000');
      cy.get('input[name="size"]').type('100 sqm');
      cy.get('input[name="totalRooms"]').type('3');
      cy.get('select[name="garage"]').should('be.visible').select('Тийм');
    });

    // Fill out images section
    cy.get('[data-cy=images-section]').within(() => {
      cy.get('input[type="file"]').attachFile('sample-image.jpg');
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

    // Submit the form
    cy.get('form').submit();

    // Verify the error message
    cy.contains('Файл хуулахад алдаа гарлаа').should('be.visible');
  });

  it('should handle post submission error', () => {
    // Mock the GraphQL request to simulate a post submission error
    cy.intercept('POST', '/api/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Post submission failed' }] },
    });

    // Fill out property details section
    cy.get('[data-cy=property-details]').within(() => {
      cy.get('select[name="houseType"]').select('Apartment');
      cy.get('input[name="title"]').type('Sample Title');
      cy.get('input[name="price"]').type('1000');
      cy.get('input[name="size"]').type('100 sqm');
      cy.get('input[name="totalRooms"]').type('3');
      cy.get('select[name="garage"]').should('be.visible').select('Тийм');
    });

    // Fill out images section
    cy.get('[data-cy=images-section]').within(() => {
      cy.get('input[type="file"]').attachFile('sample-image.jpg');
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

    // Submit the form
    cy.get('form').submit();

    // Verify the error message
    cy.contains('Зар нэмэхэд алдаа гарлаа').should('be.visible');
  });
});
