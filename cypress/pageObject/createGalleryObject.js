class AuthCreate {

    get createGallery() {
        return cy.get('a[href="/create"]')
    }

    get title() {
        return cy.get('input[id="title"]')
    }

    get descriptions() {
        return cy.get('input[id="description"]')
    }

    get imageUrl() {
        return cy.get('.input-group > .form-control')
    }

    get imageUrl1() {
        return cy.get('div:nth-of-type(1) > .input-group.mb-3 > .form-control')
    }
    get imageUrl2() {
        return cy.get('div:nth-of-type(2) > .input-group.mb-3 > .form-control')
    }

    get submitButton() {
        return cy.get('form > button:nth-of-type(1)')
    }

    create(title, descriptions, imageUrl) {
        title = title || undefined
        descriptions = descriptions || undefined
        imageUrl = imageUrl || undefined

        if (title != undefined) {
            this.title.type(title)
        }

        if (descriptions != undefined) {
            this.descriptions.type(descriptions)
        }

        if (imageUrl != undefined) {
            this.imageUrl.type(imageUrl)
        }

        this.submitButton.click()
    }

    create2(title, descriptions, imageUrl) {

        this.title.type(title)
        this.descriptions.type(descriptions)
        this.imageUrl1.type(imageUrl)
        this.submitButton.click()
    }

    create3(title, descriptions, imageUrl) {

        this.title.type(title)
        this.descriptions.type(descriptions)
        this.imageUrl2.type(imageUrl)
        this.submitButton.click()
    }
}

export const authCreate = new AuthCreate()