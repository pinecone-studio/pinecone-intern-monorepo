describe("Create Post Full Flow", () => {
  it("should go through Select Image -> Preview -> Caption -> Share", () => {
    cy.visit("/create");
    cy.contains("Create").click();
    cy.contains("Post").click();

    cy.get('input[data-cy="image-upload"]').first().selectFile("cypress/fixtures/image.webp", { force: true });
    cy.contains("Preview").should("be.visible");

    cy.contains("Next").click({ force: true });
    cy.get('textarea[data-cy="caption-input"]').type("Hello World" ,{force:true});


cy.contains("Share").click({ force: true });

cy.on("window:alert", (txt) => {  
expect(txt).to.include("Post created!");
});
  });
  });

