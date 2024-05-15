describe('AddJobPage', () => {
  it('should render the AddJobPageComponent', () => {
    cy.visit('/recruiting/add-job');
    cy.get('[data-testid="add-job-comp"]').should('be.visible');
  });
});

describe('JobDetailPage', () => {
  it('should render the JobDetail', () => {
    cy.visit('/recruiting/job-detail');
    cy.get('[data-testid="job-detail-comp"]').should('be.visible');
  });
});

describe('EditJobPage', () => {
  it('should render the EditJob', () => {
    cy.visit('/recruiting/edit-job');
    cy.get('[data-testid="edit-job-comp"]').should('be.visible');
  });
});
