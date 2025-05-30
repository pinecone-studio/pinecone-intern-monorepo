describe('GeneralInfoSection - Ерөнхий мэдээлэл хэсэг', () => {
  beforeEach(() => {
    cy.visit('/user-listing/edit');
  });

  it('гарчиг болон тайлбар харагдаж байх ёстой', () => {
    cy.contains('Ерөнхий мэдээлэл').should('be.visible');
    cy.contains('Please tell us the name of the guest').should('be.visible');
  });

  it('бүх шошго харагдаж байх ёстой', () => {
    const labels = [
      'Төрөл',
      'Нэр',
      'Үнэ',
      'Талбай',
      'Өрөө',
      'Ариун цэврийн өрөө',
      'Дулаан зогсоол',
      'Дэлгэрэнгүй тайлбар'
    ];

    labels.forEach((label) => {
      cy.contains(label).should('be.visible');
    });
  });

  it('сонголтын элементүүд ажиллаж байх ёстой', () => {
    cy.contains('Төрөл').parent().within(() => {
      cy.get('[role="combobox"]').click();
      cy.contains('Амины орон сууц').click();
    });

    cy.contains('Өрөө').parent().within(() => {
      cy.get('[role="combobox"]').click();
      cy.contains('2 өрөө').click();
    });

    cy.contains('Дулаан зогсоол').parent().within(() => {
      cy.get('[role="combobox"]').click();
      cy.contains('Байгаа').click();
    });
  });

  it('input болон textarea-д бичих боломжтой байх ёстой', () => {
    cy.get('input').eq(0).clear().type('Тест хотхон');
    cy.get('input').eq(1).clear().type('999,999,999');
    cy.get('input').eq(2).clear().type('150');

    cy.get('textarea').clear().type('Энэ бол тестийн тайлбар.');
  });
});
