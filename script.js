class TestForm {
    constructor() {
    // Form
    this.form = document.querySelector('#test-form');    

    // Inputs
    this.emailInput = document.querySelector('#email');
    this.countryInput = document.querySelector('#country');
    this.postalInput = document.querySelector('#postal-code');
    this.passwordInput = document.querySelector('#password');
    this.confirmPasswordInput = document.querySelector('#confirm-pw');
    
    // Errors
    this.emailError = document.querySelector('#form-email-error');
    this.countryError = document.querySelector('#form-country-error');
    this.postalError = document.querySelector('#form-postal-error');
    this.passwordError = document.querySelector('#form-pw-error');
    this.confirmPwError = document.querySelector('#form-confirm-error');
    
    // Input Event Listeners
    this.emailInput.addEventListener("input", (event) => {
    if (this.emailInput.validity.valid) {
    this.emailError.textContent = '';
    this.emailError.classList.remove('active');
    } else {
    this.validateEmail();
    }
    });

    this.emailInput.addEventListener("blur", (event) => {
        if (this.emailInput.validity.valid) {
            this.emailError.textContent = '';
            this.emailError.classList.remove('active');
            } else {
            this.validateEmail();
            }
    });
    
    this.countryInput.addEventListener("change", (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex].dataset.attribute;
    let currentSelection = selectedOption;
    this.postalInput.placeholder = currentSelection;
    if (this.countryInput.validity.valid) {
    this.countryError.textContent = '';
    this.countryError.classList.remove('active');
    } else {
    this.validateCountry();
    }
    });

    this.countryInput.addEventListener("blur", (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex].dataset.attribute;
        let currentSelection = selectedOption;
        this.postalInput.placeholder = currentSelection;
        if (this.countryInput.validity.valid) {
        this.countryError.textContent = '';
        this.countryError.classList.remove('active');
        } else {
        this.validateCountry();
        }
        });
    
    this.postalInput.addEventListener("input", (event) => {
    if (this.postalInput.validity.valid) {
    this.postalError.textContent = '';
    this.postalError.classList.remove('active');
    } else {
    this.validatePostalCode();
    }
    });

    this.postalInput.addEventListener("blur", (event) => {
        if (this.postalInput.validity.valid) {
        this.postalError.textContent = '';
        this.postalError.classList.remove('active');
        } else {
        this.validatePostalCode();
        }
        });

    
    
    this.passwordInput.addEventListener('input', (event) => {
    if (this.passwordInput.validity.valid) {
    this.passwordError.textContent = '';
    this.passwordError.classList.remove('active');
    } else {
    this.validatePassword();
    }
    });

    this.passwordInput.addEventListener('blur', (event) => {
        if (this.passwordInput.validity.valid) {
        this.passwordError.textContent = '';
        this.passwordError.classList.remove('active');
        } else {
        this.validatePassword();
        }
        });
    
    this.confirmPasswordInput.addEventListener('input', (event) => {
    if (this.confirmPasswordInput.value === this.passwordInput.value && this.confirmPasswordInput.value !== '') {
    this.confirmPwError.textContent = '';
    this.confirmPwError.classList.remove('active');
    } else {
    this.validateConfirmPassword();
    }
    });

    this.confirmPasswordInput.addEventListener('blur', (event) => {
        if (this.confirmPasswordInput.value === this.passwordInput.value && this.confirmPasswordInput.value !== '') {
        this.confirmPwError.textContent = '';
        this.confirmPwError.classList.remove('active');
        } else {
        this.validateConfirmPassword();
        }
        });

    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputs = document.querySelectorAll('input, select');
        let isFormValid = false;
        inputs.forEach((input) => {
            const previousSibling = input.previousElementSibling.textContent;
            const nextSibling = input.nextElementSibling;
            if (input.validity.valid) {
                nextSibling.textContent = '';
                nextSibling.classList.remove('acitve');
                isFormValid = true;
            } else if (!input.validity.valid) {
                isFormValid = false;
               if (previousSibling === "Email: *") {
                this.validateEmail();
               } else if (previousSibling === "Country: *") {
                this.validateCountry();
               } else if (previousSibling === "Postal Code: *") {
                this.validatePostalCode();
               } else if (previousSibling === "Password: *") {
                this.validatePassword();
               } else if (previousSibling === "Confirm Password: *") {
                this.validateConfirmPassword();
               } else {
                console.log(`I iterated through all these but I do not know what you mean by ${previousSibling}`);
               }
            }
        });
        if (isFormValid) {
            alert('High Five! 👋 ');
            this.form.reset();
        } else {
            console.log('Form is not valid');
        }
    });    

    }
    
    // Methods
    
    // Confirm PW Validation
    validateConfirmPassword() {
    if (this.confirmPasswordInput.validity.valueMissing)  {
        this.confirmPwError.textContent = 'This field cannot be blank';
    } else if (this.passwordInput.value !== this.confirmPasswordInput.value) {
        this.confirmPwError.textContent = 'Passwords do not match';
    }
    this.confirmPwError.classList.add("active");
    }
    
    // PW Validation
    validatePassword() {
    if (this.passwordInput.validity.valueMissing) {
    this.passwordError.textContent = "You need to enter a password";
    } else if (this.passwordInput.validity.tooShort) {
    this.passwordError.textContent = `Password entered is too short. Minimum length is 9 characters, you entered ${this.passwordInput.value.length} characters`;
    } else if (this.passwordInput.validity.tooLong) {
    this.passwordError.textContent = `Password entered is too long. Max length is 18 characters, you entered ${this.passwordInput.value.length} characters`;
    }
    this.passwordError.classList.add("active");
    }
    
    // Email Validation
    validateEmail() {
    if (this.emailInput.validity.valueMissing) {
    // If empty
    this.emailError.textContent = "You need to enter an email addresss";
    } else if (this.emailInput.validity.typeMismatch) {
    // If it's not an email addres
    this.emailError.textContent = "Entered value needs to be an email addresss";
    } else if (this.emailInput.validity.tooShort) {
    // If the value is too short
    this.emailError.textContent = `Email should be at least ${this.emailInput.minLength} characters; you entereed ${this.emailInput.value.length}`;
    }
    // Add the active class
    this.emailError.classList.add("active");
    }
    
    // Country Validation
    validateCountry() {
    if (this.countryInput.validity.valueMissing) {
    this.countryError.textContent = "Please select a country from the drop down";
    } 
    this.countryError.classList.add("active");
    }
    
    // Postal Validation
    validatePostalCode() {
    const countrySelection = this.countryInput.value;
    const mxusPattern = "^\\d{5}$";
    const caPattern = "[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d";
    const noPattern = "";
    if (countrySelection === "CA") {
    this.postalInput.pattern = caPattern;
    this.postalInput.maxlength = "7";
    console.log('CA Postal code selected');
    } else if (countrySelection === "MX" || countrySelection === "US") {
    this.postalInput.pattern = mxusPattern;
    this.postalInput.maxlength = "5";
    console.log('US MX postal selected');
    } else {
        this.postalInputPattern = noPattern;
        this.postalInput.maxlength = "1";
    }
    if (this.postalInput.validity.valueMissing) {
    this.postalError.textContent = "Postal code field cannot be empty";
    } else if (this.postalInput.validity.patternMismatch) {
    this.postalError.textContent = "Please enter a valid zip code for the country selected";
    }
    this.postalError.classList.add("active");
    }
    
    }
    
    const newForm = new TestForm();
    