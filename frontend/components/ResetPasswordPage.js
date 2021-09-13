import React, { Component } from "react";

import Form from "../components/styles/Form";
import MessageStyles from "../components/styles/MessageStyles";

class ResetPasswordPage extends Component {
  state = {
    loading: false,
    message: null,
    password: "",
    confirmPassword: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchData = (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const resetToken = this.props.resetToken;
    const userId = this.props.userId;

    // we need to encode the api point in order to connect to it
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/reset-password-form/${encodeURIComponent(resetToken)}/${userId}`,
      {
        method: "PATCH",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })

      .then((resData) => {
        this.setState({ message: resData.message, loading: false });
      })

      .then(() => {
        // redirecting to login page in case of success
        if (
          this.state.message ===
          "You Have Changed Your Password, You Are Being Readirected To The Login Page"
        ) {
          setTimeout(() => {
            window.location.replace("/auth/login");
          }, 2000);
        }

        // redirecting to reset password page in case of error in order to make the user request another reset password
        if (
          this.state.message ===
            "Forbidden! Please Request Another Password Reset, You Are Being Redirected To Reset Password Page" ||
          this.state.message ===
            "Sorry, We Could Not Find An Account, Please Request Another Password Reset. You Are Being Redirected To The Page"
        ) {
          setTimeout(() => {
            window.location.replace("/reset-password");
          }, 2000);
        }
      })

      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.message && (
          <MessageStyles>
            <h1
              className={
                this.state.message ===
                  "Forbidden! Please Request Another Password Reset, You Are Being Redirected To Reset Password Page" ||
                this.state.message ===
                  "Sorry, We Could Not Find An Account, Please Request Another Password Reset. You Are Being Redirected To The Page"
                  ? "red"
                  : ""
              }
              id="message-test"
            >
              {this.state.message}
            </h1>
          </MessageStyles>
        )}

        <Form onSubmit={this.fetchData}>
          <fieldset
            aria-busy={this.state.loading}
            disabled={this.state.loading}
          >
            <h1>Chang{this.state.loading ? "ing" : "e"} Your Password</h1>

            <label htmlFor="password">
              Password
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
                className={
                  this.state.message ===
                  "Password Needs To Be At Least 5 characters"
                    ? "invalid"
                    : ""
                }
                placeholder="enter your new password"
              />
            </label>

            <label htmlFor="confirm password">
              Confirm Password
              <input
                name="confirmPassword"
                type="password"
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                className={
                  this.state.message === "Passwords Do Not Match!"
                    ? "invalid"
                    : ""
                }
                placeholder="please confirm your new password"
              />
            </label>

            <button>
              Chang{this.state.loading ? "ing" : "e"} Your Password
            </button>
          </fieldset>
        </Form>
      </>
    );
  }
}

export default ResetPasswordPage;
