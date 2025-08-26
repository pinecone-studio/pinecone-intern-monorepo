import React from 'react';
import { mount } from 'cypress/react18';
import { SheetMenu } from 'src/components/SheetMenu'; // замаа төслийнхөө дагуу засна уу

describe('SheetMenu component', () => {
  it('renders the menu trigger', () => {
    mount(<SheetMenu />);
    cy.get('button').should('exist');
  });

  it('opens menu when trigger is clicked', () => {
    mount(<SheetMenu />);
    cy.get('button').click();

    cy.contains('Нүүр хуудас').should('be.visible');
    cy.contains('Хэтэвч').should('be.visible');
    cy.contains('Хэрэглэгч').should('be.visible');
    cy.contains('Захиалгын түүх').should('be.visible');
    cy.contains('Бидний тухай').should('be.visible');
  });

  it('checks correct links', () => {
    mount(<SheetMenu />);
    cy.get('button').click();

    cy.contains('Нүүр хуудас').should('have.attr', 'href', '/');

    cy.contains('Бидний тухай').should('have.attr', 'href', '/about-us');
  });
});
