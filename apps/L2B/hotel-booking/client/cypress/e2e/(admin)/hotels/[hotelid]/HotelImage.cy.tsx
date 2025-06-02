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
    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
  });

  it('1. uploads a fake image and updates the hotel images', () => {
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

    cy.wait('@updateHotel');
    cy.wait('@getHotel');
  });
  it('2. does not break when no file is selected', () => {
    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.get("[data-testid='hotel-image-edit']").click();

    cy.get('[data-testid="file-input"]').selectFile([], { force: true });
  });
  it('3. closes the dialog when Close button is clicked', () => {
    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.get("[data-testid='hotel-image-edit']").click();
    cy.contains('Close').click();

    cy.contains('Drag or Upload Photo').should('not.exist');
  });
  it('4. renders existing hotel images', () => {
    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');

    cy.get("[data-testid='hotel-img']").should('be.visible');
    cy.get('img').should('have.length.at.least', 1);
  });

  it('6. shows +N overlay when more than 5 images', () => {
    isUpdated = true;
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.reply({
          data: {
            hotel: {
              __typename: 'Hotel',
              id: '682ac7df47df32a8a9907cb1',
              images: [
                'https://example.com/img1.jpg',
                'https://example.com/img2.jpg',
                'https://example.com/img3.jpg',
                'https://example.com/img4.jpg',
                'https://example.com/img5.jpg',
                'https://example.com/img6.jpg',
              ],
            },
          },
        });
      }
    }).as('getHotelManyImages');

    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotelManyImages');

    cy.contains('+1').should('exist');
  });
});
