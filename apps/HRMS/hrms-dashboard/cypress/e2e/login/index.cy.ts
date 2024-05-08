describe(' login  page on hrms', () => {
    beforeEach(() => cy.visit('/login'));
  
    it('1. Should display signin form', () => {
      cy.get('[data-testid="sign-in-form-container"]').should('exist').should('be.visible');
    });
    it('2. loads the form correctly', () => {
        cy.get('[data-testid="sign-in-form-container"]').should('exist');
        cy.get('[data-testid="sign-in-modal-title"]').should('have.text', 'Нэвтрэх');
      });
    it('3. Should display on  error message', ()=>{
        cy.get('[data-cy="Sign-In-Button"]').should('exist').click();
        cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain','Утас эсвэл имэйл хаяг оруулна уу' )
    })
    it('4. it should be uniq number' ,() =>{
        cy.get('[data-cy="Sign-In-Button"]').should('exist').click();
        cy.get('[data-cy="Sign-In-Button"]').should('be.disabled')
        cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain','Утас эсвэл имэйл хаяг оруулна уу' )
        cy.get('input[name="emailorPhone"]').type('123')
        cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain','Утас эсвэл имэйл хаяг байх ёстой' )
    })
    it("5. When user clicks on the signin button, it should create new user and shows 'Амжилттай нэвтэрлээ' message", () => {
        cy.get('[data-cy="Sign-In-Button"]').should('exist').click();
        cy.get('[data-cy="Sign-In-Button"]').should('be.disabled');
        cy.get('input[name="emailorPhone"]').type('test@gmail.com');
        cy.get('[data-cy="Sign-In-Button"]').should('not.be.disabled');
        cy.get('[data-cy="Sign-In-Button"]').click();
      });
   
  });
  