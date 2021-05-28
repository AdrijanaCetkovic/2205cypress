const locators = require('../../fixtures/locators.json')


import { authLogin } from '../../pageObject/loginObject'

describe('login spec', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get(locators.navigation.loginButton).click()
    })

    it('login with valid credentials', () => {
        authLogin.login('adrijatik1984@gmail.com', 'as332101')
    })

    it('assertions', () => {
        cy.url().should('include', '/login') //asertacija
    })
})