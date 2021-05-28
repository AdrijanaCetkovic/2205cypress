class AuthRegister {
    get firstName() {
        return cy.get('#first-name')
    }
    get lastName() {
        return cy.get('#last-name')
    }
    get email() {
        return cy.get('#email')
    }
    get password() {
        return cy.get('#password')
    }

    get passwordConfirm() {
        return cy.get('#password-confirmation')
    }

    get terms() {
        return cy.get('input[class="form-check-input"]')
    }

    get submitBtn() {
        return cy.get('button[type="submit"]')
    }


    register(firstName, lastName, email, password, passwordConfirm) {
        firstName = firstName || undefined
        lastName = lastName || undefined
        email = email || undefined
        password = password || undefined
        passwordConfirm = passwordConfirm || undefined

        if (firstName != undefined) {
            this.firstName.type(firstName)
        }

        if (lastName != undefined) {
            this.lastName.type(lastName)
        }

        if (email != undefined) {
            this.email.type(email)
        }

        if (password != undefined) {
            this.password.type(password)
        }

        if (passwordConfirm != undefined) {
            this.passwordConfirm.type(passwordConfirm)
        }


    }

    clickTerms() {
        this.terms.click()
    }

    clickSubmit() {
        this.submitBtn.click()
    }

}

export const authRegister = new AuthRegister()