import styled from 'styled-components';

const CartStyle = styled.div`

    ul {

        list-style: none;
        padding: 0;
        margin: auto;
        width: 45rem;

    }

    li {

        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        box-shadow: 0 2px 10px green;
        margin-bottom: 1rem;
        max-width: 95%;
        flex-wrap: wrap;

    }

    @media only screen and (min-width: 400px) and (max-width: 500px) {

        ul {

            max-width: 200%;

        }

        li {

            max-width: 50%;
            margin-left: 1rem;

        }

    }

    @media only screen and (min-width: 500px) and (max-width: 600px) {

        ul {

            max-width: 200%;

        }

        li {

            max-width: 70%;
            margin-left: 1rem;

        }

    }

    @media only screen and (max-width: 400px) {

        ul {

            max-width: 180%;

        }

        li {

            max-width: 50%;
            margin-left: 1rem;

        }
        
    }

    h1, p {

        margin: 1rem;
        text-align: center;
        font-weight: 600;
        color: green;
        text-transform: uppercase;

    }

    h1 {

        color: black;
        font-size: 1rem;

    }

    button {

        background: red;
        color: white;
        border: 0;
        font-size: .7rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        border-radius: 4px;
        
    }

    button:hover {

        cursor: pointer;

    }

    #checkoutButton {

        margin: 1rem auto;
        display: block;
        background-color: green;
        font-size: 1.5rem;
        text-transform: uppercase;

    }

`;

export default CartStyle;