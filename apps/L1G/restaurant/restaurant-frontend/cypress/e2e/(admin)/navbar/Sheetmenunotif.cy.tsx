import React from 'react';
import { mount } from 'cypress/react18';
import { SheetMenuNotif } from 'src/components/SheetMenuNotif'; // өөрийн замаа тааруулна уу

describe('SheetMenuNotif component', () => {
  it('renders bell trigger button', () => {
    mount(<SheetMenuNotif />);
    cy.get('button').should('exist'); // SheetTrigger button
    cy.get('svg').should('exist'); // Bell icon
  });

  it('opens sheet when bell trigger is clicked', () => {
    mount(<SheetMenuNotif />);
    cy.get('button').click();

    // SheetContent дотор байгаа Bell icon харагдаж байгаа эсэхийг шалгана
    cy.get('svg').should('have.length.at.least', 2);
  });
});
