describe('/login', () => {
    beforeEach(() => {
        indexedDB.deleteDatabase('localforage');
        cy.visit(`/#!/login`)
    })

    it('greets with Sign in', () => {
        cy.contains('h1', 'Sign in')
    })

    it('links to #/register', () => {
        cy
        .contains('Need an account?')
        .should('have.attr', 'href', '#!/register')
    })

    it('requires email', () => {
        cy.get('form').contains('Sign in').click()
        cy.get('.error-messages').should('contain', 'email or password is invalid')
    })

    it('requires password', () => {
        cy.get('[type=email]').type('joe@example.com{enter}')
        cy.get('.error-messages').should('contain', 'email or password is invalid')
    })
    
    it('requires valid username and password', () => {
        cy.get('[type=email]').type('lyon.lenk@gmail.com')
        cy.get('[type=password]').type('invalid{enter}')
        cy.get('.error-messages').should('contain', 'email or password is invalid')
    })

    it('navigates to #/ on successful login', () => {
        cy.get('[type=email]').type('lyon.lenk@gmail.com')
        cy.get('[type=password]').type('m0rph0g3n3{enter}')
        cy.hash().should('eq', '#!/')
    })
})