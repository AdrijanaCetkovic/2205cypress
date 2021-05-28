const locators = require('../../fixtures/locators.json')
const faker = require('faker')

import { authLogin } from '../../pageObject/loginObject'
import { authCreate } from '../../pageObject/createGalleryObject'
import { navigation } from '../../pageObject/navigation'




describe('delete gallery', () => {
    before(() => {
        cy.visit('/')
        navigation.clickLogin()
        authLogin.login('adrijatik1984@gmail.com', 'as332101') //pageobject/authlogin
        navigation.clickCreateGallery() //pageobject/navigation
        cy.url().should('include', '/create')
    })

    it('create gallery', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries', (req) => {}).as('validCreate')

        authCreate.create('giga moravac', 'bolji zivot', 'https://ddl.rs/wp-content/uploads/2019/01/giga-moravac-marko-nikolic-yt-2.jpg')

        cy.wait('@validCreate').then((intercept) => {
            cy.log(JSON.stringify(intercept.response.statusCode))
            expect(intercept.response.statusCode).to.eql(201)
            window.localStorage.setItem('galleryId', (JSON.stringify(intercept.response.body.id)))
            var galleryId = window.localStorage.getItem('galleryId');
            cy.log(galleryId).wait(2000)



            cy.intercept('DELETE', `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`, (req) => {}).as('validDelete')

            navigation.clickSelectCreatedGallery()
            navigation.clickDeleteGallery()

            // cy.wait('@validDelete').then((intercept) => {
            //     cy.log(JSON.stringify(intercept.response.statusCode))
            //     expect(JSON.stringify(intercept.response.statusCode).eql('200'))
            //     cy.log(JSON.stringify(intercept.response.method))
            // expect(intercept.response.method).to.eql('DELETE')

            cy.on('window:confirm', () => true);


        })

    })

})

it('delete created gallery', () => {
    cy.intercept('DELETE', `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`, (req) => {}).as('validDelete')

    navigation.clickSelectCreatedGallery()
    navigation.clickDeleteGallery()
        // cy.wait('@validDelete').then((intercept) => {
        //     cy.log(JSON.stringify(intercept.response.statusCode))
        //     cy.log(JSON.stringify(intercept.response.method))
        //     expect(intercept.response.statusCode).to.eql('DELETE')

    // })

    cy.on('window:confirm', () => true);

})

// })