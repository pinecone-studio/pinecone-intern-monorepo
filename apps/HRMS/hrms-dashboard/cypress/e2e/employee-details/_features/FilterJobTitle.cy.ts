describe('Status filter', () => {
  beforeEach(() => cy.visit('/employee-details?employees=1'));

  it('1.Selects an option from the dropdown', () => {
    cy.get('[data-cy=filterJob]').select(1);
    cy.get('[data-cy=filterJob]')
      .invoke('val')
      .then((selectedValue) => {
        return expect(selectedValue).to.exist;
      });
  });
});
