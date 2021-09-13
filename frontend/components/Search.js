import React, { Component } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

import SearchStyle from "../components/styles/SearchStyle";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      input: "",
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((resData) => {
        this.setState({ items: resData.items });
      })

      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    e.preventDefault();

    this.setState({ input: e.target.value });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    // here I handle the search bar with fuse
    const fuse = new Fuse(this.state.items, {
      // I only want the title to be found
      keys: ["title"],
    });

    // here we tell fuse to search the input of the user
    const results = fuse.search(this.state.input);

    // mapping the results that match and returning a <li> with the link of the item
    const itemsResults = results.map((result) => {
      return (
        <li key={result.item._id}>
          <Link href={`/view-item/${result.item._id}`}>
            {result.item.title}
          </Link>
        </li>
      );
    });

    return (
      <SearchStyle>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="search"
          value={this.state.input}
        />

        <ul>{itemsResults}</ul>
      </SearchStyle>
    );
  }
}

export default Search;
