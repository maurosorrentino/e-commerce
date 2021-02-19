import React, { Component } from 'react';
import Link from 'next/link';

import Form from './styles/Form';
import MessageStyles from './styles/MessageStyles';
import Logo from '../components/styles/Logo';

class Login extends Component {

    state = {

        email: '',
        password: '',
        message: null,
        loading: false,
        token: null,

    }

    handleInputs = e => {

        this.setState({ [e.target.name]: e.target.value });

    }

    loginHandler = e => {

        e.preventDefault();

        this.setState({ loading: true });

        fetch(`http://localhost:8090/auth/login`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.state.token,

            },

            body: JSON.stringify({

                email: this.state.email,
                password: this.state.password,

            })

        })

        .then(res => { 

            return res.json();

        })

        .then(resData => {

            this.setState({ message: resData.message, token: resData.token });

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

                    <h1 id="h1-test">Log{this.state.loading ? 'ing' : ''} In</h1>

                    <label htmlFor="email">

                        Email

                        <input

                            id="email-test"
                            name="email"
                            type="email"
                            placeholder="email"
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
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleInputs}

                        />

                    </label>

                    <button id="button-test">Log{this.state.loading ? 'ing' : ''} in!</button>

                </fieldset>

            </Form>
</>
        )

    }

}

export default Login;