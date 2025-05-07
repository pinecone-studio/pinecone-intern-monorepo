describe('Building Details Component', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.contains('0001').click();
  });

  it('should render all building detail rows correctly', () => {
    const labels = ['Ашиглалтанд орсон он:', 'Цонхны тоо:', 'Цонх:', 'Хаалга:', 'Хэдэн давхарт:', 'Барилгын давхар:', 'Шал:', 'Тагт:', 'Лифт:'];

    const values = ['2012', '6', 'Төмөр вакум', 'Төмөр вакум', '4 давхарт', '5 давхарт', 'Ламинат', '2 тагттай', 'Байгаа'];

    labels.forEach((label) => {
      cy.contains(label).should('exist');
    });

    values.forEach((value) => {
      cy.contains(value).should('exist');
    });
  });
});
