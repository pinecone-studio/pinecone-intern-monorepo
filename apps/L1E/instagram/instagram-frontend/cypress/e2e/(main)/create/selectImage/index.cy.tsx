describe("SelectImagePage", () => {
  beforeEach(() => {
    cy.visit("/create");
    cy.contains("Create").click();
    cy.contains("Post").click();
  });

            it("1. should display Create New Post title", () => {
            cy.contains("Create New Post").should("be.visible");
            });

              it("2. should trigger file input when clicking 'Select from computer'", () => {
            cy.get("#global-image-input").should("exist");
            cy.contains("Select from computer").click({ force: true });

          });

          it("3. should upload an image and move to preview step", () => {        
            cy.get('input[data-cy="image-upload"]').first().selectFile("cypress/fixtures/image.webp", { force: true });
            cy.contains("Preview", { timeout: 10000 }).should("be.visible");
          });
});


