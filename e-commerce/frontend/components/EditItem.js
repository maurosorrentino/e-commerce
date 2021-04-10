import React, { Component } from 'react';
import cookie from 'react-cookies';
import FormData from 'form-data';

import Form from './styles/Form';
import MessageStyles from '../components/styles/MessageStyles';
import RemoveItem from '../components/RemoveItem';

class EditItem extends Component {

    state = {

        title: this.props.title,
        price: this.props.price,
        description: this.props.description,
        image: this.props.img,
        loading: false,
        message: null,

    }

    // handling inputs of the user
    handleInputs = e => {

        this.setState({ [e.target.name] : e.target.value });

    }

    handleImageUpload = async () => {

        // destructuring
        const imageFile = document.getElementById('image-test');
        const files = imageFile.files;

        // debugging purposes
        console.log('Image file: ', files[0]);

        const formData = new FormData();

        // getting the 1st file that we find
        formData.append('file', files[0]);

        // appending cloudinary preset (folder where it will be stored the file)
        formData.append('upload_preset', 'qfhsqrkq');

        return await fetch('https://api.Cloudinary.com/v1_1/dqhw3ma9u/image/upload', {

            method: 'POST',
            body: formData,

        })

            .then(res => res.json())

            .then(res => { 

                // changing the state so that we can assign an url to the image
                this.setState({ image: res.secure_url });

            })

            .catch(err => console.log(err));

    };

    // connecting react with node in order to have a connection between the client side and the database
    handleSubmit = e => {

        e.preventDefault();

        const itemId = this.props.itemId;
        this.setState({ loading: true });

        fetch(`http://localhost:8090/auth/edit-item/${itemId}`, {

            method: 'PATCH',

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

    render() {

        return (
<>
            <MessageStyles><p id="message-test">{this.state.message}</p></MessageStyles>

            <Form id="form-test" encType="multipart/form-data" onSubmit={this.handleSubmit}>

                <fieldset aria-busy={this.state.loading} disabled={this.state.loading}>

                    <h1>Edit{this.state.loading ? 'ing ' : ''} Item</h1>

                    {/* checking presents of cookies (we also check on the backend the values) */}
                    <input type="hidden" name="cookie" value={cookie.load('connect.sid')} />
                    <input type="hidden" name="XSRF-TOKEN" value={cookie.load('token')} />
                    <input type="hidden" name="authCookie" value={cookie.load('authCookie')} />

                    <label htmlFor="title">

                        Title

                        <input

                            name="title"
                            id="title-test"
                            placeholder="enter a title"
                            value={this.state.title}
                            onChange={this.handleInputs}
                            className={this.state.message === 'Title needs to be at least 3 characters' ? 'invalid' : '' }

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
                            className={this.state.message === 'Price cannot be less or equal than 0' ? 'invalid' : '' }

                        />

                    </label>

                    <label htmlFor="image">

                        Image

                        <input

                            type="file"
                            name="image"
                            id="image-test"
                            placeholder="upload an image"
                            onChange={this.handleImageUpload}
                            className={this.state.message === 'you need to upload an image' ? 'invalid' : '' }

                        />

                    </label>

                    {/* showing preview */}
                    {this.state.image && (

                        <img src={this.state.image} alt={this.state.title} width="300" />

                    )}

                    <label htmlFor="description">

                        Description

                        <input

                            name="description"
                            id="description-test"
                            placeholder="enter a description"
                            value={this.state.description}
                            onChange={this.handleInputs}
                            className={this.state.message === 'Description needs to be at least 5 characters' ? 'invalid' : '' }

                        />

                    </label>

                    <button>{this.state.loading ? 'Editing Item!' : 'Edit Item!'}</button>

                    <RemoveItem itemId={this.props.itemId} />

                </fieldset>

            </Form>

</>
        )

    }

}

export default EditItem;