// cypress/support/utils.ts
export function mockCloudinaryUpload() {
  cy.intercept('POST', 'https://api.cloudinary.com/v1_1/**/image/upload', {
    statusCode: 200,
    // eslint-disable-next-line camelcase
    body: { secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
  }).as('cloudinaryUpload');
}

export function mockCloudinaryFailure() {
  cy.intercept('POST', 'https://api.cloudinary.com/v1_1/**/image/upload', {
    statusCode: 500,
    body: {},
  }).as('cloudinaryFail');
}
