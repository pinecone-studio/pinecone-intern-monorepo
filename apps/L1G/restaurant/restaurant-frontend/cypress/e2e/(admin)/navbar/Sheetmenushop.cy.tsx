import React from 'react';
import { mount } from 'cypress/react18';
import { SheetMenuShop } from 'src/components/SheetMenuShop'; // өөрийн замаа зөв тохируул

describe('SheetMenuShop component', () => {
  it('renders shopping cart trigger button', () => {
    mount(<SheetMenuShop />);
    cy.get('button').should('exist'); // Trigger button байгаа эсэх
    cy.get('svg').should('exist'); // ShoppingCart icon байгаа эсэх
  });

  it('opens sheet when trigger is clicked', () => {
    mount(<SheetMenuShop />);
    cy.get('button').click(); // Trigger дарна

    // SheetContent дотор гарч ирсэн ShoppingCart icon шалгана
    cy.get('svg.absolute.top-4').should('exist');
  });
});
