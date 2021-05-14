import React, { Component } from 'react';

import Form from './styles/Form';
import MessageStyles from './styles/MessageStyles';
import Header from '../components/Header';

class VerifyAccount extends Component {

    state = {

        loading: false,
        message: null,
        password: '',

    }

    handleChange = e => {

        this.setState({ password: e.target.value });

    }

    fetchData = e => {

        e.preventDefault();

        this.setState({ laoding: true });

        const userId = this.props.userId;
        const tokenVerifyEmail = this.props.tokenVerifyEmail;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/verify-account/${encodeURIComponent(tokenVerifyEmail)}/${userId}`, {

            method: 'PATCH',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: 'include',

            body: JSON.stringify({

                password: this.state.password,

            })

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ message: resData.message, loading: false });

        })

        .then(() => {

            if(this.state.message === 'Sorry, Something Went wrong. Please Signup Again' || this.state.message === 'Sorry, The Account Was Deleted') {

                setTimeout(() => {

                    window.location.replace('/auth/signup');
                    
                }, 2000);

            }

            if(this.state.message === 'Thank You For Verifying Your Account, You Are Being Redirected To The Login Page') {

                setTimeout(() => {

                    window.location.replace('/auth/login');

                }, 2000)

            }

        })

        .catch(err => console.log(err));

    }

    render() {

        return (
<>
            <Header />

            { this.state.message && (<MessageStyles><h1 className={

                this.state.message === 'Sorry, Something Went wrong. Please Signup Again' 
                || this.state.message === 'Passwords Do Not Match' || this.state.message === 'Sorry, The Account Was Deleted' ? 'red' : ''

            }>{this.state.message}</h1></MessageStyles>)}

            <Form onSubmit={this.fetchData}>

                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                    <h1>Verify{this.state.loading ? 'ing' : ''} Your Account</h1>

                    <label htmlFor="password">

                        Password

                        <input

                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            className={this.state.message === 'Passwords Do Not Match' ? 'invalid' : ''}
                            placeholder="please enter your password"

                        />

                    </label>

                    <button>Verify{this.state.loading ? 'ing' : ''} Your Account</button>

                </fieldset>

            </Form>
</>
        )

    }

}

export default VerifyAccount;