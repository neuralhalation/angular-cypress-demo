// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/users/login',
        body: {
            user: {
                email: 'stateful@example.com',
                password: 'password01'
            }
        }
    })
    .then((resp) => {
        window.localStorage.setItem('jwt', resp.body.user.token)
    })
})

Cypress.Commands.add('seleniumStyleLogin', () => {
    cy.visit('/#/login')
    cy.get('[type=email]').type('stateful@example.com')
    cy.get('[type=password]').type('password01{enter}')
    cy.hash().should('eq', '#/')
})