import React from 'react';
import GeneralInfo from './GeneralInfo';

describe('<GeneralInfo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GeneralInfo />);
  });
});
