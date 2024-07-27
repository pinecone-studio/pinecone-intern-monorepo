import { HrmsRoles } from '@/generated';
describe('Users Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetHrmsUsers') {
        req.reply({
          data: {
            getHrmsUsers: [
              { id: '1', firstName: 'Bat', _id:"123" , role: HrmsRoles.Admin, email:'test@gmail.com'},
              { id: '2', firstName: 'Bet', _id:"123" , role: HrmsRoles.Employee, email:'test@gmail.com'},
              { id: '3', firstName: 'But', _id:"123" ,role: HrmsRoles.Admin, email:'test@gmail.com'},
            ],
          },
        });
      }
    }).as('GetHrmsUsers');
    cy.visit('/users');
    cy.wait('@GetHrmsUsers');
  });
  it('renders the Users page', () => {
    cy.get('[data-cy="users-page"]').should('exist');
  });
it('has the correct CSS class', () => {
 cy.get('[data-cy="users-page"]').should('have.class', 'w-full');
  });
it('RoleTableFeature is the only child of the Users component', () => {
    cy.get('[data-cy="users-page"]').children().should('have.length', 1);
  });
it('renders the component structure correctly', () => {
    cy.get('[data-testid="RoleTableContainer"]').should('exist');
    cy.get('[data-testid="RoleTableHeader"]').should('exist');
    cy.get('[data-testid="RoleTableContent"]').should('exist');
  });
it('displays the correct header text', () => {
    cy.get('[data-testid="RoleTableHeader"] h1').should('have.text', 'Admin role update');
  });
it('renders LoginRoleSearch component', () => {
    cy.get('[data-testid="login-role-search"]').should('exist');
  });
it('renders RoleTable component', () => {
    cy.get('[data-testid="user-table"]').should('exist');
  });
it('displays loading state', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetHrmsUsers') {
        req.reply({
          delay: 1000,
          data: { getClasses: [] },
        });
      }
    }).as('getHrmsUsersDelayed');
    cy.visit('/users');
    cy.contains('Loading...').should('be.visible');
    cy.wait('@getHrmsUsersDelayed');
  });
it('displays error state', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetHrmsUsers') {
        req.reply({
          forceNetworkError: true,
        });
      }
    }).as('getHrmsUsersError');
    cy.visit('/users');
    cy.wait('@getHrmsUsersError');
    cy.contains('Error').should('be.visible');
  });
it('successfully deletes a user, shows toast, and refetches data', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'DeletedHrmsUser') {
        req.reply({ body: { data: { deletedHrmsUser: true } } });
      }
    }).as('deleteHrmsUser');
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetHrmsUsers') {
        req.reply({
          data: {
            getHrmsUsers: [
              { id: '2', firstName: 'Bet', _id: "456", role: HrmsRoles.Employee, email: 'bet@gmail.com' },
              { id: '3', firstName: 'But', _id: "789", role: HrmsRoles.Admin, email: 'but@gmail.com' },
            ],
          },
        });
      }
    }).as('refetchHrmsUsers');
    cy.get('[data-testid="delete-user-button"]').first().click();
    cy.wait('@deleteHrmsUser');
    cy.contains('Successfully deleted').should('be.visible');
    cy.wait('@refetchHrmsUsers');
    cy.get('[data-testid="user-table"] tbody tr').should('have.length', 2);
    cy.get('[data-testid="user-table"] tbody tr').first().should('contain', 'Bet');
  });

  it('handles ApolloError during user deletion and shows error toast', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'DeletedHrmsUser') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'ApolloError: Failed to delete user' }],
            data: null
          }
        });
      }
    }).as('deleteHrmsUserError');
    cy.get('[data-testid="delete-user-button"]').first().click();
    cy.wait('@deleteHrmsUserError');
    cy.contains('An error occurred while deleting').should('be.visible');
    cy.get('[data-testid="user-table"] tbody tr').should('have.length', 3);
    cy.get('[data-testid="user-table"] tbody tr').first().should('contain', 'Bat');
  });
it('handles unsuccessful deletion without throwing an error', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'DeletedHrmsUser') {
        req.reply({ body: { data: { deletedHrmsUser: false } } });
      }
    }).as('unsuccessfulDelete');
    cy.get('[data-testid="delete-user-button"]').first().click();
    cy.wait('@unsuccessfulDelete');
    cy.contains('Successfully deleted').should('not.exist');
    cy.contains('An error occurred while deleting').should('not.exist');
    cy.get('[data-testid="user-table"] tbody tr').should('have.length', 3);
    cy.get('[data-testid="user-table"] tbody tr').first().should('contain', 'Bat');
  });
 it('applies correct CSS classes', () => {
    cy.get('[data-testid="RoleTableContainer"]')
      .should('have.class', 'flex')
      .and('have.class', 'flex-col')
      .and('have.class', 'w-full')
      .and('have.class', 'h-full')
      .and('have.class', 'container')
      .and('have.class', 'mx-auto')
      .and('have.class', 'items-center')
      .and('have.class', 'py-8')
      .and('have.class', 'gap-7');
    cy.get('[data-testid="RoleTableHeader"]')
      .should('have.class', 'w-[1154px]')
      .and('have.class', 'bg-[white]')
      .and('have.class', 'rounded-xl')
      .and('have.class', 'h-[72px]')
      .and('have.class', 'flex')
      .and('have.class', 'items-center')
      .and('have.class', 'justify-start')
      .and('have.class', 'p-[20px]');
    cy.get('[data-testid="RoleTableContent"]')
      .should('have.class', 'w-[1154px]')
      .and('have.class', 'bg-white')
      .and('have.class', 'rounded-xl')
      .and('have.class', 'px-[20px]')
      .and('have.class', 'py-[20px]');
  });

});



