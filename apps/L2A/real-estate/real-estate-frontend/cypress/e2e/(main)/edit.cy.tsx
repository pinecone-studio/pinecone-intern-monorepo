
describe('Edit Page E2E Test', () => {
  const MOCK_POST_ID = 'mock-post-123';
  const DRAFT_KEY = `unsaved-post-draft-${MOCK_POST_ID}`;

  const mockPost = {
    _id: MOCK_POST_ID,
    propertyOwnerId: 'owner-123',
    title: 'Original Title',
    description: 'Original description',
    price: 123456,
    type: 'HOUSE',
    size: 80,
    totalRooms: 3,
    restrooms: 2,
    garage: false,
    lift: false,
    feature: [],
    images: [],
    location: {
      city: 'Ulaanbaatar',
      district: 'Sukhbaatar',
      address: '123 Main St',
    },
    roofMaterial: 'Tile',
    floorNumber: 1,
    totalFloors: 3,
    balcony: true,
    windowsCount: 4,
    windowType: 'Double',
    completionDate: '2024-01-01',
    door: 'Wood',
  };

  beforeEach(() => {
    cy.window().then(win => win.localStorage.removeItem(DRAFT_KEY));
    cy.intercept('POST', '**/graphql', (req) => {
      const operationName = req.body.operationName;

      if (operationName === 'GetPostById') {
        req.alias = 'getPostById';
        req.reply({ data: { getPostById: mockPost } });
      }

      if (operationName === 'UpdatePostById') {
        req.alias = 'updatePostById';
        req.reply({ data: { updatePostById: true } });
      }
    });
    cy.visit(`/user-listing/edit/${MOCK_POST_ID}`);
    cy.wait('@getPostById');
  });

  it('loads with initial mock post data (covers lines 37-39, 43-50)', () => {
    cy.get('[data-testid="input-name"]').should('have.value', mockPost.title);
    cy.get('[data-testid="textarea-description"]').should('have.value', mockPost.description);
    cy.get('[data-testid="input-price"]').should('have.value', mockPost.price.toString());
    cy.get('[data-testid="input-city"]').should('have.value', mockPost.location.city);
    cy.get('[data-testid="input-district"]').should('have.value', mockPost.location.district);
    cy.get('[data-testid="input-address"]').should('have.value', mockPost.location.address);
  });

  it('loads draft from localStorage instead of backend data (covers lines 37-50)', () => {
    const draft = {
      ...mockPost,
      title: 'Draft Title',
      description: 'Draft description',
      price: '999999',
      location: {
        city: 'Draft City',
        district: 'Draft District',
        address: 'Draft Address',
      }
    };
    cy.window().then(win => {
      win.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    });
    cy.reload();
    cy.wait('@getPostById');
    cy.get('[data-testid="input-name"]').should('have.value', draft.title);
    cy.get('[data-testid="textarea-description"]').should('have.value', draft.description);
    cy.get('[data-testid="input-price"]').should('have.value', draft.price);
    cy.get('[data-testid="input-city"]').should('have.value', draft.location.city);
  });

  it('submits updated form and clears draft (covers lines 53-73)', () => {
    cy.window().then(win => {
      win.localStorage.setItem(DRAFT_KEY, JSON.stringify({ title: 'Old Draft' }));
    });
    cy.reload();
    cy.wait('@getPostById');
    cy.get('[data-testid="input-name"]').clear().type('Updated Title');
    cy.get('[data-testid="input-price"]').clear().type('888888');
    cy.get('[data-testid="input-city"]').clear().type('New City');
    cy.get('form').submit();
    cy.wait('@updatePostById').its('request.body.variables.input').should(input => {
      expect(input.title).to.equal('Updated Title');
      expect(input.price).to.equal(888888);
      expect(input.location.city).to.equal('New City');
    });
    cy.contains('Амжилттай хадгалагдлаа').should('be.visible');
    cy.window().then(win => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(win.localStorage.getItem(DRAFT_KEY)).to.be.null;
    });
  });

  it('shows error toast if updatePost throws error (covers lines 118-120)', () => {
  cy.intercept('POST', '**/graphql', (req) => {
    if (req.body.operationName === 'UpdatePostById') {
      req.alias = 'updatePostError';
      req.reply({
        statusCode: 500,
        body: {
          errors: [{ message: 'Mock server error' }],
        },
      });
    }
    if (req.body.operationName === 'GetPostById') {
      req.alias = 'getPostById';
      req.reply({ data: { getPostById: mockPost } });
    }
  });
  cy.reload();
  cy.wait('@getPostById');
  cy.get('[data-testid="input-name"]').clear().type('Trigger Error');
  cy.get('form').submit();
  cy.wait('@updatePostError');
  cy.contains('Алдаа гарлаа').should('be.visible');
});
});
