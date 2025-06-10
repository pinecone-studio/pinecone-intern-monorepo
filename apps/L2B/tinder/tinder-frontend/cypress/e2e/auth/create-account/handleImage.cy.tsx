// describe('CreateProfile image submission', () => {
//   beforeEach(() => {
//     localStorage.setItem('token', 'mock-token');

//     // Mock GraphQL requests
//     cy.intercept('POST', '/api/graphql', (req) => {
//       if (req.body.operationName === 'GetCurrentUser') {
//         req.reply({
//           data: {
//             getCurrentUser: {
//               _id: 'mock-user-id',
//               email: 'user@example.com',
//               isVerified: true,
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//               __typename: 'User',
//             },
//           },
//         });
//       }

//       if (req.body.operationName === 'CreateProfile') {
//         const images = req.body.variables.input.images;
//         expect(images.length).to.be.greaterThan(0);
//         req.reply({
//           data: {
//             createProfile: {
//               id: 'mock-profile-id',
//               status: 'SUCCESS',
//             },
//           },
//         });
//       }
//     }).as('graphql');

//     // Intercept Cloudinary upload
//     cy.intercept('POST', 'https://api.cloudinary.com/v1_1/**/image/upload', {
//       statusCode: 200,
//       body: {
//         secure_url: 'https://res.cloudinary.com/demo/image/upload/v123456789/sample.jpg',
//       },
//     }).as('cloudinaryUpload');
//   });

//   it('uploads an image and completes profile creation', () => {
//     cy.visit('/auth/create-account');

//     // Step 1: Select gender
//     cy.contains('Select').click();
//     cy.get('[data-testid="gender-male"]').click();
//     cy.contains('Next').click();

//     // Step 2: Select birthday
//     cy.contains('Pick a date').click();
//     cy.get('button[name="day"]').eq(1).click();
//     cy.contains('Next').click();

//     // Step 3: Enter profile info
//     cy.get('[data-cy="input-name"]').type('John');
//     cy.get('[data-cy="input-bio"]').type('Bio');
//     cy.get('[data-cy="input-interest"]').type('Music');
//     cy.get('[data-cy="input-profession"]').type('Engineer');
//     cy.get('[data-cy="input-school"]').type('Harvard');
//     cy.get('[data-cy="next-button"]').click();

//     // Step 4: Upload image
//     const fileName = 'test.png';
//     const fileType = 'image/png';
//     const fileContent = 'iVBORw0KGgoAAAANSUhEUgAAAAUA'; // base64 snippet

//     const byteArray = Uint8Array.from(Buffer.from(fileContent, 'base64'));
//     const blob = new Blob([byteArray], { type: fileType });
//     const testFile = new File([blob], fileName, { type: fileType });

//     cy.get('input[type="file"]').selectFile(
//       {
//         contents: testFile,
//         fileName: fileName,
//         lastModified: Date.now(),
//       },
//       { force: true }
//     );

//     // Click Next and wait for upload + submit
//     cy.get('[data-cy="step-button"]').click();
//     cy.wait('@cloudinaryUpload');
//     cy.wait('@graphql');

//     // Final step: Confirmation
//     cy.contains("Youre all set!").should('exist');
//   });
// });
