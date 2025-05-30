import "cypress-file-upload";
 
describe('Create Post Form E2E Test (Mock fetch)', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body;
      const isCreatePostMutation = body.query?.includes('mutation CreatePost');
 
      if (isCreatePostMutation) {
        req.alias = 'createPostMutation';
        req.reply({
          data: {
            createPost: {
              _id: 'mock-id-123',
              title: 'Шинэ байр',
              type: 'HOUSE',
              price: 100000000,
            },
          },
        });
      } else {
        req.reply({ data: {} });
      }
    });
 
    cy.visit('/create-post');
  });
 
  it('should submit the form and show success message', () => {
    cy.get('[data-testid="type"]').click();
    cy.get('[data-testid="house"]').click();
    cy.get('input[title="title"]').type('Шинэ байр');
    cy.get('input[name="price"]').type('100000000');
    cy.get('input[name="field"]').type('80');
    cy.get('input[name="room"]').type('3');
    cy.get('input[name="restroom"]').type('2');
    cy.get('[data-testid="upload-button"]').click();
    cy.get('[data-testid="image-input"]').attachFile('test-photo.png');
    cy.get('[data-testid="uploaded-image"]').should('exist');
    cy.get('[data-testid="parking"]').click();
    cy.get('[data-testid="parking-option-yes"]').click();
    cy.get('textarea[name="text"]').type('Шинэ байрны тайлбар');
    cy.get('input[name="location.city"]').type('Улаанбаатар');
    cy.get('input[name="location.district"]').type('Сүхбаатар');
    cy.get('input[name="location.address"]').type('1-р хороо');
    cy.get('input[name="year"]').type('2023');
    cy.get('input[name="windows"]').type('2');
    cy.get('input[name="window"]').type('3 цонхтой');
    cy.get('input[name="door"]').type('Бүргэд хаалга');
    cy.get('input[name="floor"]').type('5');
    cy.get('input[name="aptfloor"]').type('3');
    cy.get('input[name="ground"]').type('Паркетан шал');
    cy.get('input[name="balcony"]').type('1');
 
    cy.get('button[data-testid="button"]').click();
 

 
    cy.on('window:alert', (text) => {
      expect(text).to.include('Амжилттай илгээгдлээ!');
    });
  });
  
});