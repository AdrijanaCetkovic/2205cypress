// const locators = require('../../fixtures/locators.json')


// describe('register gallery backend', () => {
//     before(() => {
//         cy.registerThroughBackend('vikicapopadicka@gmail.com', 'Viki', 'Popadic', 'as332101', 'as332101') // cypress.json i commands.js
//     })
//     it('visit gallery', () => {
//         cy.visit('')
//     })

// })
import { authRegister } from '../../pageObject/registerObject'
import { navigation } from '../../pageObject/navigation'

const locators = require('../../fixtures/locators.json')
const faker = require('faker');

let userData = {
    randomName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password()
}

describe('register spec', () => {
    beforeEach(() => {
        cy.visit('/')
        navigation.clickRegister() //pageObject/navigation
    })

    it('register with valid credentials', () => {
        cy.registerThroughBackend()
            // cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/register', (req) => {}).as('validRegister')
            // authRegister.register(userData.randomName, userData.randomLastName, userData.randomEmail, 'as332101', 'as332101')
            // authRegister.clickTerms()
            // authRegister.clickSubmit()
            // cy.wait('@validRegister').then((intercept) => {
            //     cy.log(JSON.stringify(intercept.response.statusCode))
            //     expect(intercept.response.statusCode).to.eql(200)
            // })

    })


})