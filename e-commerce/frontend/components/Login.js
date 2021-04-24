import React, { Component } from 'react';
import Link from 'next/link';

import Form from './styles/Form';
import MessageStyles from './styles/MessageStyles';
import Logo from './styles/Logo';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {

            email: '',
            password: '',
            message: null,
            loading: false,
            
        }

        this.fetchData = this.fetchData.bind(this);

    }

    handleInputs = e => {

        this.setState({ [e.target.name]: e.target.value });

    }

    loginHandler = e => {

        e.preventDefault();

        this.setState({ loading: true });
        this.fetchData();

    }

    fetchData = () => {

        fetch(`http://localhost:8090/auth/login`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: "include",

            body: JSON.stringify({

                email: this.state.email,
                password: this.state.password,

            }),

        })

        .then(res => { 

            return res.json();

        })

        .then(resData => { 

            this.setState({ message: resData.message, loading: false });

            // we only want to show the user one of these 3 messages
            if(resData.message !== 'invalid password, please try again' && resData.message !== `There is no account into our database with this email: ${this.state.email}` 
            && resData.message !== 'Successful Login, You Are Being Redirected To Our Shop') {

                this.setState({ message: null });

            };

            if(this.state.email === '') {

                this.setState({ message: null });

            };

            // redirecting to the shop page at successful login
            if(resData.message === 'Successful Login, You Are Being Redirected To Our Shop') {

                setTimeout(() => {

                    window.location.replace('/shop');
                    
                }, 3000);

            }

        })

        .catch(err => {

            this.setState({ loading: false });
            console.log(err);

        })

    }

    componentDidMount() {
        
        this.fetchData();

    }

    render() {

        return (
<>
            <Logo>

                <Link href="/">My Shop</Link>

            </Logo>

            { this.state.message && (<MessageStyles><h1 id="message-test">{this.state.message}</h1></MessageStyles> ) }

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
                            className={this.state.message === `There is no account into our database with this email: ${this.state.email}` ? 'invalid' : '' }

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
                            className={this.state.message === 'invalid password, please try again' ? 'invalid': '' }

                        />

                    </label>

                    <button id="button-test">Log{this.state.loading ? 'ging' : ''} in!</button>

                    <Link href="/reset-password"><button>Reset Password</button></Link>

                </fieldset>

            </Form>
</>
        )

    }

}

export default Login;