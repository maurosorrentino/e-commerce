import React, { Component } from 'react';
import Form from './styles/Form';

class Signup extends Component {
    
    // handling the inputs of the user
    handleChange = e => {
        
        this.setState({ [e.target.name]: e.target.value })

    }

    // loading is for animation while the user is waiting for the account to be created
    state = {

        email: '',
        name: '',
        password: '',
        loading: false,

    }

    signupHandler = e => {

        e.preventDefault();

        this.setState({ loading: true })

        fetch(`http://localhost:8080/auth/signup`, {

            method: 'PUT',
    
            headers: {
    
                'Content-Type': 'application/json',
    
            },

            body: JSON.stringify({

                name: this.state.name,
                password: this.state.password,
                email: this.state.email,
                    
            })
    
        })

        .then(res => {

            return res.json();

        })

        // handling errors
        .then(resData => {

            if(resData.errors && resData.errors[0].status === 422) {

                throw new Error('validation failed');

            }

            if(resData.errors) {

                throw new Error('creating user failed')

            }

            this.setState({ loading: false });

        })

    }

    render() {

        return (
        
            <Form method="POST" onSubmit={this.signupHandler}>
                
                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>
                    
                    {/* this line will show signing up while waiting */}
                    <h1>Sign{this.state.loading ? 'ing' : ''} Up For An Account</h1>

                        <label htmlFor="email">

                            Email
                                
                            <input
                                
                                type="email"
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                
                            />
                            
                        </label>

                        <label htmlFor="name">

                            Name

                            <input

                                type="text"
                                name="name"
                                placeholder="name"
                                value={this.state.name}
                                onChange={this.handleChange}

                            />

                        </label>

                        <label htmlFor="password">

                            Password

                            <input

                                type="password"
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleChange}

                            />

                        </label>

                        {/* this line will show signing up while waiting */}
                        <button>Sign{this.state.loading ? 'ing' : ''} up!</button>

                    </fieldset>

                </Form>

        )

    }

};

export default Signup;