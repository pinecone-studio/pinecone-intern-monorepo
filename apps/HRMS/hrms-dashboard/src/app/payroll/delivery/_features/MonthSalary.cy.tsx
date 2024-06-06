import React from 'react'
import { MonthSalary } from './MonthSalary'

describe('<MonthSalary />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MonthSalary />)
  })
})