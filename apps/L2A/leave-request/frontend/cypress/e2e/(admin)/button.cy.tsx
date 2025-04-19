describe('Register New Employee Button', () => {
    beforeEach(() => {
      cy.visit('/admin') 
    })
  
    it('should display the Register New Employee button', () => {
      cy.contains('+ Шинэ ажилтан бүртгэх').should('be.visible')
    })
  
    it('should do something when clicked (if applicable)', () => {
      cy.contains('+ Шинэ ажилтан бүртгэх').click()
    })
  })
  