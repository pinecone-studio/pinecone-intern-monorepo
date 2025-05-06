describe('Food Add Dialog', () => {
  const appleImagePath = 'public/apple.png';

  beforeEach(() => {
    cy.visit('/admin/food');
  });

  it('opens the dialog and fills out the form', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Burgers');
    cy.get('[data-testid="price-input"]').type('8500');
    cy.get('[data-testid="inactive-radio"]').click();
    cy.get('[data-testid="inactive-radio"]').should('have.attr', 'data-state', 'checked');
    cy.readFile(appleImagePath, 'base64').then((appleBase64) => {
      const blob = Cypress.Blob.base64StringToBlob(appleBase64, 'image/png');
      cy.get('[data-testid="file-input"]').selectFile({ contents: blob, fileName: 'apple.png', mimeType: 'image/png', lastModified: Date.now() }, { force: true });
    });
    cy.get('[data-testid="food-image-preview"]').should('exist');
    cy.get('[data-testid="create-food-button"]').click();
  });

  it('alerts when required fields are missing', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    cy.get('[data-testid="create-food-button"]').click();
    cy.get('@alert').should('have.been.calledWith', 'Please fill out all fields and upload an image.');
  });
  it('alerts when file is not an image (non-image file)', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    const plainText = 'Hello, world!';
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(plainText);
    const blob = new Blob([uint8Array], { type: 'text/plain' });
    cy.get('[data-testid="file-input"]').selectFile({ contents: blob, fileName: 'not-an-image.txt', mimeType: 'text/plain', lastModified: Date.now() }, { force: true });
    cy.get('@alert').should('have.been.calledWith', 'Only image files are allowed.');
  });
  it('alerts when no file is selected', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
      cy.get('[data-testid="file-input"]').then(($input) => {
        const input = $input[0] as HTMLInputElement;
        Object.defineProperty(input, 'files', { value: undefined, writable: true });
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
    cy.get('@alert').should('have.been.calledWith', 'Only image files are allowed.');
  });

  it('alerts when price is missing', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Pizza');
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    cy.readFile(appleImagePath, 'base64').then((appleBase64) => {
      const blob = Cypress.Blob.base64StringToBlob(appleBase64, 'image/png');
      cy.get('[data-testid="file-input"]').selectFile({ contents: blob, fileName: 'apple.png', mimeType: 'image/png', lastModified: Date.now() }, { force: true });
    });
    cy.get('[data-testid="create-food-button"]').click();
    cy.get('@alert').should('have.been.calledWith', 'Please fill out all fields and upload an image.');
  });

  it('alerts when foodName is missing', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="price-input"]').type('7500');
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    cy.readFile(appleImagePath, 'base64').then((appleBase64) => {
      const blob = Cypress.Blob.base64StringToBlob(appleBase64, 'image/png');
      cy.get('[data-testid="file-input"]').selectFile({ contents: blob, fileName: 'apple.png', mimeType: 'image/png', lastModified: Date.now() }, { force: true });
    });
    cy.get('[data-testid="create-food-button"]').click();
    cy.get('@alert').should('have.been.calledWith', 'Please fill out all fields and upload an image.');
  });

  it('alerts when image is missing', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Sushi');
    cy.get('[data-testid="price-input"]').type('10500');
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    cy.get('[data-testid="create-food-button"]').click();
    cy.get('@alert').should('have.been.calledWith', 'Please fill out all fields and upload an image.');
  });

  it('does not set image if FileReader result is null', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.window().then((win) => {
      class MockFileReader {
        onload: ((_: ProgressEvent<FileReader>) => void) | null = null;
        readAsDataURL() {
          this.onload?.({ target: { result: null } } as ProgressEvent<FileReader>);
        }
      }
      cy.stub(win, 'FileReader').callsFake(() => new MockFileReader());
    });
    cy.readFile(appleImagePath, 'base64').then((appleBase64) => {
      const blob = Cypress.Blob.base64StringToBlob(appleBase64, 'image/png');
      cy.get('[data-testid="file-input"]').selectFile({ contents: blob, fileName: 'apple.png', mimeType: 'image/png', lastModified: Date.now() }, { force: true });
    });
    cy.get('[data-testid="food-image-preview"]').should('not.exist');
  });

  it('triggers file input click when upload button is clicked', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="file-input"]').then(($input) => {
      cy.spy($input[0], 'click').as('fileInputClick');
    });
    cy.get('[data-testid="upload-image-button"]').click();
    cy.get('@fileInputClick').should('have.been.called');
  });

  it('covers FileReader event.target.result condition (line 32)', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.window().then((win) => {
      cy.readFile(appleImagePath, 'base64').then((appleBase64) => {
        class MockFileReader {
          onload: ((_: ProgressEvent<FileReader>) => void) | null = null;
          readAsDataURL() {
            const result = `data:image/png;base64,${appleBase64}`;
            this.onload?.({ target: { result } } as ProgressEvent<FileReader>);
          }
        }
        cy.stub(win, 'FileReader').callsFake(() => new MockFileReader());
      });
    });
    cy.readFile(appleImagePath, 'base64').then((appleBase64) => {
      const blob = Cypress.Blob.base64StringToBlob(appleBase64, 'image/png');
      cy.get('[data-testid="file-input"]').selectFile({ contents: blob, fileName: 'apple.png', mimeType: 'image/png', lastModified: Date.now() }, { force: true });
    });
    cy.get('[data-testid="food-image-preview"]').should('exist');
  });
});
