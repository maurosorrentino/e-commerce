import React, { Component } from 'react';

import Form from './styles/Form';
import Header from './Header';
import MessageStyles from './styles/MessageStyles';
import IbanStyle from '../components/styles/IbanStyle';

class Iban extends Component {

    constructor(props) {
        super(props)

        this.state = {

            iban: '',
            currentIban: null,
            loading: false,
            message: null,
    
        }

        this.fetchCurrentIban = this.fetchCurrentIban.bind(this);

    }

    fetchCurrentIban = () => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/current-iban`, {

            method: 'GET',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: 'include',

            body: JSON.stringify({

                iban: this.state.iban,

            })

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ currentIban: resData.iban })

        })

        .catch(err => console.log(err))

    }

    saveNewData = e => {

        e.preventDefault();

        this.setState({ loading: true });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/save-new-iban`, {

            method: 'PUT',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

            body: JSON.stringify({

                iban: this.state.iban,

            }),

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ message: resData.message, loading: false })

        })

        .catch(err => console.log(err))

    }

    componentDidMount() {

        this.fetchCurrentIban();

    }

    handleChange = e => {

        this.setState({ iban: e.target.value })

    }

    render() {

        return(
<>
            <Header />

            <IbanStyle>

                {this.state.currentIban && <h1>your current iban is the following: <span>{this.state.currentIban}</span></h1>}

                <h1>please enter the details of your bank account</h1>

                { this.state.message && (<MessageStyles><h1 className={this.state.message === 'something is wrong with your iban' ? 'red'
                : '' }>{this.state.message}</h1></MessageStyles> ) }

                <Form onSubmit={this.saveNewData}>

                    <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                        <label htmlFor="iban account">

                            insert your IBAN

                            <input

                                name="iban"
                                type="text"
                                placeholder="please enter your iban"
                                onChange={this.handleChange}
                                value={this.state.iban}

                            />

                        </label>

                        <button>Sav{this.state.loading ? 'ing' : 'e'} Iban</button>

                    </fieldset>

                </Form>

            </IbanStyle>
</>
        )

    }

}

export default Iban;