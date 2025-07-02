describe('RoomImages Component', () => {
  const roomId = '6837cc8c8b71557eb9b072e7';
  const hotelId = '682ac7df47df32a8a9907cb1';

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('room')) {
        req.alias = 'getRoom';
        req.reply({
          data: {
            room: {
              __typename: 'Room',
              _id: roomId,
              name: 'Deluxe Suite',
              images: ['/image1.jpg'],
              hotelId: { _id: hotelId, name: 'Grand Hotel' },
            },
          },
        });
      }

      if (req.body.operationName === 'updateRoom') {
        req.alias = 'updateRoom';
        req.reply({
          data: {
            updateRoom: {
              __typename: 'Room',
              _id: roomId,
              images: ['/image1.jpg', '/new-image.jpg'],
            },
          },
        });
      }
    });

    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/da889nybx/image/upload', {
      body: { secureUrl: '/new-image.jpg' },
    }).as('cloudinaryUpload');

    cy.visit(`/hotels/${hotelId}/${roomId}`);
    cy.wait('@getRoom');
  });

  it('uploads a new image and updates room', () => {
    cy.visit(`/hotels/${hotelId}/${roomId}`);
    cy.wait('@getRoom');

    const blob = new Blob(['test content'], { type: 'image/png' });
    const testFile = new File([blob], 'test-image.png', { type: 'image/png' });

    cy.get('[data-cy="edit-images-button"]').click();
    cy.get('[data-cy="image-upload-input"]').then(($input) => {
      const inputElement = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);

      Object.defineProperty(inputElement, 'files', {
        value: dataTransfer.files,
        writable: false,
      });

      inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
});
