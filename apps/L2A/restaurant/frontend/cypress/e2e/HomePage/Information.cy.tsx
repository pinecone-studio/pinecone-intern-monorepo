describe('Information Page', () => {
  beforeEach(() => {
    cy.visit('/user/information');
  });

  it('should display the title correctly', () => {
    cy.get('[data-testid="Бидний тухай"]').should('exist');
    cy.get('[data-testid="Бидний тухай"]').should('have.text', 'Бидний тухай');
  });

  it('should display the image with correct alt and src', () => {
    cy.get('img[alt="image"]')
      .should('exist')
      .and('have.attr', 'src')
      .then((src) => {
        cy.log('Image src:', src);
        expect(src).to.include('/_next/image');
      });
  });

  it('should render the paragraphs with content', () => {
    cy.get('p').should('have.length', 3);
    cy.get('p').eq(0).should('contain.text', 'Манай Мексик хоолны газар');
    cy.get('p').eq(1).should('contain.text', 'Манай хоолны цэсэнд алдартай');
    cy.get('p').eq(2).should('contain.text', 'Бидний зорилго бол');
  });
});
