describe('/settings', () => {
    beforeEach(() => {
        cy.login() // comes from commands.js
        cy.visit('/#/settings')
    })
    it('greets with your settings', () => {
        cy.contains('h1', "Your Settings")
    })
    
})