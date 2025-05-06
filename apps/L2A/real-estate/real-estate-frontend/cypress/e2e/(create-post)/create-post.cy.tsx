describe('CreatePostCard Form', () => {
  beforeEach(() => {
    cy.visit('/create-post');
  });

  it('successfully submits form with valid data', () => {
    cy.get('input[name="name"]').type('Тест байр');
    cy.get('input[name="price"]').type('150000000');
    cy.get('input[name="field"]').type('80');
    cy.get('input[name="room"]').type('3');
    cy.get('input[name="restroom"]').type('2');

    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('formSubmit');
    });

    cy.contains('Зар оруулах хүсэлт илгээх').click();

    cy.get('@formSubmit').should('have.been.calledWithMatch', {
      name: 'Тест байр',
      price: '150000000',
      field: '80',
      room: '3',
      restroom: '2',
    });
  });

  it('shows validation errors on empty submit', () => {
    cy.contains('Зар оруулах хүсэлт илгээх').click();

    cy.contains('Нэр заавал оруулна уу');
    cy.contains('Үнэ заавал оруулна уу');
    cy.contains('Талбайн утгыг заавал оруулна уу');
    cy.contains('Өрөөний тоог заавал оруулна уу');
    cy.contains('Ариун цэврийн өрөөний тоог заавал оруулна уу');
  });

  it('validates minimum values correctly', () => {
    cy.get('input[name="price"]').type('-1');
    cy.get('input[name="field"]').type('5');
    cy.get('input[name="room"]').type('0');
    cy.get('input[name="restroom"]').type('0');

    cy.contains('Зар оруулах хүсэлт илгээх').click();

    cy.contains('Үнэ 0-ээс их байх ёстой');
    cy.contains('Талбайн утга 2-оос дээш оронтой байх ёстой');
    cy.contains('Өрөөний тоо 1-ээс их байх ёстой');
    cy.contains('Ариун цэврийн өрөөний тоо 1-ээс их байх ёстой');
  });
});
