import React, { Component, useEffect } from 'react';

import StyleOfItem from '../components/styles/ItemStyles';
import Header from '../components/Header';
import ListOfItems from '../components/styles/ListOfItems';
import AddToCart from '../components/AddToCart';
import Pagination from '../components/styles/Pagination';

class Shop extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],
            totalItems: null,
            perPage: 4,
            currentPage: 1,
            lastPage: null,

        }    

        this.fetchData = this.fetchData.bind(this);

    }
 
    fetchData = () => {

        fetch(`http://localhost:8090/shop`, {

            method: 'GET',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ totalItems: resData.totalItems });

            /* mapping the items that we are getting from the backend and setting them into state so that we can fetch them */
            this.setState({ items: resData.items.map(item => {

                return(
<>
                    <StyleOfItem key={item._id}>

                        <h1>title</h1>
                        <p>{item.title}</p>

                        <img alt={item.title} src={item.image}></img>

                        <h1>description</h1>
                        <p>{item.description}</p>

                        <h1>price</h1>
                        <p>{item.price}</p>

                        {/* assigning the item id as props so that we can access it from AddToCart component and make a call to the right API point */}
                        <AddToCart itemId={item._id} />
                    
                    </StyleOfItem>
</>
                )

            }) });

        })

        .catch(err => {

            console.log(err);

        })

    } 

    handleClick = e => {

        // here we change the state of currentPage based on the page that the user clicks so that the index of the items that we want to show will change
        this.setState({ currentPage: Number(e.target.id) });

        const lastPage = Math.ceil(this.state.totalItems / this.state.perPage);

        /* disabling next button */
        if(this.state.currentPage = lastPage) {

            this.setState({ lastPage: lastPage });

        }

        // scrolling to the top
        window.scrollTo(0, 0)

    }

    // handling the prev button
    handlePrev = () => {

        this.setState({ currentPage: this.state.currentPage - 1 });
        window.scrollTo(0, 0);

        // disabled prev button
        if(this.state.currentPage === 1) {

            this.setState({ currentPage: 1 });

        }

    }

    // handling next button
    handleNext = () => {

        this.setState({ currentPage: this.state.currentPage + 1 });

        const lastPage = Math.ceil(this.state.totalItems / this.state.perPage);

        /* disabling next button */
        if(this.state.currentPage = lastPage) {

            this.setState({ lastPage: lastPage });

        }

        window.scrollTo(0, 0);

    }

    componentDidMount() {

        this.fetchData();

    }

    render() {

        /* logic for displaying items */

        // so we first get the index of the items that we want to display like this so that when the user clicks on a different page a new index will render 
        // and so the items that are shown will change
        const indexLastItem = this.state.currentPage * this.state.perPage;
        const indexFirstItem = indexLastItem - this.state.perPage;

        // with the slice function we only show 4 items per page by specifing the index of the items
        const currentItems = this.state.items.slice(indexFirstItem, indexLastItem);

        /* logic for displaying page numbers */

        // empty array where we will push every page numbers
        const pageNumbers = [];

        // loop so that we can calculate how many pages we need
        for(let i = 1; i <= Math.ceil(this.state.totalItems / this.state.perPage); i++) {

            pageNumbers.push(i);

        };

        // mapping the page numbers so that we can show it to the users
        const renderPageNumbers = pageNumbers.map(pageNumber => {

            return (

                <li key={pageNumber} id={pageNumber} className={this.state.currentPage === pageNumber ? 'current-page' : ''} onClick={this.handleClick}>{pageNumber}</li>

            );

        });

        return(
<>
            <Header />

            <ListOfItems>{currentItems}</ListOfItems>

            <Pagination>

                <ul>
                    
                    <button disabled={this.state.currentPage === 1 ? true : false} onClick={this.handlePrev}>Prev</button>
                    
                        {renderPageNumbers}

                    <button disabled={this.state.currentPage === this.state.lastPage ? true : false} onClick={this.handleNext}>Next</button>
                    
                </ul>

            </Pagination>

</>
        )

    }

};

export default Shop;