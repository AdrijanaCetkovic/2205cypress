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
        navigation.clickCreateGallery()
        authCreate.create('bolji zivot', 'boba popadic', 'https://www.tportal.hr/media/thumbnail/w1000/306247.png')
    })

    // it('create gallery', () => {
    //     it('succesfully create new gallery', () => {
    //             navigation.clickCreateGallery()
    //             authCreate.create('bolji zivot', 'Violeta Popadic', 'https://miro.medium.com/max/3150/1*jY2UVTK3lLkW-COYwA4AUA@2x.jpeg')
    //         })
    it('delete gallery', () => {
        var galleryId = window.localStorage.getItem('galleryId');
        navigation.clickSelectCreatedGallery(galleryId)
        navigation.clickDeleteGallery
        cy.on('window:confirm', () => true)
    })





})