describe('CreatePostCard Form', () => {
  beforeEach(() => {
    cy.visit('/create-post'); 
  });

  it('should render the form and all fields', () => {
    cy.get('label').contains('Төрөл').should('be.visible');
    cy.get('label').contains('Нэр').should('be.visible');
    cy.get('label').contains('Үнэ').should('be.visible');
    cy.get('label').contains('Талбайн утга').should('be.visible');
    cy.get('label').contains('Өрөөний тоо').should('be.visible');
    cy.get('label').contains('Ариун цэврийн өрөөний тоо').should('be.visible');

    cy.get('button').contains('Зар оруулах хүсэлт илгээх').should('be.visible');
  });

  it('should show validation errors when submitting with empty fields', () => {
    cy.get('button').contains('Зар оруулах хүсэлт илгээх').click();

    cy.get('p').contains('Төрлөө сонгоно уу').should('be.visible');
    cy.get('p').contains('Нэр заавал оруулна уу').should('be.visible');
    cy.get('p').contains('Үнэ заавал оруулна уу').should('be.visible');
    cy.get('p').contains('Талбайн утгыг заавал оруулна уу').should('be.visible');
    cy.get('p').contains('Өрөөний тоог заавал оруулна уу').should('be.visible');
    cy.get('p').contains('Ариун цэврийн өрөөний тоог заавал оруулна уу').should('be.visible');
  });

  it('should fill fields correctly and submit the form', () => {

    cy.get('input[name="type"]').type('apartment');
    cy.get('input[name="name"]').type('My Beautiful Apartment');
    cy.get('input[name="price"]').type('200000');
    cy.get('input[name="field"]').type('50');
    cy.get('input[name="room"]').type('2');
    cy.get('input[name="restroom"]').type('1');

    cy.get('button').contains('Зар оруулах хүсэлт илгээх').click();
    cy.window().then((window) => {
      expect(window.console.log).to.have.been.calledWith('Form data', {
        type: 'apartment',
        name: 'My Beautiful Apartment',
        price: '200000',
        field: '50',
        room: '2',
        restroom: '1',
      });
    });
  });

  it('should show error messages when invalid data is entered', () => {
    cy.get('input[name="price"]').type('-1');

    cy.get('button').contains('Зар оруулах хүсэлт илгээх').click();
    cy.get('p').contains('Үнэ 0-ээс их байх ёстой').should('be.visible');
  });

  it('should show a success message or perform some action after successful submission', () => {
    cy.get('button').contains('Зар оруулах хүсэлт илгээх').click();

    cy.get('.success-message').should('be.visible');
  });
});
