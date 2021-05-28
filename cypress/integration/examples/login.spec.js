var faker = require('faker')
const locators = require('../../fixtures/locators.json')

let userData = {
    randomName: faker.name.firstName,
    randomLastName: faker.name.lastName,
    randomEmail: faker.internet.email,
    randomPassword: faker.internet.password
}

describe('login', () => {
    it('visit gallery app', () => {
        cy.visit('')

    })
    it('click login button', () => {
        cy.get(locators.navigation.loginButton).eq(0).click()
        cy.get(locators.loginPage.h1Header).should('exist')
        cy.get(locators.loginPage.submitBtn).should('exist')
        cy.get(locators.loginPage.email).should('exist')
        cy.get(locators.loginPage.password).should('exist')
        cy.get(locators.loginPage.h1Header).should('have.text', 'Please login')
    })
    it('negativ-empty fields', () => {
        cy.get(locators.loginPage.submitBtn).click()
    })
    it('without email', () => {
        cy.get(locators.loginPage.password).type(userData.randomPassword())
        cy.get(locators.loginPage.submitBtn).click()
    })
    it('without password', () => {
        cy.get(locators.loginPage.email).clear().type('adrijatik1984@gmail.com')
        cy.get(locators.loginPage.password).clear()
        cy.get(locators.loginPage.submitBtn).click()
    })
    it('wrong email-without @', () => {
        cy.get(locators.loginPage.email).clear().type('adrijatik1984gmail.com')
        cy.get(locators.loginPage.password).clear().type(userData.randomPassword())
        cy.get(locators.loginPage.submitBtn).click()

    })
    it('wrong email-without .', () => {
        cy.get(locators.loginPage.email).clear().type('adrijatik1984@gmailcom')
        cy.get(locators.loginPage.password).clear().type(userData.randomPassword())
        cy.get(locators.loginPage.submitBtn).click()
        cy.get(locators.loginPage.emailError).should('be.visible')
        cy.get(locators.loginPage.emailError).should('have.text', 'Bad Credentials')

    })
    it('wrong password', () => {
            cy.get(locators.loginPage.email).clear().type('adrijatik1984@gmail.com')
            cy.get(locators.loginPage.password).clear().type(userData.randomPassword())
            cy.get(locators.loginPage.password).click()
            cy.get(locators.loginPage.emailError).should('be.visible')
            cy.get(locators.loginPage.emailError).should('have.text', 'Bad Credentials')
        })
        // it('valid credential', () => {
        //     cy.get('input[id="email"]').clear().type('adrijatik1984@gmail.com')
        //     cy.get('input[id="password"]').clear().type('as332101')
        //     cy.get('button[type="submit"]').click()
        //})
    it('login with valid credentials', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', (req) => {}).as('validlogin')
        cy.get(locators.loginPage.email).clear().type('adrijatik1984@gmail.com')
        cy.get(locators.loginPage.password).clear().type('as332101')
        cy.get(locators.loginPage.submitBtn).click()


        cy.wait('@validlogin').then((intersept) => {
            //         cy.log(JSON.stringify(intersept.response.starusCode))
            expect(intersept.response.statusCode).to.eql(200)
        })

    })
})