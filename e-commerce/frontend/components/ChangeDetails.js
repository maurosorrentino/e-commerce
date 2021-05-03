import React, { Component } from 'react';
import Link from 'next/link';

import Form from '../components/styles/Form';
import Logo from '../components/styles/Logo';
import MessageStyles from '../components/styles/MessageStyles';

class ChangeDetails extends Component {

    state = {

        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        oldPassword: '',
        loading: false,
        message: null,

    }

    handleInputs = e => {

        this.setState({ [e.target.name]: e.target.value });

    }

    fetchData = e => {

        e.preventDefault();

        this.setState({ loading: true });

        fetch(`http://localhost:8090/auth/change-details`, {

            method: 'PATCH',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

            body: JSON.stringify({

                email: this.state.email,
                name: this.state.name,
                newPassword: this.state.newPassword,
                confirmPassword: this.state.confirmPassword,
                oldPassword: this.state.oldPassword,

            })

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ loading: false, message: resData.message })

        })

        .catch(err => console.log(err))

    }

    render() {

        return (
<>

            <Logo>

                <Link href="/">my shop</Link>

            </Logo>

            {this.state.message && (<MessageStyles><h1>{this.state.message}</h1></MessageStyles>)}

            <Form onSubmit={this.fetchData}>

                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                    <label htmlFor="name">

                        Name

                        <input

                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleInputs}
                            placeholder="enter your new name"

                        />

                    </label>

                    <label htmlFor="email">

                        Email

                        <input

                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleInputs}
                            placeholder="enter your new email"
                            className={this.state.message === 'Invalid email' ? 'invalid' : ''}

                        />

                    </label>

                    <label htmlFor="password">

                        New Password

                        <input

                            name="newPassword"
                            type="password"
                            value={this.state.newPassword}
                            onChange={this.handleInputs}
                            placeholder="enter your new password"
                            className={this.state.message === 'password needs to be at least 5 characters' ? 'invalid' : ''}

                        />

                    </label>

                    <label htmlFor="password">

                        Confirm New Password

                        <input

                            name="confirmPassword"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleInputs}
                            placeholder="confirm your new password"
                            className={this.state.message === 'passwords do not match!' ? 'invalid' : ''}

                        />

                    </label>

                    <label htmlFor="old password">

                        Confirm Old Password

                        <input

                            name="oldPassword"
                            type="password"
                            value={this.state.oldPassword}
                            onChange={this.handleInputs}
                            placeholder="confirm your old password"
                            className={this.state.message === 'password is wrong, please confirm your password in order to change your details' ? 'invalid' : ''}

                        />

                    </label>

                    <button>Chang{this.state.loading ? 'ing': 'e'} Details!</button>

                    <Link href="/reset-password"><button>Forgot Password?</button></Link>

                </fieldset>

            </Form>
</>
        )

    }

}

export default ChangeDetails;