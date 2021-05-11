import React, { Component } from 'react';

import Header from '../components/Header';
import MessageStyles from '../components/styles/MessageStyles';

class Success extends Component {

    constructor(props) {
        super(props)

        this.state = {

            name: '',

        }

        this.fetchData = this.fetchData.bind(this);

    }

    fetchData = () => {

        fetch(`${window.location.host}:8090/auth/success`, {

            method: 'POST',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ name: resData.userName });

        })

        .catch(err => console.log(err));

    }

    componentDidMount() {

        this.fetchData();

    }

    render() {

        return (
<>
            <Header />

            <MessageStyles>

                <h1>Thank You {this.state.name.toUpperCase()} For Your Order! <br></br><br></br> If You Have Any Question Please Send Us An Email On: <br></br><br></br>
                <strong>myshop@customerservice.com</strong></h1>

            </MessageStyles>

</>
        )

    }

}

export default Success;