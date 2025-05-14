describe("Sign in page", () => {
    beforeEach(() => {
      cy.visit("/signin");
    });
  
    it("1. Should render sign-in", () => {
      cy.get('[data-cy=Sign-In-Page]').should("be.visible");
    });
  
    it("2. When user does not enter email, it should display error message", () => {

      cy.get('input[type="password"]').type("Password1"); 
  
      cy.get('form').submit();
  
      cy.contains("Email is required.").should("be.visible");
    });
  
    it("3. When password is less than 8 characters, should show error", () => {
      cy.get('input[type="email"]').type("test@example.com");
      cy.get('input[type="password"]').type("Ab1"); 
  
      cy.get("form").submit();
  
      cy.contains("Password must be at least 8 characters long.").should("be.visible");
    });
  
    it("4. When password is missing uppercase letter, should show error", () => {
      cy.get('input[type="email"]').type("test@example.com");
      cy.get('input[type="password"]').type("password1"); 
  
      cy.get("form").submit();
  
      cy.contains("Password must include at least one uppercase letter.").should("be.visible");
    });

    it("5. Should display the Forget password button",()=>{
        cy.contains('Forget password?').should('be.visible').click()
        cy.url().should('include','/signup')
    })
  
    it("6. When form is valid, should not show error", () => {
      cy.get('input[type="email"]').type("test@example.com");
      cy.get('input[type="password"]').type("Password1");
  
      cy.get("form").submit();
  
      cy.get(".text-red-500").should("not.exist");
    });
  });
  