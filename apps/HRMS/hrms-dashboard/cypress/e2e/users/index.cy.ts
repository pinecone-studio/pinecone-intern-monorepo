import { HrmsRoles} from '@/generated';

describe('Users table Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetHrmsUsers') {
        req.reply({
          data: {
            getHrmsUsers: [
              { _id: '1', firstName: 'Bat', role:HrmsRoles.Admin , email:'bat@gmail.com' },
              { _id: '2', firstName: 'Dorj', role:HrmsRoles.Employee , email:'dorj@gmail.com'},
              { _id: '3',firstName: 'Dash', role:HrmsRoles.Employee , email:'dash@gmail.com'},
            ],
          },
        });
      }
    }).as('getHrmsUsers');
    cy.visit('/users');
    cy.wait('@getHrmsUsers');
});

it('renders users component correctly', () => {
 cy.get('[data-cy=users-page]').should('exist');
  cy.get('[data-testid=RoleTableContainer]').should('exist');
  cy.get('[data-testid=RoleTableHeader]').within(() => {
    cy.contains('h1', 'Admin role update').should('exist');
  });
  cy.get('[data-testid=RoleTableContent]').should('exist');
});

it('checks the layout of the RoleTableFeature', () => {
  cy.get('[data-testid=RoleTableHeader]').should('exist');
  cy.get('[data-testid=RoleTableContent]').should('exist');
});

it('renders the component', () => {
    cy.get('[data-testid="user-table"]').should('exist');
});

// it('deletes a user', () => {
//   // Mock the GraphQL mutation request if applicable
//   cy.intercept('POST', '**/deletedHrmsUser').as('deleteUser');

//   // Trigger the function (e.g., clicking delete button)
//   cy.get('[aria-label="delete"]').first().click();

//   // Wait for the function to complete (e.g., network request)
//   cy.wait('@deleteUser').then(() => {
//     // Assert the expected outcome after function execution
//     // For example, check for success toast notification
//    cy.visit('/');
//   });
// });

// it('handles deletion error', () => {
//   // Mock an error scenario by intercepting the mutation request
//   cy.intercept('POST', '**/deletedHrmsUser', {
//     statusCode: 500,
//     body: { error: 'Internal Server Error' },
//   }).as('deleteUserError');

//   // Trigger the function (e.g., clicking delete button)
//   cy.get('[aria-label="delete"]').first().click();

//   // Wait for the function to complete (e.g., network request)
//   cy.wait('@deleteUserError').then(() => {
//     // Assert the expected outcome after function execution
//     // For example, check for error toast notification
//     cy.contains('.Toastify__toast-body', 'Error deleting user').should('exist');
//   });
// });

});





  