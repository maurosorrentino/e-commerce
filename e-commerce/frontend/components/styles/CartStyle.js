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
        padding: .2rem;
        box-shadow: 0 2px 10px green;
        margin-bottom: 1rem;
        max-width: 95%;
        flex-wrap: wrap;

    }

    @media only screen and (max-width: 330px) {

        li {

            max-width: 35%;
            margin: 1rem;

        }

    }

    @media only screen and (min-width: 330px) and (max-width: 350px) {

        li {

            max-width: 40%;
            margin: 1rem;

        }

    }

    @media only screen and (min-width: 400px) and (max-width: 500px) {

        li {

            max-width: 50%;
            margin: 1rem;

        }

    }

    @media only screen and (min-width: 500px) and (max-width: 600px) {

        li {

            max-width: 65%; 
            margin: 1rem;

        }

    }

    @media only screen and (min-width: 700px) and (max-width: 800px) {

        li {

            max-width: 70%; 
            margin-left: 6rem; 

        }

    }

    @media only screen and (min-width: 600px) and (max-width: 700px) {

        li {

            max-width: 70%; 
            margin-left: 5rem; 

        }

    }

    @media only screen and (min-width: 350px) and (max-width: 400px) {

        li {

            max-width: 45%;
            margin-left: 1rem; 

        }
        
    }

    @media only screen and (min-width: 550px) and (max-width: 600px) {

        li {

            max-width: 65%;
            margin-left: 3rem;

        }
        
    }

    @media only screen and (min-width: 500px) and (max-width: 550px) {

        li {

            max-width: 65%;
            margin: 1rem;

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
        margin-right: .7rem;
        
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