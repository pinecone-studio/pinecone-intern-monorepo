// describe('CreateProfile image submission', () => {
//   beforeEach(() => {
//     localStorage.setItem('token', 'mock-token');

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
//   });

//   it('uses formData.images when no override is passed', () => {
//     cy.visit('/auth/create-account');

//     cy.contains('Select').click();
//     cy.get('[data-testid="gender-male"]').click();
//     cy.contains('Next').click(); 

//     cy.contains('Pick a date').click();
//     cy.get('button[name="day"]').eq(1).click();
//     cy.contains('Next').click(); 

//     cy.get('[data-cy="input-name"]').type('John');
//     cy.get('[data-cy="input-bio"]').type('Bio');
//     cy.get('[data-cy="input-interest"]').type('Music');
//     cy.get('[data-cy="input-profession"]').type('Engineer');
//     cy.get('[data-cy="input-school"]').type('Harvard');
//     cy.get('[data-cy="next-button"]').click(); 


//     const fileName = 'test.png';
//     const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'; 
//     const byteArray = Uint8Array.from(Buffer.from(base64Image, 'base64'));
//     const blob = new Blob([byteArray], { type: 'image/png' });
//     const testFile = new File([blob], fileName, { type: 'image/png' });

//     cy.get('input[type="file"]').selectFile(
//       { contents: testFile, fileName, lastModified: Date.now() },
//       { force: true }
//     );

//     cy.get('[data-cy="step-button"]').contains('Next').click();
//     cy.wait('@graphql'); 
//     cy.contains("Youre all set!").should('exist');
//   });
// });
