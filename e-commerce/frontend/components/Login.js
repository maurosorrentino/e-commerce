import React, { Component } from 'react';
import Link from 'next/link';

import Form from './styles/Form';
import MessageStyles from './styles/MessageStyles';
import Logo from './styles/Logo';

class Login extends Component {

    state = {

        email: '',
        password: '',
        message: null,
        loading: false,
        
    }

    handleInputs = e => {

        this.setState({ [e.target.name]: e.target.value });

    }

    loginHandler = async e => {

        e.preventDefault();

        this.setState({ loading: true });

        await fetch(`http://localhost:8090/auth/login`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            credentials: "include",

            body: JSON.stringify({

                email: this.state.email,
                password: this.state.password,

            })

        })

        .then(res => { 

            return res.json();

        })

        .then(resData => { console.log(resData)

            this.setState({ message: resData.message, loading: false });

            // we only want to show the user one of these 3 messages
            if(resData.message !== 'invalid password, please try again' && resData.message !== `There is no account into our database with this email: ${this.state.email}` 
            && resData.message !== 'successful login') {

                this.setState({ message: '' });

            };

        })

        .catch(err => {

            this.setState({ loading: false });
            console.log(err);

        })   

    }

    render() {

        return (
<>
            <Logo>

                <Link href="/">My Shop</Link>

            </Logo>

            <MessageStyles><p id="message-test">{this.state.message}</p></MessageStyles>

            <Form id="login-form-test" onSubmit={this.loginHandler}>

                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                    <h1 id="h1-test">Log{this.state.loading ? 'ging' : ''} In</h1>

                    <label htmlFor="email">

                        Email

                        <input

                            id="email-test"
                            name="email"
                            type="email"
                            placeholder="enter your email"
                            value={this.state.email}
                            onChange={this.handleInputs}

                        />

                    </label>

                    <label htmlFor="password">

                        Password

                        <input

                            id="password-test"
                            name="password"
                            type="password"
                            placeholder="enter your password"
                            value={this.state.password}
                            onChange={this.handleInputs}

                        />

                    </label>

                    <button id="button-test">Log{this.state.loading ? 'ging' : ''} in!</button>

                </fieldset>

            </Form>
</>
        )

    }

}

export default Login;