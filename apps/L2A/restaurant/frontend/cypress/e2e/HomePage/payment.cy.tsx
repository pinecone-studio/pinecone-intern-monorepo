describe('Payment Selection Page', () => {
  beforeEach(() => {
    cy.visit('/payment'); 
  });

  it('renders the main elements correctly', () => {
    cy.get('[data-testid="div"]').should('exist');

    cy.get('[data-testid="Төлбөрийн хэрэгсэл"]')
      .should('contain.text', 'Төлбөрийн хэрэгсэл')
      .and('contain.text', 'сонгоно уу');

    cy.get('select')
      .should('exist')
      
  });
it('renders payment buttons with correct labels and icons', () => {
  cy.get('[data-testid="qpay-button"]').should('exist').and('contain.text', 'Qpay');
  cy.get('[data-testid="socialpay-button"]').should('exist').and('contain.text', 'SocialPay');
  cy.get('[data-testid="wallet-button"]').should('exist').and('contain.text', 'Хэтэвч');


  cy.get('[data-testid="qpay-button"] img').should('exist');
  cy.get('[data-testid="socialpay-button"] img').should('exist');
  cy.get('[data-testid="wallet-button"] img').should('exist');
});


  it('displays order details correctly', () => {
    cy.contains('Захиалгын нийт дүн:').should('exist');
    cy.contains('53,000₮').should('exist');
    cy.contains('Хоолны сав:').should('exist');
    cy.contains('4,000₮').should('exist');
    cy.contains('Төлөх дүн:').should('exist');
  });

  it('dropdown changes value', () => {
    cy.get('select').select('Эндээ идэх').should('have.value', 'Эндээ идэх');
  });
});
