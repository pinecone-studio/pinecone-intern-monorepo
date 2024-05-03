describe('PublishLeftSide', () => {
    beforeEach(() => {
      cy.visit('/articles/create-article');
    }); 
  
    it('1. Should render PublishLeftSide component', () => {
      cy.get('[data-testid="create-article-main-container"]').should('exist').should('be.visible');
    });

    it ('2. Should enter title', ()=>{

      cy.get('[data-testid="title"]').should('exist').should('be.visible').type('garchig');
    });

    it ('3. Should enter content', ()=>{
      cy.get('[data-testid="title"]').should('exist').should('be.visible').type('garchig');
      cy.get('[data-testid="content"]').should('exist').should('be.visible').type('aguulga');
    });

    it ('4. When user clicks on the createArticle button, it should create new article', ()=>{
      cy.get('[data-testid="title"]').should('exist').should('be.visible').type('garchig');
      cy.get('[data-testid="content"]').should('exist').should('be.visible').type('aguulga');
      cy.get('[data-testid="create-article-btn"]').should('exist').should('be.visible').click();
      cy.url().should('include', '/articles/create-article');
    });
    

  });
  
  