describe('CreatePostCard form', () => {
  beforeEach(() => {
    cy.visit('/create-post');
  });

  it('Displays validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Төрлөө сонгоно уу!').should('be.visible');
    cy.contains('Нэр заавал оруулна уу!').should('be.visible');
    cy.contains('Үнэ заавал оруулна уу!').should('be.visible');
    cy.contains('Талбайн утгыг заавал оруулна уу!').should('be.visible');
    cy.contains('Өрөөний тоог заавал оруулна уу!').should('be.visible');
    cy.contains('Ариун цэврийн өрөөний тоог заавал оруулна уу!').should('be.visible');
    cy.contains('Зогсоолын утга сонгоно уу!').should('be.visible');
    cy.contains('Дэлгэрэнгүй тайлбар бичнэ үү!').should('be.visible');
    cy.contains('Дүүрэг заавал оруулна уу!').should('be.visible');
    cy.contains('Хороо заавал оруулна уу!').should('be.visible');
    cy.contains('Ашиглалтанд орсон он заавал оруулна уу!').should('be.visible');
    cy.contains('Цонхны тоог заавал оруулна уу!').should('be.visible');
    cy.contains('Цонхны загварыг заавал оруулна уу!').should('be.visible');
    cy.contains('Хаалганы загварыг заавал оруулна уу!').should('be.visible');
    cy.contains('Давхрын тоог заавал оруулна уу!').should('be.visible');
    cy.contains('Барилгын давхрын тоог заавал оруулна уу!').should('be.visible');
  });

  it('Submits form when all fields are valid', () => {
    cy.get('[data-testid="type"]').click();
    cy.get('[data-testid="type-option-house"]').click();

    cy.get('input[name="name"]').type('Шинэ байр');
    cy.get('input[name="price"]').type('100000000');
    cy.get('input[name="field"]').type('80');
    cy.get('input[name="room"]').type('3');
    cy.get('input[name="restroom"]').type('2');

    cy.get('[data-testid="parking"]').click();
    cy.get('[data-testid="parking-option-yes"]').click();

    cy.get('textarea[name="text"]').type('Шинэ байрны тайлбар');
    cy.get('input[name="district"]').type('Сүхбаатар');
    cy.get('input[name="section"]').type('1-р хороо');
    cy.get('input[name="year"]').type('2023');
    cy.get('input[name="windows"]').type('2');
    cy.get('input[name="window"]').type('3 цонхтой');
    cy.get('input[name="door"]').type('Бүргэд хаалга');
    cy.get('input[name="floor"]').type('5');
    cy.get('input[name="aptfloor"]').type('3');

    cy.get('button[type="submit"]').click();

    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });

    cy.get('@consoleLog').should('be.calledWithMatch', {
      type: 'house',
      name: 'Шинэ байр',
      price: '100000000',
      field: '80',
      room: '3',
      restroom: '2',
      parking: 'yes',
      text: 'Шинэ байрны тайлбар',
      district: 'Сүхбаатар',
      section: '1-р хороо',
      year: '2023',
      windows: '2',
      window: '3 цонхтой',
      door: 'Бүргэд хаалга',
      floor: '5',
      aptfloor: '3',
    });
  });
});
