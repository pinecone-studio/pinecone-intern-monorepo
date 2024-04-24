describe('CustomInput component', () => {
    beforeEach(() => {
      cy.visit('/articles');
    });

    it('should select an option from a dropdown', () => {
        cy.get('[data-testid="custom-select"]')
        .should('exist')
    })

    it('should render texts', () => {
      cy.get('[data-testid="image-field-text"]')
      .should('exist')
      .and('have.text', "Өнгөц зураг")

      cy.get('[data-testid="comment-header-text"]')
      .should('exist')
      .and('have.text', "Сэтгэгдэл идэвхтэй")
    })

    it('should render and click on all buttons', () => {
      cy.get('[data-testid="save-draft-button"]')
      .should('exist')
      .contains('Ноорогт хадгалах')
      .click()

      cy.get('[data-testid="publish-button"]')
      .should('exist')
      .contains('Нийтлэх')
      .click()
    })
});