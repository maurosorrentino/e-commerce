import React, { Component } from 'react';
import Link from 'next/link';

import Form from '../components/styles/Form';
import Logo from '../components/styles/Logo';
import MessageStyles from '../components/styles/MessageStyles';

class RequestResetPassword extends Component {

    state = {

        email: '',
        message: '',
        loading: false,

    }

    handleChange = e => {

        this.setState({ email: e.target.value });

    }

    fetchData = e => {

        e.preventDefault();

        this.setState({ loading: true });

        fetch(`http://localhost:8090/reset-password`, {

            method: 'PATCH',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            body: JSON.stringify({

                email: this.state.email,

            }),

            credentials: 'include',

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ message: resData.message, loading: false });

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

            <MessageStyles><h1 id="message-test">{this.state.message}</h1></MessageStyles>
    
            <Form onSubmit={this.fetchData}>

                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                    <h1>Request{this.state.loading ? 'ing' : ''} A New Password</h1>

                    <label htmlFor="email">

                        <input

                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="enter your email"

                        />

                    </label>

                    <button>Request{this.state.loading ? 'ing' : ''} A New Password</button>

                </fieldset>

            </Form>
</>
        )

    }

}

export default RequestResetPassword;