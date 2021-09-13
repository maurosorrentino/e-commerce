import React, { Component } from "react";
import cookie from "react-cookies";
import FormData from "form-data";

import Form from "./styles/Form";
import MessageStyles from "../components/styles/MessageStyles";
import RemoveItem from "../components/RemoveItem";

class EditItem extends Component {
  state = {
    title: this.props.title,
    price: this.props.price,
    description: this.props.description,
    image: this.props.img,
    stock: this.props.stock,
    loading: false,
    message: null,
  };

  // handling inputs of the user
  handleInputs = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageUpload = () => {
    // destructuring
    const imageFile = document.getElementById("image-test");
    const files = imageFile.files;

    // debugging purposes
    console.log("Image file: ", files[0]);

    const formData = new FormData();

    // getting the 1st file that we find
    formData.append("file", files[0]);

    // appending cloudinary preset (folder where it will be stored the file)
    formData.append("upload_preset", process.env.PRESET);

    return fetch(process.env.CLOUDINARY, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())

      .then((res) => {
        // changing the state so that we can assign an url to the image
        this.setState({ image: res.secure_url });
      })

      .catch((err) => console.log(err));
  };

  // connecting react with node in order to have a connection between the client side and the database
  handleSubmit = (e) => {
    e.preventDefault();

    const itemId = this.props.itemId;
    this.setState({ loading: true });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/edit-item/${itemId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
        stock: this.state.stock,
        image: this.state.image,
      }),
    })
      .then((res) => {
        return res.json();
      })

      .then((resData) => {
        this.setState({ loading: false, message: resData.message });
      })

      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    return (
      <>
        {this.state.message && (
          <MessageStyles>
            <h1
              className={
                this.state.message ===
                  "Title needs to be at least 3 characters" ||
                this.state.message === "Price cannot be less or equal than 0" ||
                this.state.message ===
                  "Description needs to be at least 5 characters" ||
                this.state.message === "the number has to be an integer"
                  ? "red"
                  : ""
              }
              id="message-test"
            >
              {this.state.message}
            </h1>
          </MessageStyles>
        )}

        <Form
          key={this.props.itemId}
          id="form-test"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <fieldset
            aria-busy={this.state.loading}
            disabled={this.state.loading}
          >
            <h1>Edit{this.state.loading ? "ing " : ""} Item</h1>

            {/* checking presents of cookies (we also check on the backend the values) */}
            <input
              type="hidden"
              name="cookie"
              value={cookie.load("connect.sid")}
            />
            <input
              type="hidden"
              name="XSRF-TOKEN"
              value={cookie.load("token")}
            />
            <input
              type="hidden"
              name="authCookie"
              value={cookie.load("authCookie")}
            />

            <label htmlFor="title">
              Title
              <input
                name="title"
                id="title-test"
                placeholder="enter a title"
                value={this.state.title}
                onChange={this.handleInputs}
                className={
                  this.state.message ===
                  "Title needs to be at least 3 characters"
                    ? "invalid"
                    : ""
                }
              />
            </label>

            <label htmlFor="price">
              Price €
              <input
                name="price"
                type="number"
                id="price-test"
                placeholder="enter a price"
                value={this.state.price}
                onChange={this.handleInputs}
                className={
                  this.state.message === "Price cannot be less or equal than 0"
                    ? "invalid"
                    : ""
                }
                min="0.01"
                step="0.01"
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
              />
            </label>

            {/* showing preview */}
            {this.state.image && (
              <figure>
                <img src={this.state.image} alt={this.state.title} />
              </figure>
            )}

            <label htmlFor="description">
              Description
              <input
                name="description"
                id="description-test"
                placeholder="enter a description"
                value={this.state.description}
                onChange={this.handleInputs}
                className={
                  this.state.message ===
                  "Description needs to be at least 5 characters"
                    ? "invalid"
                    : ""
                }
              />
            </label>

            <label htmlFor="stock">
              How many items do you have in stock?
              <input
                name="stock"
                type="number"
                id="stock-test"
                placeholder="enter how many items you have in stock"
                value={this.state.stock}
                step="1"
                onChange={this.handleInputs}
                className={
                  this.state.message ===
                    "Items in stock need to be grater than 0" ||
                  this.state.message === "the number has to be an integer"
                    ? "invalid"
                    : ""
                }
              />
            </label>

            <button>
              {this.state.loading ? "Editing Item!" : "Edit Item!"}
            </button>

            <RemoveItem itemId={this.props.itemId} />
          </fieldset>
        </Form>
      </>
    );
  }
}

export default EditItem;
