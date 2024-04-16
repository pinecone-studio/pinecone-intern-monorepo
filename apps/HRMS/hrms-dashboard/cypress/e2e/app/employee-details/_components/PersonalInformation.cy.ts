import CreateIcon from '@mui/icons-material/Create';
describe('personal information', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('should update button', () => {
    cy.get('[data-testid="personal-Information-test"]').should('exist').should('have.text', 'Хувийн мэдээлэл');
  });
  it('update button', () => {
    cy.get('[data-testid="data-testid"]');
  });
});
