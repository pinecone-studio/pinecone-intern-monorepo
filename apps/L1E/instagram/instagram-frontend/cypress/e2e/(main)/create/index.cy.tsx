describe("Create Post Flow", () => {
  beforeEach(() => {
    cy.visit("/create");
  });

  it("should open create post modal when clicking Create -> Post", () => {
    cy.contains("Create").click();
    cy.contains("Post").click();
    cy.contains("Create New Post").should("be.visible");
  });

  it("should upload image and go to preview", () => {
    cy.contains("Create").click();
    cy.contains("Post").click();

    cy.get('input[data-cy="image-upload"]').first()
      .selectFile("cypress/fixtures/image.webp", { force: true });

    cy.contains("Preview", { timeout: 10000 }).should("be.visible");
  });

  it.only("should go to add caption step, type caption, and share", () => {
    cy.contains("Create").click();
    cy.contains("Post").click();

    cy.get('input[data-cy="image-upload"]').first()
      .selectFile("cypress/fixtures/image.webp", { force: true });

    cy.contains("Preview", { timeout: 10000 }).should("be.visible");

    cy.contains("Next").click({ force: true });
    // cy.get('div.fixed.inset-0.bg-black.bg-opacity-50').invoke('hide');

cy.get('textarea[data-cy="caption-input"]').type("My caption", { force: true });


    cy.contains("Share").click({ force: true });

    cy.on("window:alert", (txt) => {
      expect(txt).to.include("Post created!");
    });
  });
});
