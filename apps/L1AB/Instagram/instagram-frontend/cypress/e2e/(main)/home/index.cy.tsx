describe(" Create post", ()=>{
    beforeEach(()=>{
        cy.visit("/home")
    })
    it("Should create post", ()=>{
        cy.get("[data-cy='sidebar-btn-create-post']").click()
        cy.get("[data-cy='btn-create-post']").should("be.visible")
        cy.get("[data-cy='btn-create-post']").click()
        cy.get("[data-cy='modal-create-post']").should("be.visible")
    })
})

