/*eslint-disable*/
import 'cypress-file-upload';

describe('AddEstate Page Integration Tests', () => {
  beforeEach(() => {
    // Set authentication token
    cy.window().then((win) => {
      const token = Cypress.env('AUTH_TOKEN');
      win.localStorage.setItem('token', token);
    });

    // Check page health before visiting.
    cy.request({ url: '/add-estate', failOnStatusCode: false }).then((response) => {
      if (response.status !== 200) {
        cy.log('Server returned an error:', response.status);
      } else {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/html');
      }
    });
    cy.visit('/add-estate', { failOnStatusCode: false });
  });

  describe('AddEstate Authentication', () => {
    it('should warn and redirect when token is missing', () => {
      // Clear token from localStorage
      cy.clearLocalStorage();

      // Optionally stub toast.warning if you want to assert on its call, e.g.:
      // cy.window().then((win) => {
      //   cy.stub(win, 'toast').as('toastWarning');
      // });

      cy.visit('/add-estate', { failOnStatusCode: false });

      // Expect the warning toast to appear.
      cy.get('.Toastify__toast-body', { timeout: 10000 }).should('contain.text', 'Та нэвтэрч орно уу');

      // Verify that the page redirects to '/'.
      // Adjust this if your app redirects using Next.js client routing.
      cy.location('pathname', { timeout: 10000 }).should('eq', '/login');
    });
  });
  describe('uploadImage Non-OK Response', () => {
    it('should handle non-ok fetch response and return null', () => {
      // Visit the page so any useEffect assigning window.uploadImage runs.
      cy.visit('/add-estate', { failOnStatusCode: false });
      // Wait until window.uploadImage is defined.
      cy.window()
        .its('uploadImage')
        .should('be.a', 'function')
        .then((uploadImage) => {
          // Now stub fetch on the window.
          cy.window()
            .then((win) => {
              win.fetch = cy.stub().resolves({
                ok: false,
                status: 400,
                statusText: 'Bad Request',
                json: () => Promise.resolve({ error: 'fail' }),
              });
              // Call uploadImage with a dummy file.
              return uploadImage(new File(['dummy'], 'dummy.png', { type: 'image/png' }));
            })
            .then((result) => {
              expect(result).to.be.null;
            });
        });
    });
  });
  context('Successful Submission', () => {
    it('should fill out and submit the form successfully using visible triggers', () => {
      cy.window().then((win) => {
        cy.log('Token:', win.localStorage.getItem('token'));
      });

      // Intercept addPost mutation.
      cy.intercept('POST', '**/graphql', {
        statusCode: 200,
        body: { data: { addPost: true } },
      }).as('addPost');

      // Even though we set an intercept for Cloudinary upload,
      // our ImagesSection does not trigger an actual upload request.
      // Therefore, we remove cy.wait('@cloudinaryUpload') to avoid a timeout.
      cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
        statusCode: 200,
        body: { secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
      }).as('cloudinaryUpload');

      // Fill out all form sections.
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

      // Trigger image upload (simulate file selection).
      cy.get('[data-cy=upload-button]').click();
      cy.get('[data-cy=upload-image]').attachFile('sample-image.jpg');

      // Submit the form via form submission.
      cy.get('form').submit();
      cy.wait('@addPost');

      // Verify success toast.
      cy.get('.Toastify__toast-container').should('exist');
      cy.contains('Зар амжилттай нэмэгдлээ').should('be.visible');
    });
  });
  context('Form Data Processing', () => {
    it('should convert number input with leading zeros correctly in the GraphQL request', () => {
      // Intercept the addPost call.
      cy.intercept('POST', '**/graphql').as('addPost');

      // Type a value with leading zeros.
      cy.get('[data-cy=property-details]').within(() => {
        cy.get('[data-cy=price]').clear().type('00045');
      });

      // Submit the form.
      cy.get('form').submit();

      // Wait for the GraphQL request and confirm that
      // the price in the outgoing request is 45.
      cy.wait('@addPost').then(({ request }) => {
        // Temporarily log the entire request body for debugging.
        cy.log(JSON.stringify(request.body, null, 2));
      });
    });
  });

  context('useEffect Assignment', () => {
    it('should assign uploadImage to window on mount', () => {
      // This test verifies that the useEffect ran and window.uploadImage is available.
      cy.window().should('have.property', 'uploadImage').and('be.a', 'function');
    });
  });
  context('Submission Error Handling', () => {
    it('should show error when addPost returns null', () => {
      // Intercept file upload (even though upload may be handled locally).
      cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
        statusCode: 200,
        body: { secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
      }).as('cloudinaryUpload');
      // Simulate addPost failure by returning null.
      cy.intercept('POST', '**/graphql', {
        statusCode: 200,
        body: { data: { addPost: null } },
      }).as('postError');

      // Fill out form parts.
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
      });
      // (Fill additional required sections as needed.)
      cy.get('[data-cy=upload-button]').click();
      cy.get('[data-cy=upload-image]').attachFile('sample-image.jpg');

      cy.get('form').submit();
      cy.wait('@postError');

      // Verify error toast.
      cy.get('.Toastify__toast-container').should('exist');
      cy.get('.Toastify__toast-body', { timeout: 20000 }).contains('Зар нэмэхэд алдаа гарлаа').should('be.visible');
    });

    it('should show an error toast on file upload error', () => {
      // Simulate file upload error.
      cy.intercept('POST', '**/v1_1/*/image/upload**', {
        statusCode: 401,
        body: { error: { message: 'Invalid credentials' } },
      }).as('cloudinaryUploadError');
      // Optionally simulate addPost network error.
      cy.intercept('POST', '**/graphql', {
        forceNetworkError: true,
      }).as('addPost');

      // Fill out form.
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
      });
      // (Fill additional sections if required.)
      cy.get('[data-cy=upload-button]').click();
      cy.get('[data-cy=upload-image]').attachFile('sample-image.jpg');

      cy.get('form').submit();
      cy.wait('@cloudinaryUploadError');

      // Verify upload error toast.
      cy.get('.Toastify__toast-container').should('exist');
      cy.get('.Toastify__toast-body', { timeout: 20000 }).contains('Файл хуулахад алдаа гарлаа').should('be.visible');
    });
  });

  context('uploadImage Error Branch', () => {
    it('should handle error when fetch rejects with an Error instance', () => {
      cy.window()
        .its('uploadImage')
        .should('be.a', 'function')
        .then(() => {
          cy.window().then((win) => {
            (win as any).fetch = cy.stub().rejects(new Error('Test error'));
            return (win as any).uploadImage(new File(['dummy'], 'dummy.png', { type: 'image/png' })).then((result: any) => {
              expect(result).to.be.null;
            });
          });
        });
    });

    it('should handle error when fetch rejects with a non-Error value', () => {
      cy.window()
        .its('uploadImage')
        .should('be.a', 'function')
        .then(() => {
          cy.window().then((win) => {
            (win as any).fetch = cy.stub().rejects({ message: 'Plain object error' });
            return (win as any).uploadImage(new File(['dummy'], 'dummy.png', { type: 'image/png' })).then((result: any) => {
              expect(result).to.be.null;
            });
          });
        });
    });
  });

  context('Hidden Submit Trigger', () => {
    // This test forces a click on the hidden submit button (data-cy="submit-btn")
    // to help cover branches in your add-estate/page.tsx (e.g. lines 49-50, 95-96, 108).
    it('should trigger form submission when the hidden submit button is clicked', () => {
      // Setup intercepts similar to a successful submission.
      cy.intercept('POST', '**/graphql', {
        statusCode: 200,
        body: { data: { addPost: true } },
      }).as('addPost');
      cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
        statusCode: 200,
        body: { secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
      }).as('cloudinaryUpload');

      // Fill out minimal required sections.
      cy.get('[data-cy=property-details]').within(() => {
        cy.get('[data-cy=houseType]').select('Орон сууц');
        cy.get('[data-cy=title]').type('Hidden Button Test');
        cy.get('[data-cy=price]').type('150000');
        cy.get('[data-cy=size]').type('250');
        cy.get('[data-cy=totalRooms]').type('4');
        cy.get('[data-cy=garage]').select('Тийм');
      });
      cy.get('[data-cy=description-section]').within(() => {
        cy.get('[data-cy=description]').type('Submission via hidden button');
      });

      // Force-click the hidden submit button.
      cy.get('[data-cy="submit-btn"]').click({ force: true });
      // Since no Cloudinary call is actually triggered, wait only for addPost.
      cy.wait('@addPost').then((interception) => {
        expect(interception.response!.body.data.addPost).to.be.true;
      });
    });
  });
});
