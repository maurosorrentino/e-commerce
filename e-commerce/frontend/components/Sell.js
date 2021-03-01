import React, { Component } from 'react';
import Link from 'next/link';
import cookie from 'react-cookies';

import Form from './styles/Form';
import Logo from '../components/styles/Logo';
import MessageStyles from '../components/styles/MessageStyles';

class Sell extends Component {

    constructor(props) {
        super(props)

        this.state = {

            title: 'aaaaaaaaaa',
            price: 6666,
            description: 'aaaaaaaa',
            image: '',
            loading: false,
            message: null,
    
        } 

        this.fetchData = this.fetchData.bind(this);

    }

    // handling inputs of the user
    handleInputs = e => {

        this.setState({ [e.target.name] : e.target.value });

    }

    handleSumbit = e => {

        e.preventDefault();
        this.setState({ loading: true });
        this.fetchData();

    }

    // connecting react with node in order to have a connection between the client side and the database
    fetchData = async () => {

        await fetch(`http://localhost:8090/auth/sell`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: "include",

            body: JSON.stringify({

                title: this.state.title,
                price: this.state.price,
                description: this.state.description,
                image: this.state.image,

            })

        })

        .then(res => { 

            return res.json();

        })

        .then(resData => { 

            this.setState({ loading: false, message: resData.message });

        })

        .catch(err => {

            this.setState({ loading: false });
            console.log(err);

        })

    }

    async componentDidMount() {

        await this.fetchData();

    }

    render() {

        return (
<>
            <Logo>

                <Link href="/">My Shop</Link>

            </Logo>

            <MessageStyles><p>{this.state.message}</p></MessageStyles>

            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>

                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                    <h1>{this.state.loading ? 'Creating An Item' : 'Create An Item'}</h1>

                    {/* checking if cookies are present */}
                    <input type="hidden" name="cookie" value={cookie.load('XSRF-TOKEN')} />
                    <input type="hidden" name="cookie" value={cookie.load('connect.sid')} />

                    <label htmlFor="title">

                        Title

                        <input

                            name="title"
                            id="title-test"
                            placeholder="enter a title"
                            value={this.state.title}
                            onChange={this.handleInputs}

                        />

                    </label>

                    <label htmlFor="price">

                        Price 

                        <input

                            name="price"
                            type="number"
                            id="price-test"
                            placeholder="enter a price"
                            value={this.state.price}
                            onChange={this.handleInputs}

                        />

                    </label>

                    <label htmlFor="image">

                        Image

                        <input

                            type="file"
                            name="image"
                            id="image-test"
                            placeholder="upload an image"
                            value={this.state.image}
                            onChange={this.handleInputs}

                        />

                    </label>

                    <label htmlFor="description">

                        Description

                        <input

                            name="description"
                            id="description-test"
                            placeholder="enter a description"
                            value={this.state.description}
                            onChange={this.handleInputs}

                        />

                    </label>

                    <button>{this.state.loading ? 'Creating An Item!' : 'Create An Item!'}</button>

                </fieldset>

            </Form>

</>
        )

    }

}

export default Sell;