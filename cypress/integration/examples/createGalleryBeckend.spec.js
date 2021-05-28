const locators = require('../../fixtures/locators.json')
const faker = require('faker')
var helper = require('../../support/helper')

import { authLogin } from '../../pageObject/loginObject'
import { authCreate } from '../../pageObject/createGalleryObject'
import { navigation } from '../../pageObject/navigation'


describe('create gallery', () => {
    beforeEach(() => {
        cy.visit('/')
        navigation.clickLogin()
        authLogin.login('adrijatik1984@gmail.com', 'as332101')
        navigation.clickCreateGallery()

    })

    it('successfully create gallery', () => { //pageobject/createGO

        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries', (req) => {}).as('validCreate')

        authCreate.create('intercept', 'vezba', 'https://ddl.rs/wp-content/uploads/2018/07/bolji-zivot18.jpg')
            //cy.wait(2000)
        cy.wait('@validCreate').then((intercept) => {
            cy.log(JSON.stringify(intercept.response.statusCode))
            expect(intercept.response.statusCode).to.eql(201)
        })
    })

})