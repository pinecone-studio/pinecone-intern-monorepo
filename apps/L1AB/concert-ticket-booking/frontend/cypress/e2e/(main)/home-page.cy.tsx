describe('Page Component Tests', () => {
  beforeEach(() => {
    // Хуудсыг ачаалах
    cy.visit('/'); // Root буюу үндсэн хуудсыг чиглүүлж байгаа
  });

  it('should render the Container component', () => {
    // Container бүрэлдэхүүн хэсгийг шалгах
    cy.get('div').should('have.class', 'container'); // Container-д тохирсон class эсвэл элемент шалгана
  });

  it('should render the MainHeroComponent', () => {
    // MainHeroComponent оршин буй эсэхийг шалгах
    cy.get('[data-testid="main-hero"]').should('exist');
  });

  it('should render the Event component', () => {
    // Event бүрэлдэхүүн хэсгийг шалгах
    cy.get('[data-testid="event"]').should('exist');
  });
});
