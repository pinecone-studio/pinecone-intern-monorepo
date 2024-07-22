import { ClassType } from '@/generated';

describe('AddClassModal Component (within ClassCardTab)', () => {
  beforeEach(() => {
    cy.visit('/class');
  });

  it('opens when the "Анги" button is clicked', () => {
    cy.get('[data-testid="openModalButton"]').click();
    cy.get('[data-testid="modal-content"]').should('be.visible');
    cy.get('[data-testid="modal-header"]').should('contain', 'Анги нэмэх');
  });

  it('displays all input fields correctly', () => {
    cy.get('[data-testid="openModalButton"]').click();
    const inputFields = [
      { testId: 'name-input', label: 'Ангийн нэр' },
      { testId: 'teacher1-input', label: 'Багш 1-н нэр' },
      { testId: 'teacher2-input', label: 'Багш 2-н нэр' },
      { testId: 'startDate-input', label: 'Эхлэх огноо' },
      { testId: 'endDate-input', label: 'Дуусах огноо' },
    ];

    inputFields.forEach(({ testId, label }) => {
      cy.get(`[data-testid="${testId}-label"]`).should('contain', label);
      cy.get(`[data-testid="${testId}"]`).should('be.visible');
    });
  });

  it('displays radio buttons for class type', () => {
    cy.get('[data-testid="openModalButton"]').click();
    cy.get('[data-testid="class-type-radio-group"]').should('be.visible');
    cy.get('[data-testid="coding-radio-container"]').should('be.visible');
    cy.get('[data-testid="design-radio-container"]').should('be.visible');
  });

  it('allows selection of class type', () => {
    cy.get('[data-testid="openModalButton"]').click();
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').click();
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'true');
  });

  it('displays validation errors for empty required fields', () => {
    cy.get('[data-testid="openModalButton"]').click();
    cy.get('[data-testid="submit-button"]').click();
    cy.get('.text-red-500').should('have.length', 5);
  });

  it('submits the form with valid data and closes the modal', () => {
    cy.get('[data-testid="openModalButton"]').click();

    const formData = {
      name: 'Test Class',
      teacher1: 'John Doe',
      teacher2: 'Jane Smith',
      startDate: '2024-08-01',
      endDate: '2024-12-31',
    };

    Object.entries(formData).forEach(([testId, value]) => {
      cy.get(`[data-testid="${testId}-input"]`).type(value);
    });

    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="modal-content"]').should('not.exist');

    cy.get('[data-testid="class-card"]').should('contain', 'Test Class');
  });

  it('disables submit button while loading', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateClass') {
        req.reply({
          delay: 2000,
          data: {
            createClass: {
              id: '2',
              name: 'Test Class',
              classType: ClassType.Coding,
              teachers: ['John Doe', 'Jane Smith'],
              startDate: '2024-08-01',
              endDate: '2024-12-31',
            },
          },
        });
      }
    }).as('createClassMutation');

    cy.get('[data-testid="openModalButton"]').click();

    const formData = {
      name: 'Test Class',
      teacher1: 'John Doe',
      teacher2: 'Jane Smith',
      startDate: '2024-08-01',
      endDate: '2024-12-31',
    };

    Object.entries(formData).forEach(([field, value]) => {
      cy.get(`[data-testid="${field}-input"]`).type(value);
    });

    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="submit-button"]').should('be.disabled');
    cy.wait('@createClassMutation');
    cy.get('[data-testid="submit-button"]').should('not.be.disabled');
  });

  it('closes the modal when clicking outside', () => {
    cy.get('[data-testid="openModalButton"]').click();
    cy.get('body').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');
  });
});
