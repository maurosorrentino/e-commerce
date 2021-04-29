import React, { Component } from 'react';

import MessageStyles from '../components/styles/MessageStyles';

class ItemAvailableAgain extends Component {

    state = {

        email: null,
        message: null,

    }

    fetchData = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/email-me-item/${itemId}`, {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: 'include',

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ email: resData.email, message: resData.message });

        })

        .catch(err => console.log(err));

    }

    render() {

        return (
<>
            {this.state.message && (

                <MessageStyles><h1>{this.state.message}</h1></MessageStyles>

            )}

            <button onClick={this.fetchData}>Email Me When It Will Be Available Again!</button>
</>
        )

    }

}

export default ItemAvailableAgain;