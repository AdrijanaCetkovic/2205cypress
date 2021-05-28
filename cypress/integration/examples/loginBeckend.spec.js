 const locators = require('../../fixtures/locators.json')

 describe('create gallery tests', () => {
     before(() => {
         cy.logInThroughBackend()
             // cy.request('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', {  // commandsjs
             //     email: "adrijatik1984@gmail.com",
             //     password: "as332101"
             // }).its('body').then((response) => {
             //     window.localStorage.setItem('token', response.access_token)
             //     cy.log(response.access_token)
             // })

     })

     it('visit gallery', () => {
         cy.visit('')
     })
 })