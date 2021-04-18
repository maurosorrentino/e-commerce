import React, { Component } from 'react';

import Form from '../components/styles/Form';
import MessageStyles from '../components/styles/MessageStyles';

class ResetPasswordPage extends Component {

    state = {

        loading: false,
        message: null,
        password: '',
        confirmPassword: '',
        
    }

    handleChange = e => {

        this.setState({ [e.target.name]: e.target.value });

    }

    fetchData = e => {

        e.preventDefault();

        const resetToken = this.props.resetToken;
        const userId = this.props.userId;

        fetch(`http://localhost:8090/reset-password-form/${encodeURIComponent(resetToken)}/${userId}`, {

            method: 'PATCH',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

            body: JSON.stringify({

                password: this.state.password,
                confirmPassword: this.state.confirmPassword,

            })

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            console.log(resData);
            this.setState({ message: resData.message });

        })

/*         .then(() => {

            setTimeout(() => {

                window.location.replace('/auth/login');
                
            }, 3000);

        }) */

        .catch(err => console.log(err))

    }

    render() {

        return (
<>

            <MessageStyles><p id="message-test">{this.state.message}</p></MessageStyles>

            <Form onSubmit={this.fetchData}>

                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                    <h1>Chang{this.state.loading ? 'ing' : 'e'} Your Password</h1>

                    <label htmlFor="password">

                        <input

                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            className={this.state.password.length < 5 ? 'invalid' : '' }

                        />

                    </label>

                    <label htmlFor="confirm password">

                        <input

                            name="confirmPassword"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.confirmPassword}
                            className={this.state.password !== this.state.confirmPassword ? 'invalid' : '' }

                        />

                    </label>

                    <button>Chang{this.state.loading ? 'ing' : 'e'} Your Password</button>

                </fieldset>

            </Form>

</>
        )

    }

}

export default ResetPasswordPage;