var helper = require('../../support/helper');
var faker = require('faker') //kada odradimo testove instaliramo faker i njega koristimo za random podatke
const locators = require('../../fixtures/locators.json')
import { authRegister } from '../../pageObject/registerObject'

let userData = {
    randomName: faker.name.firstName,
    randomLastName: faker.name.lastName,
    randomEmail: faker.internet.email,
    randomPassword: faker.internet.password
}


describe('register', () => {
    beforeEach(function() {
            cy.visit('')
            cy.get(locators.navigation.registerButton).click()

        })
        // it('visit gallery app', () => {
        //     cy.visit('')
        // })
        // it('click register button', () => {
        //     cy.get(':nth-child(2) > .nav-link').click()
        // })
    it('negativ-empty fields', () => {
        cy.get(locators.registerPage.submit).click()
    })
    it('negativ-all spaces', () => {
        cy.get(locators.registerPage.firstName).type(' ')
        cy.get(locators.registerPage.lastName).type(' ')
        cy.get(locators.registerPage.email).type(' ')
        cy.get(locators.registerPage.password).type(' ')
        cy.get(locators.registerPage.rePassword).type(' ')
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
    })

    it('maximum caracters of first name', () => { //ovde uvodimo funkciju u helperu koja nam to omogucava (suport)
        cy.get(locators.registerPage.firstName).clear().type(helper.getNCharactersLetters(266))
        cy.get(locators.registerPage.lastName).clear().type(helper.getNCharactersLetters(266))
        cy.get(locators.registerPage.email).clear().type(userData.randomName())
        cy.get(locators.registerPage.password).clear().type(userData.randomName())
        cy.get(locators.registerPage.rePassword).clear().type(userData.randomName())
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
    })
    it('wrong email-without @', () => {
        authRegister.register('mira', 'miric', 'ddffsffsdfdsffsfgmil.com', 'as332101', 'as332101')
        authRegister.clickTerms()
        authRegister.clickSubmit()

    })
    it('wrong email-without .', () => {
        cy.get(locators.registerPage.firstName).clear().type(userData.randomName())
        cy.get(locators.registerPage.lastName).clear().type(userData.randomLastName())
        cy.get(locators.registerPage.email).clear().type('adrijatikkk1984@gmailcom')
        cy.get(locators.registerPage.password).clear().type(userData.randomPassword())
        cy.get(locators.registerPage.rePassword).clear().type(userData.randomPassword())
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
        cy.get(locators.registerPage.emailValidationError).should('be.visible')
        cy.get(locators.registerPage.emailValidationError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.get(locators.registerPage.emailValidationError).should('have.text', 'The email must be a valid email address.')
    })
    it.only('confirmed pass does not metch', () => {
        cy.get(locators.registerPage.firstName).clear().type(userData.randomName())
        cy.get(locators.registerPage.lastName).clear().type(userData.randomLastName())
        cy.get(locators.registerPage.email).clear().type(userData.randomEmail())
        cy.get(locators.registerPage.password).clear().type(userData.randomPassword())
        cy.get(locators.registerPage.rePassword).clear().type('aaaa4444')
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
        cy.get(locators.registerPage.passwordValidationError).should('be.visible')
        cy.get(locators.registerPage.passwordValidationError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.get(locators.registerPage.passwordValidationError).should('have.text', 'The password confirmation does not match.')
    })
    it('pass less than 8 characters', () => {
        cy.get(locators.registerPage.firstName).clear().type(userData.randomName())
        cy.get(locators.registerPage.lastName).clear().type(userData.randomLastName())
        cy.get(locators.registerPage.email).clear().type(userData.randomEmail())
        cy.get(locators.registerPage.password).clear().type('aaa')
        cy.get(locators.registerPage.rePassword).clear().type('aaa')
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
        cy.get(locators.registerPage.passwordValidationError).should('be.visible')
        cy.get(locators.registerPage.passwordValidationError).should('have.text', 'The password must be at least 8 characters.')
        cy.get(locators.registerPage.passwordValidationError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
    })
    it('pass only letters', () => {
        cy.get(locators.registerPage.firstName).clear().type(userData.randomName())
        cy.get(locators.registerPage.lastName).clear().type(userData.randomLastName())
        cy.get(locators.registerPage.email).clear().type(userData.randomEmail())
        cy.get(locators.registerPage.password).clear().type('aaaaaaaa')
        cy.get(locators.registerPage.rePassword).clear().type('aaaaaaaa')
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
    })
    it('pass only numbers', () => {
        cy.get(locators.registerPage.firstName).clear().type(userData.randomName())
        cy.get(locators.registerPage.lastName).clear().type(userData.randomLastName())
        cy.get(locators.registerPage.email).clear().type(userData.randomEmail())
        cy.get(locators.registerPage.password).clear().type('11111111')
        cy.get(locators.registerPage.rePassword).clear().type('11111111')
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
    })
    it('terms error', () => {
        authRegister.register('saasa', 'saaasaas', 'gvdgcvdgcvcvb@gmail.com', 'as332101', 'as332101')
        authRegister.clickSubmit()
        cy.get(locators.registerPage.termsValidationError).should('be.visible')
        cy.get(locators.registerPage.termsValidationError).should('have.text', 'The terms and conditions must be accepted.')
        cy.get(locators.registerPage.termsValidationError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
    })
    it('exist email', () => {
        cy.get(locators.registerPage.firstName).clear().type(userData.randomName())
        cy.get(locators.registerPage.lastName).clear().type(userData.randomLastName())
        cy.get(locators.registerPage.email).clear().type('adrijatik1984@gmail.com')
        cy.get(locators.registerPage.password).clear().type(userData.randomPassword())
        cy.get(locators.registerPage.rePassword).clear().type(userData.randomPassword())
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
        cy.get(locators.registerPage.emailValidationError).should('be.visible')
        cy.get(locators.registerPage.emailValidationError).should('have.text', 'The email has already been taken.')
        cy.get(locators.registerPage.emailValidationError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
    })


    it('smoke test', () => {
        cy.get(locators.registerPage.firstName).clear().type(userData.randomName())
        cy.get(locators.registerPage.lastName).clear().type(userData.randomLastName())
        cy.get(locators.registerPage.email).clear().type(userData.randomEmail())
        cy.get(locators.registerPage.password).clear().type('as332101')
        cy.get(locators.registerPage.rePassword).clear().type('as332101')
        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
    })


})
describe('register gallery backend', () => {
    before(() => {

        cy.registerThroughBackend('aaaa', 'aaaa', 'fhbvhbvjbvjd@gmail.com', 'as332101', 'sas332101') //  cypress.json i commands.js

        cy.get(locators.registerPage.terms).check()
        cy.get(locators.registerPage.submit).click()
    })

    it('visit gallery', () => {
        cy.visit('')
    })
})