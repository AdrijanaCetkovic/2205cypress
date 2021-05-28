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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('logInThroughBackend', () => {
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/login',
        body: {
            email: Cypress.env('userName'),
            password: Cypress.env('password')
        }
    }).its('body').then((response) => {
        window.localStorage.setItem('token', response.access_token)
        cy.log(response.access_token)
    })
})

Cypress.Commands.add('registerThroughBackend', () => {
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/register',
        body: {
            email: Cypress.env('email'),
            first_name: Cypress.env('firstName'),
            last_name: Cypress.env('lastName'),
            password: Cypress.env('passwordReg'),
            password_confirmation: Cypress.env('passwordReg'),
            terms_and_conditions: true
        }
    }).its('body').then((response) => {
        window.localStorage.setItem('token', response.access_token)
        cy.log(response.body)
    })
})