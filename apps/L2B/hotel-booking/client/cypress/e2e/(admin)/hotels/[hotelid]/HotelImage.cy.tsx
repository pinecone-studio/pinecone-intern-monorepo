describe.only('HotelImage Component', () => {
  let isUpdated = false;

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        const images = isUpdated
          ? ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/new-image.jpg']
          : ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];

        req.reply({
          data: {
            hotel: {
              __typename: 'Hotel',
              id: '682ac7df47df32a8a9907cb1',
              images,
            },
          },
        });
      }
    }).as('getHotel');

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpdateHotel') {
        isUpdated = true;
        req.reply({
          data: {
            updateHotel: {
              __typename: 'Hotel',
              id: '682ac7df47df32a8a9907cb1',
              images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/new-image.jpg'],
            },
          },
        });
      }
    }).as('updateHotel');

    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/da889nybx/image/upload', (req) => {
      req.alias = 'cloudinaryUpload';

      req.reply({
        secureurl: 'https://example.com/new-image.jpg',
      });
    });
  });

  it('uploads a fake image and updates the hotel images', () => {
    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);

    cy.wait('@getHotel');

    cy.get("[data-testid='hotel-image-edit']").click();
    cy.get("[data-testid='file-input']").should('exist');

    const blob = new Blob(['Hello World'], { type: 'image/jpeg' });
    const fakeFile = new File([blob], 'fake.jpg', { type: 'image/jpeg' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(fakeFile);

    cy.get('[data-testid="file-input"]').then(($input) => {
      const el = $input[0];
      const dt = new DataTransfer();
      dt.items.add(new File([new Blob(['hello'])], 'test.jpg', { type: 'image/jpeg' }));

      Object.defineProperty(el, 'files', {
        value: dt.files,
        writable: false,
      });

      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    cy.contains('Save').click();
    cy.wait('@cloudinaryUpload');

    cy.wait('@updateHotel');
    cy.wait('@getHotel');

    cy.get('img[alt="Hotel main image"]').should('have.attr', 'src').and('include', 'new-image.jpg');
  });
});
