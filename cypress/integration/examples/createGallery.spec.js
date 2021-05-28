const locators = require('../../fixtures/locators.json')
var helper = require('../../support/helper');

import { authLogin } from '../../pageObject/loginObject'
import { authCreate } from '../../pageObject/createGalleryObject'
import { navigation } from '../../pageObject/navigation'

describe('login spec', () => {
    it('login with valid credentials', () => {
        cy.visit('/')
        cy.get(locators.navigation.loginButton).click()
        authLogin.login('adrijatik1984@gmail.com', 'as332101')
    })
})



describe('create gallery', () => {
    it('succesfully create new gallery', () => {
        navigation.clickCreateGallery()
        authCreate.create('bolji zivot', 'Violeta Popadic', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
    })



})
describe('negative tc - create gallery', () => {
    beforeEach(() => {
        cy.visit('/')
        navigation.clickLogin()
        authLogin.login('adrijatik1984@gmail.com', 'as332101')
        navigation.clickCreateGallery()
    })
    it('check buttons on gallery-up site', () => {
        cy.get(locators.navigation.galleryAppNavButton).should('exist')
        cy.get(locators.navigation.allGalleriesNavButton).should('exist')
        cy.get(locators.navigation.createGallery).should('exist')
        cy.get(locators.createGalleryPage.h1Header).should('have.css', 'color', 'rgb(72, 73, 75)')
        cy.get(locators.createGalleryPage.h1Header).should('have.text', 'Create Gallery')
    })

    it('without  title', () => {
        authCreate.create('', 'viki', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
    })

    it('without description', () => {
        authCreate.create('bolji zivot', '', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
    })

    it('without image', () => {
        authCreate.create('bolji zivot', 'viki', '')
    })

    it('title - 1 character-space ', () => {
        authCreate.create(' ', 'viki', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
        cy.get(locators.createGalleryPage.imageUrlError).should('be.visible')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.text', 'The title field is required.')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
    })

    it('title - maximum characters', () => {
        authCreate.create(helper.getNCharactersLetters(266), 'viki', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
        cy.get(locators.createGalleryPage.imageUrlError).should('be.visible')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.text', 'The title may not be greater than 255 characters.')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.wait(2000)
    })

    it('descriptnions - maximum characters', () => {
        authCreate.create('Gallery Title', helper.getNCharactersLetters(1001), 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
        cy.get(locators.createGalleryPage.imageUrlError).should('be.visible')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.text', 'The description may not be greater than 1000 characters.')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.wait(3000)
    })
    it('wrong image format ', () => {
        authCreate.create('bolji zivot', 'viki', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.')
        cy.get(locators.createGalleryPage.imageUrlError).should('be.visible')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.text', 'Wrong format of image')
        cy.get(locators.createGalleryPage.imageUrlError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.wait(3000)
    })

    it('blank first input of image url', () => {
        navigation.clickAddImage()
        authCreate.create2('bolji zivot', 'viki', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')

    })

    it('blank second input of image url', () => {
        navigation.clickAddImage()
        authCreate.create3('bolji zivot', 'viki', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
        cy.wait(2000)
    })


})