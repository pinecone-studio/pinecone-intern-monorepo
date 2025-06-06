// describe('AuthContext login/logout', () => {
//   beforeEach(() => {
//     cy.intercept('POST', '/api/graphql', (req) => {
//       const op = req.body.operationName;

//       if (op === 'SignIn') {
//         req.reply({
//           data: {
//             signIn: 'mock-jwt-token',
//           },
//         });
//       }

//       if (op === 'GetCurrentUser') {
//         req.reply({
//           data: {
//             getCurrentUser: {
//               _id: 'tuuguu123123@gmail.com',
//               email: '90131305',
//               isVerified: true,
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//               __typename: 'User',
//               verficationCode: '123456',
//             },
//           },
//         });
//       }
//     }).as('graphql');
//   });

//   it('logs in user via form and redirects', () => {
//     cy.visit('/auth/sign-in');

//     cy.get('[data-cy="email-input"]').type('user@example.com');
//     cy.get('[data-cy="password-input"]').type('password123');
//     cy.get('[data-cy="submit-button"]').click();

//     cy.wait('@graphql'); // Wait for login mutation

//     cy.url().should('include', '/swipe-page');

//     cy.window().then((win) => {
//       expect(win.localStorage.getItem('token')).to.eq('mock-jwt-token');
//     });
//   });

//   it('logs out user and clears token', () => {
//     cy.visit('/swipe-page', {
//       onBeforeLoad(win) {
//         win.localStorage.setItem('token', 'mock-jwt-token');
//       },
//     });

//     cy.get('[data-cy="logout-button"]').click();

//     cy.url().should('include', '/auth/sign-in');

   
//   });
// });
