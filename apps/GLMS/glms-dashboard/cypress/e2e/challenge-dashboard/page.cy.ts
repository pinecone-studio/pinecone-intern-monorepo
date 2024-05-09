describe('Page Component', () => {
  beforeEach(() => {
    cy.visit('/challenge-dashboard');
  });

  it('1. should type in question input', () => {
    cy.get('input[name="question"]').type('Sample question');
  });

  it('2. should add answers when text quiz button is clicked ', () => {
    cy.get('[data-testid="select-text-button"]').click();
    cy.get('[data-cy="answer-input"]').eq(0).type('Answer 1');
    cy.contains('Хариулт нэмэх').click();
    cy.get('[data-cy="answer-input"]').eq(1).type('Answer 2');
    cy.contains('Хариулт нэмэх').click();
    cy.get('[data-cy="answer-input"]').eq(2).type('Answer 3');
    cy.contains('Хариулт нэмэх').click();
    cy.get('[data-cy="answer-input"]').eq(3).type('Answer 4');
    cy.contains('Зөв хариулт сонгох').click();
    cy.get('[data-cy="radio-input"]').eq(2).click();
  });

  it('3. should add question and two image answers and if cancel button is clicked image will not be display', () => {
    cy.get('[data-testid="select-file-button"]').click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/html.png', { force: true });
    cy.get('[data-testid="cancel-btn"]').eq(0).click();
    cy.get('[data-testid="cancel-btn"]').eq(1).click();
  });

  it('4. should add question and two image and click true or false', () => {
    cy.get('[data-testid="select-file-button"]').click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/html.png', { force: true });
    cy.get('input[type="checkbox"]').eq(1).click();
  });

  it('5. should add question and two image and click true or false', () => {
    cy.get('[data-testid="select-file-button"]').click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/html.png', { force: true });
    cy.get('input[type="checkbox"]').eq(1).click();
  });

  it('6. should submit text answer data', () => {
    cy.get('input[name="question"]').type('Sample question');
    cy.get('[data-testid="select-text-button"]').click();
    cy.get('[data-cy="answer-input"]').eq(0).type('Answer 1');
    cy.contains('Хариулт нэмэх').click();
    cy.get('[data-cy="answer-input"]').eq(1).type('Answer 2');
    cy.contains('Хариулт нэмэх').click();
    cy.get('[data-cy="answer-input"]').eq(2).type('Answer 3');
    cy.contains('Хариулт нэмэх').click();
    cy.get('[data-cy="answer-input"]').eq(3).type('Answer 4');
    cy.contains('Зөв хариулт сонгох').click();
    cy.get('[data-cy="radio-input"]').eq(2).click();
    cy.get('[data-cy="submit-btn"]').click();
  });

  it('7. should submit image answer data', () => {
    cy.get('input[name="question"]').type('Sample question');
    cy.get('[data-testid="select-file-button"]').click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/html.png', { force: true });
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.get('input[type="checkbox"]').eq(0).click();
    cy.get('[data-cy="submit-btn"]').click();
  });
});
