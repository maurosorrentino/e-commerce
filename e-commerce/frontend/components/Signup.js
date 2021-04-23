import React, { Component } from 'react';
import Link from 'next/link';

import Form from './styles/Form';
import MessageStyles from '../components/styles/MessageStyles';
import Logo from '../components/styles/Logo';

class Signup extends Component {

    state = {

        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        loading: false,
        message: null,

    }

    // handling errors and inputs
    handleInputs = e => {

        this.setState({ [e.target.name]: e.target.value });

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
           
            {this.state.message && ( <MessageStyles><h1>{this.state.message}</h1></MessageStyles> ) }
        
            <Form className="signUp-form-test" onSubmit={this.signupHandler}>
                
                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>
                    
                    {/* this line will show signing up while waiting */}
                    <h1 id="h1-test">Sign{this.state.loading ? 'ing' : ''} Up For An Account</h1>

                        <label htmlFor="email">

                            Email
                                
                            <input
                                
                                className={this.state.message === 'Invalid email' ? 'invalid' : ''}
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

                                className={this.state.message === 'please enter your name' ? 'invalid' : ''}
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

                                className={this.state.message === 'password needs to be at least 5 characters' ? 'invalid' : ''}
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

                                className={this.state.message === 'passwords do not match' ? 'invalid' : ''}
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