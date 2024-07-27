const generateResponse = (state: string) => {
    switch (state) {
      case "loading":
        return {data: null, loading: true, error: null};
      case "error":
        return {data: {}, errors: [{ message: 'Failed to create question'}]};
      case "success":
        return {data: { createQuestion: {id: "1", text: "Sample Question", quizId: "1", options: []} }}
      default:
         return {};
    }
};

const interceptGraphQL = (state: string) => {
    cy.intercept('POST', '**/graphql', (req)=>{
        if(req.body.operationName === "CreateQuestion") {
            const response = generateResponse(state)
            req.reply(response);
        }
    }).as('graphqlRequest')
};

describe('AddQuestionFeature cypress e2e test', () => {
    beforeEach(() => {
        cy.visit('/admin/quiz/475e4247-4ac0-4115-a7f2-18c638ca47b9')
    })

    it('should successfully create a question', () => {
        interceptGraphQL('success');

        cy.get('[data-testid="open-dialog-button"]').click();

        cy.get('[data-testid="question-input"]').type('Sample Question');
        cy.get('[data-testid="option-input-0"]').type('Option 1');
        cy.get('[data-testid="option-input-1"]').type('Option 2');
        cy.get('[data-testid="option-input-2"]').type('Option 3');
        cy.get('[data-testid="option-input-3"]').type("Option 4");
        cy.get('[data-testid="correct-checkbox-0"]').click();

        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@graphqlRequest');

        cy.get('body').click(0, 0, { force: true });

        cy.get('.success-toast').contains('Question create successfully').should('be.visible');
    })

    it('should display error message on failed question creation', () => {
        interceptGraphQL('error');

        cy.get('[data-testid="open-dialog-button"]').click();

        cy.get('[data-testid="question-input"]').type('Sample Question');
        cy.get('[data-testid="option-input-0"]').type('Option 1');
        cy.get('[data-testid="option-input-1"]').type('Option 2');
        cy.get('[data-testid="option-input-2"]').type('Option 3');
        cy.get('[data-testid="option-input-3"]').type('Option 4');
        cy.get('[data-testid="correct-checkbox-0"]').click();

        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@graphqlRequest');

        cy.get('body').click(0, 0, { force: true });

        cy.get('.error-toast').contains('Failed to create question').should('be.visible');
    })

    it('should display error message when question empty', () => {
        cy.get('[data-testid="open-dialog-button"]').click()

        cy.get('[data-testid="option-input-0"]').type('Option 1');
        cy.get('[data-testid="option-input-1"]').type('Option 2')
        cy.get('[data-testid="option-input-2"]').type('Option 3');
        cy.get('[data-testid="option-input-3"]').type('Option 4');
        cy.get('[data-testid="correct-checkbox-0"]').click();

        cy.get('[data-testid="submit-button"]').click()

        cy.get('body').click(0, 0, { force: true });

        cy.get('.error-toast').contains('Question text cannot be empty.').should('be.visible')
    })

    it('should display error message when option empty', () => {
        cy.get('[data-testid="open-dialog-button"]').click()

        cy.get('[data-testid="question-input"]').type('Simple Question')
        cy.get('[data-testid="option-input-0"]').type("Option 1");
        cy.get('[data-testid="option-input-1"]').type("Option 2");
        cy.get('[data-testid="option-input-2"]').type('Option 3');
        cy.get('[data-testid="correct-checkbox-0"]').click();

        cy.get('[data-testid="submit-button"]').click();

        cy.get('body').click(0, 0, {force: true});

        cy.get('.error-toast').contains('All option texts cannot be empty.').should('be.visible');
    })

    it('should display error message if no option is marked as correct', () => {
        cy.get('[data-testid="open-dialog-button"]').click();

        cy.get('[data-testid="question-input"]').type("Simple Question");
        cy.get('[data-testid="option-input-0"]').type('Option 1');
        cy.get('[data-testid="option-input-1"]').type('Option 2');
        cy.get('[data-testid="option-input-2"]').type('Option 3');
        cy.get('[data-testid="option-input-3"]').type('Option 4');

        cy.get('[data-testid="submit-button"]').click();

        cy.get('body').click(0, 0, { force: true });

        cy.get('.error-toast').contains('At least one option must be marked as correct.').should('be.visible')
    })
})