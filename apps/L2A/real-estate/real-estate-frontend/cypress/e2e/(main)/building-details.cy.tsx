describe('Building Details Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetPostById') {
        req.reply({
          data: {
            getPostById: {
              _id: '0001',
              title: 'Тест байр',
              propertyOwnerId: 'owner-123',
              number: '99119922',
              status: 'APPROVED',
              yearBuilt: '2012',
              windowsCount: 6,
              windowType: 'Төмөр вакум',
              doorType: 'Төмөр вакум',
              floorNumber: 4,
              totalFloors: 5,
              floorMaterial: 'Ламинат',
              balcony: '2 тагттай',
              lift: 'Байгаа',
            },
          },
        });
      }
    });

    cy.visit('/admin/details/0001');
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
