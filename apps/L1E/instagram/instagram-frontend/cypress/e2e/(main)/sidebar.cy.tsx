describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render all sidebar links", () => {
    cy.contains("Home").should("be.visible");
    cy.contains("Explore").should("be.visible");
    cy.contains("Notifications").should("be.visible");
    cy.contains("Create").should("be.visible");
    cy.contains("Profile").should("be.visible");
  });

  it("should navigate to Explore page", () => {
    cy.contains("Explore").click();
    cy.url().should("include", "/explore");
  });

  it("should navigate to Notifications page", () => {
    cy.contains("Notifications").click();
    cy.url().should("include", "/notifications");
  });
it("should open create post modal when clicking Create -> Post", () => {
  cy.get('[data-cy=create]').click();
  cy.contains("Post").should("be.visible");
  cy.get('[data-cy=create-post]').click();
  cy.contains("Create New Post").should("be.visible");
});

  it("should navigate to Profile page", () => {
    cy.contains("Profile").click();
    cy.url().should("include", "/profile");
  });
});
