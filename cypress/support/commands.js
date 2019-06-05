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
    const creds = f.getCreds(Cypress.env('users'), 'stateful')
    cy.get('[type=email]').type(`${creds[0]}`)
    cy.get('[type=password]').type(`${creds[1]}{enter}`)
    cy.hash().should('eq', '#!/')
})

/** Command to handle iframes */
Cypress.Commands.add('iframe', { prevSubject: 'element'}, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
});