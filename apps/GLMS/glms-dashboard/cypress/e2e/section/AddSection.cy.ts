describe('AddSection feature', () => {
  beforeEach(() => {
    cy.visit('/section') 
  })

  it('should render AddSection component', () => {
    cy.get('[data-testid="add-section-component"]').should('exist').should('be.visible')
  })

  it('should allow fill  input' , () => {
    cy.get('[data-cy="add-section-title-input"]').should('exist').should('contain' , 'Html')
    cy.get('[data-cy="add-section-title-description"]').should('exist').should('contain' , 'Html introduction')
    cy.get('[data-cy="add-section-handle-btn"]').should('exist').click()
  })

  // it('should allow entering section title', () => {
  //   const title = 'Sample Title'
  //   cy.get('[data-cy="add-section-title-input"]').type(title)
  //   cy.get('[data-cy="add-section-title-input"]').should('have.value', title)
  // })

  // it('should allow entering section description', () => {
  //   const description = 'Sample Description'
  //   cy.get('[data-cy="add-section-description-input"]').type(description)
  //   cy.get('[data-cy="add-section-description-input"]').should('have.value', description)
  // })

  // it('should allow submitting section', () => {
  //   const title = 'Sample Title'
  //   const description = 'Sample Description'

  //   cy.intercept('POST', '/graphql', (req) => {
  //     if (req.body.operationName === 'CreateSection') {
  //       req.reply({
  //         body: {
  //           data: {
  //             createSection: {
  //               id: '123',
  //               title: title,
  //               description: description,
  //             }
  //           }
  //         },
  //         headers: {
  //           'access-control-allow-origin': '*'
  //         }
  //       })
  //     }
  //   }).as('createSection')

  //   cy.get('[data-cy="add-section-title-input"]').type(title)
  //   cy.get('[data-cy="add-section-description-input"]').type(description)
  //   cy.get('[data-cy="add-section-handle-btn"]').click()

  //   cy.wait('@createSection').then((interception) => {
  //     expect(interception?.response?.statusCode).to.eq(200)
  //   })
  // })
})
