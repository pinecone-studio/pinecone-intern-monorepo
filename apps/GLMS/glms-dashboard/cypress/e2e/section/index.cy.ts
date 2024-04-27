describe('section page', () => {
  beforeEach(() => { cy.visit('/section')  })

  it('1.should render Addsection feature', () => {
     cy.get('[data-testid="add-section-component"]').should('exist').should('be.visible')
    });

    it('2.When teacher click plus button without fill inputs , it should display error messages', () => {
      cy.get('[data-cy="add-section-handle-btn"]').should('exist').click()
      cy.get('[data-cy="add-section-handle-btn"]').should('be.disabled')
      cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Хичээлийн гарчиг оруулна уу...');
      cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Дэлгэрэнгүй мэдээлэл оруулна уу...');
    })

    it('3. When teaches types on the title input, an error message should disappear', () => {
      cy.get('[data-cy="add-section-handle-btn"]').should('exist').click()
      cy.get('[data-cy="add-section-handle-btn"]').should('be.disabled')
      cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Хичээлийн гарчиг оруулна уу...');
      cy.get('input[name="title"]').type('html');
      cy.contains('Хичээлийн гарчиг оруулна уу...').should('not.exist');
    });

    it('4. When teaches types on the description input, an error message should disappear', () => {
      cy.get('[data-cy="add-section-handle-btn"]').should('exist').click()
      cy.get('[data-cy="add-section-handle-btn"]').should('be.disabled')
      cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Дэлгэрэнгүй мэдээлэл оруулна уу...');
      cy.get('input[name="description"]').type('html introduction');
      cy.contains('Дэлгэрэнгүй мэдээлэл оруулна уу...').should('not.exist');
    });

    it('5. When teacher fills title and description forms and click submit button , section create successfully' , () => {
      cy.get('[data-cy="add-section-handle-btn"]').should('exist').click()
      cy.get('[data-cy="add-section-handle-btn"]').should('be.disabled')
      cy.get('input[name="title"]').type('html');
      cy.get('input[name="description"]').type('html introduction');
      cy.get('[data-cy="add-section-handle-btn"]').should('not.be.disabled');
      cy.get('[data-cy="add-section-handle-btn"]').click();
      cy.get('[data-testid="success"]').should('be.visible');
      cy.contains('Хичээл амжилттай үүсгэгдлээ!').should('be.visible');
    })

});


