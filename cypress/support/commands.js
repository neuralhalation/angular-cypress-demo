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

const f = require('./functions');

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/users/login',
        body: {
            user: {
                email: `${f.getUserCreds(Cypress.env('users'), 'stateful').username}`,
                password: `${f.getUserCreds(Cypress.env('users'), 'stateful').password}`
            }
        }
    })
    .then((resp) => {
        window.localStorage.setItem('jwt', resp.body.user.token)
    })
})

Cypress.Commands.add('logoutPrototype', () => {
    cy.request({
        method: 'PUT',
        url: `${Cypress.env('baseUrl')}/api/user`,
        body: {
            user: {
                token: '' // force the token to expire
            }
        }
    })
    .then((resp) => {
        window.localStorage.setItem('jwt', '');
        indexedDB.deleteDatabase('localforage');
    })
})


Cypress.Commands.add('seleniumStyleLogin', () => {
    cy.visit('/#!/login')
    const email = f.getUserCreds(Cypress.env('users'), 'stateful').username
    const password = f.getUserCreds(Cypress.env('users'), 'stateful').password
    cy.get('[type=email]').type(`${email}`)
    cy.get('[type=password]').type(`${password}{enter}`)
    cy.hash().should('eq', '#/')
})