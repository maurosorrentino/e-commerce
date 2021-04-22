import React, { Component } from 'react';
import Link from 'next/link';

import Form from './styles/Form';
import FormErrors from './FormErrors';
import MessageStyles from '../components/styles/MessageStyles';
import Logo from '../components/styles/Logo';

class Signup extends Component {

    constructor(props) {
        
        super(props);

        // loading is for animation while the user is waiting for the account to be created
        // all the other "valid" states and formErrors are there for handling validation on the client side
        this.state = {

            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            loading: false,
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            nameValid: false,
            formValid: false,
            message: null,
            formErrors: { email: '', password: '', name: '', confirmPasswordValid: '' },

        }

        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);

    }

    // handling errors and inputs
    handleInputs = e => {

        const name = e.target.name;
        const value = e.target.value;             // validateField is the next function
        this.setState({ [name]: value }, () => {this.validateField(name, value)});

    }

    // function that will be used in handleError function (here we validate the user input with booleans false and true)
    validateField(fieldName, value) {

        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let nameValid = this.state.nameValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;

        // validating user inputs
        switch(fieldName) {

            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'please enter a valid email';
                break;

            case 'password':
                passwordValid = this.state.password.length >= 5;
                fieldValidationErrors.password = passwordValid ? '' : 'password is too short';
                break;

            case 'name':
                nameValid = this.state.name.length > 0;
                fieldValidationErrors.name = nameValid ? '' : 'please enter your name';
                break;

            case 'confirmPassword':
                confirmPasswordValid = this.state.password === this.state.confirmPassword;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'passwords do not match!';
                break;

        }

        // setting the stases based on validation
        this.setState({ 
            
            formErrors: fieldValidationErrors, 
            emailValid: emailValid,
            passwordValid: passwordValid,
            nameValid: nameValid,
            confirmPasswordValid: confirmPasswordValid,

                // validateForm is the next function
        }, this.validateForm);

    }

    // validating the form (it will be true only if all the inputs are correct)
    validateForm() {

        this.setState({ formValid: this.state.nameValid && this.state.passwordValid && this.state.emailValid && this.state.confirmPasswordValid })

    }

    signupHandler = e => {

        e.preventDefault();
        this.setState({ loading: true });
        this.fetchData();

    }

    // connecting react with node in order to have a connection between the client side and the database
    fetchData = () => {

        fetch(`http://localhost:8090/auth/signup`, {

            method: 'PUT',
    
            headers: {
    
                'Content-Type': 'application/json',
                'Accept': 'application/json',
    
            },

            credentials: "include",

            body: JSON.stringify({

                name: this.state.name,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                email: this.state.email,
                    
            })
    
        })

        .then(res => {

            return res.json();

        })

        // handling any errors that we might get and also messages that tells the user that the account was created
        .then(resData => {

            this.setState({ message: resData.message, loading: false });

        })

        .catch(err => {
            
            this.setState({ loading: false });
            console.log(err);
        
        });

    }

    render() {

        return (

        <>

            <Logo>

                <Link href="/">My Shop</Link>

            </Logo>

            {/* showing error/messages */}
           
            {this.state.message ? <MessageStyles><h1>{this.state.message}</h1></MessageStyles> : <FormErrors formErrors={this.state.formErrors} />}
        
            <Form className="signUp-form-test" onSubmit={this.signupHandler}>
                
                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>
                    
                    {/* this line will show signing up while waiting */}
                    <h1 id="h1-test">Sign{this.state.loading ? 'ing' : ''} Up For An Account</h1>

                        <label htmlFor="email">

                            Email
                                
                            <input
                                
                                className={this.state.emailValid ? '' : 'invalid'}
                                id="email-test"
                                type="email"
                                name="email"
                                placeholder="enter your email"
                                value={this.state.email}
                                onChange={this.handleInputs}
                                
                            />
                            
                        </label>

                        <label htmlFor="name">

                            Name

                            <input

                                className={this.state.nameValid ? '' : 'invalid'}
                                id="name-test"
                                type="text"
                                name="name"
                                placeholder="enter your name"
                                value={this.state.name}
                                onChange={this.handleInputs}

                            />

                        </label>

                        <label htmlFor="password">

                            Password

                            <input

                                className={this.state.passwordValid ? '' : 'invalid'}
                                id="password-test"
                                type="password"
                                name="password"
                                placeholder="enter your password"
                                value={this.state.password}
                                onChange={this.handleInputs}

                            />

                        </label>

                        <label htmlFor="confirm password">

                            Confirm Password

                            <input

                                className={this.state.confirmPasswordValid ? '' : 'invalid'}
                                id="confirmPassword-test"
                                type="password"
                                name="confirmPassword"
                                placeholder="confirm password"
                                value={this.state.confirmPassword}
                                onChange={this.handleInputs}

                            />

                        </label>

                        {/* this line will show signing up while waiting */}
                        <button id="button-test">Sign{this.state.loading ? 'ing' : ''} Up!</button>

                    </fieldset>

                </Form>

        </>
        
        )

    }

};

export default Signup;