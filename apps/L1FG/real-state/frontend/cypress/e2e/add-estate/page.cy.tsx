/* eslint-disable max-lines */
import 'cypress-file-upload';

describe('AddEstate Page', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });

    cy.visit('/add-estate', { failOnStatusCode: false });
  });

  it('should do work', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddPost') {
        req.reply({
          data: {
            AddPost: {
              _id: 'mock-post-id-123',
              propertyOwnerId: {
                _id: 'mock-owner-id-456',
              },
              title: 'Test Title',
              description: 'Test Description',
              price: 100000,
              propertyDetail: {
                houseType: 'Орон сууц',
                size: 200,
                images: ['https://example.com/image.jpg'],
                totalRooms: 3,
                garage: 'Тийм',
                restrooms: 2,
                location: {
                  address: 'Test Address',
                  city: 'Test City',
                  district: 'Test District',
                  subDistrict: 'Test SubDistrict',
                },
                details: {
                  completionDate: '2023-12-31',
                  windowsCount: 4,
                  windowType: 'Double Glazed',
                  floorMaterial: 'Wood',
                  floorNumber: 2,
                  balcony: 'Тийм',
                  totalFloors: 5,
                  lift: 'Тийм',
                },
                uploadedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
              },
              status: 'active',
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
          },
        });
      }
    });

    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
      statusCode: 200,
      // eslint-disable-next-line camelcase
      body: { result: { secure_url: 'https://example.com/image.jpg' } },
    });

    cy.get('[data-cy=property-details]').within(() => {
      cy.get('[data-cy=houseType]').select('Орон сууц');
      cy.get('[data-cy=title]').type('Test Title');
      cy.get('[data-cy=price]').type('100000');
      cy.get('[data-cy=size]').type('200');
      cy.get('[data-cy=totalRooms]').type('3');
      cy.get('[data-cy=garage]').select('Тийм');
    });
    cy.get('[data-cy=description-section]').within(() => {
      cy.get('[data-cy=description]').type('Test Description');
      cy.get('[data-cy=description]').should('have.value', 'Test Description');
    });
    cy.get('[data-cy=restrooms-section]').within(() => {
      cy.get('[data-cy=restrooms]').type('2');
    });

    cy.get('[data-cy=town-details]').within(() => {
      cy.get('[data-cy=subDistrict]').type('Test SubDistrict');
      cy.get('[data-cy=district]').type('Test District');
      cy.get('[data-cy=city]').type('Test City');
      cy.get('[data-cy=address]').type('Test Address');
    });

    cy.get('[data-cy=windows-section]').within(() => {
      cy.get('[data-cy=completionDate]').type('2023-12-31');
      cy.get('[data-cy=windowsCount]').type('4');
      cy.get('[data-cy=windowType]').type('Double Glazed');
    });

    cy.get('[data-cy=floor-details-section]').within(() => {
      cy.get('[data-cy=floorMaterial]').type('Wood');
      cy.get('[data-cy=floorNumber]').type('2');
      cy.get('[data-cy=totalFloors]').type('5');
    });

    cy.get('[data-cy=balcony-lift-section]').within(() => {
      cy.get('[data-cy=select-balcony]').select('Тийм');
      cy.get('[data-cy=select-lift]').select('Тийм');
    });

    cy.get('[data-cy=upload-button]').click();
    cy.get('[data-cy=upload-image]').attachFile('sample-image.jpg');

    cy.get('form').submit();
    cy.wait(3000);
    // cy.contains('Зар нэмэгдлээ!', { timeout: 3000 }).should('be.visible');
  });

  it('should handle form submission with no images', () => {
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });

    // Fill out the form without uploading any images
    cy.get('[data-cy="property-details"]').within(() => {
      cy.get('[data-cy="houseType"]').select('Орон сууц');
      cy.get('[data-cy="title"]').type('Test Title');
      cy.get('[data-cy="price"]').type('100000');
    });

    // Submit the form
    cy.get('form').submit();

    // Verify error toast appears
    cy.contains('Зураг оруулна уу').should('be.visible');
  });

  it('should handle network error during form submission', () => {
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });

    // Mock successful image upload
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
      statusCode: 200,
      // eslint-disable-next-line camelcase
      body: { secure_url: 'https://example.com/image.jpg' },
    });

    // Mock GraphQL mutation to fail with network error
    cy.intercept('POST', '**/graphql', {
      forceNetworkError: true,
    }).as('addPost');

    // Fill out form and upload image
    cy.get('[data-cy="property-details"]').within(() => {
      cy.get('[data-cy="houseType"]').select('Орон сууц');
      cy.get('[data-cy="title"]').type('Test Title');
      cy.get('[data-cy="price"]').type('100000');
    });

    cy.get('[data-cy=upload-button]').click();
    cy.get('[data-cy=upload-image]').attachFile('sample-image.jpg');

    // Submit form
    cy.get('form').submit();

    // Verify error handling
    cy.wait('@addPost');
    cy.contains('Зар нэмэхэд алдаа гарлаа').should('be.visible');
  });
});
