class Navigation {
    get register() {
        return cy.get('a[href="/register"]')
    }

    get registerTerms() {
        return cy.get('input["class=form-check-input"]')
    }

    get login() {
        return cy.get('a[href="/login"]')
    }

    get enterCreateGallery() {
        return cy.get("a[href='/create']")
    }

    get addImage() {
        return cy.get('form div:nth-of-type(3) > [type]')
    }

    get latestGalleryCreated() {
        return cy.get(':nth-child(1) > h2 > .box-title')
    }

    get deleteGalleryBtn() {
        return cy.get(':nth-child(5) > button.btn')
    }

    clickRegister() {
        this.register.click()
    }

    clickTerms() {
        this.registerTerms.click()
    }

    clickLogin() {
        this.login.click()
    }

    clickCreateGallery() {
        this.enterCreateGallery.click()
    }

    clickAddImage() {
        this.addImage.click()
    }

    clickSelectCreatedGallery() {
        this.latestGalleryCreated.click()
    }

    clickDeleteGallery() {
        this.deleteGalleryBtn.click()
    }
}

export const navigation = new Navigation