describe("MainCard Order Component", () => {
  beforeEach(() => {
    cy.visit("/admin/order");
  });

  it("renders order details and allows status selection and saving", () => {
    cy.get('[data-testid="order-card"]').should("exist");
    cy.get('[data-testid="table-number"]').should("be.visible");
    cy.get('[data-testid="order-number"]').should("be.visible");
    cy.get('[data-testid="order-time"]').should("contain.text", "🕒");
    cy.get('[data-testid="order-total"]').should("contain.text", "Нийлбэр дүн:");
    cy.contains("Хүлээгдэж буй").should("be.visible").click();
    cy.contains("Дууссан").should("be.visible").click();
  });

    it("opens the dialog when clicking the button", () => {
    cy.contains('Дэлгэрэнгүй харах').click();
  });

   it("should display the correct title", () => {
    cy.get('[data-cy="order-title"]').should("contain", "Захиалга");
  });

  it("should click on status select and change status", () => {
  cy.contains("Төлөв").click();
  cy.contains("Дууссан").click();


  })

});
