import React, { Component } from "react";
import Link from "next/link";

import PayoutStyle from "../components/styles/PayoutStyle";
import Header from "../components/Header";
import LoadingStyle from "../components/styles/LoadingStyle";

class Payouts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payouts: [],
      loading: true,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/payouts`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })

      .then((resData) => {
        // mapping the orders so that we can show them
        this.setState({
          loading: false,
          payouts: resData.payouts.map((payout) => {
            return (
              <>
                <ul key={payout._id}>
                  <li>
                    Payout id: <span>{payout._id}</span>
                  </li>

                  <li>
                    Buyer id: <span>{payout.buyerId}</span>
                  </li>

                  <li>
                    Item id: <span>{payout.itemId}</span>
                  </li>

                  <li>
                    Amount: <span>{payout.amount} €</span>
                  </li>
                </ul>
              </>
            );
          }),
        });
      })

      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <Header />

        <PayoutStyle>
          <Link href="/auth/save-your-iban">save/change your bank account</Link>
        </PayoutStyle>

        {this.state.loading && <LoadingStyle>Loading...</LoadingStyle>}

        {this.state.payouts.length === 0 && !this.state.loading && (
          <PayoutStyle>
            <h1>you did not sell anything yet.</h1>
          </PayoutStyle>
        )}

        {!this.state.loading && this.state.payouts.length > 0 && (
          <PayoutStyle>
            <h1>
              here is {this.state.payouts.length > 1 ? "the list of" : ""} your
              payout{this.state.payouts.length > 1 ? "s" : ""}:{" "}
            </h1>

            {this.state.payouts}
          </PayoutStyle>
        )}
      </>
    );
  }
}

export default Payouts;
