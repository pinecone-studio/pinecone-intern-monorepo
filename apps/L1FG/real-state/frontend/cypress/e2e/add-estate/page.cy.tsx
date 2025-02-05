import 'cypress-file-upload';

describe('AddEstate Page', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });

    cy.request({
      url: '/add-estate',
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status !== 200) {
        cy.log('Server returned an error:', response.status);
      } else {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/html');
      }
    });

    cy.visit('/add-estate', { failOnStatusCode: false });
  });

  it('should fill out and submit the form', () => {
    cy.window().then((window) => {
      const token = window.localStorage.getItem('token');
      console.log('Token:', token);
    });

    cy.intercept('POST', '**/graphql').as('addPost');

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

    cy.wait('@addPost').then(() => {
      cy.contains('Зар нэмэгдлээ!').should('be.visible');
    });
  });

  it('should show error toast on failure', () => {
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });

    cy.intercept('POST', '**/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Internal Server Error' }] },
    }).as('addPostError');

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

    cy.wait('@addPostError').then((interception) => {
      console.log('Interception:', interception);
      cy.contains('Зар нэмэхэд алдаа гарлаа').should('be.visible');
    });
  });
});
