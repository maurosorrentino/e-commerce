import React, { Component } from 'react';

class Logout extends Component {

    logout = () => {

        fetch(`${window.location.host}:8090/auth/logout`, {

            method: 'DELETE',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: 'include',

        })

        .then(() => {

            // redirecting to login page once logged out
            return window.location.replace('/auth/login');

        })

        .catch(err => console.log(err))

    }

    render() {

        return (

            <button id="logout-test" onClick={this.logout}>Logout</button>

        )

    }

}

export default Logout;