import styled from 'styled-components';

const OrderStyle = styled.div`

    word-wrap: break-word;
    margin: 1rem;
    margin-right: 3.5rem;

    ul {

        list-style: none;
        margin-top: 3rem;

    }

    .order {

        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 15px rgba(0, 0, 0, 0.30);
        margin: 1rem;
        max-width: 100%;
        flex-wrap: wrap;

    }

    .item {

        margin: .5rem 10px;
        padding: .5rem;
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        border: 5px solid white;
        background: rgba(0, 0, 0, 0.02);
        color: #00695c;

    }

    @media only screen and (max-width: 380px) {

        .order {

            max-width: 75%;
            margin-left: 1rem;

        }

        .item {

            max-width: 95%;
            margin: .5rem 5px;

        }

    }

    @media only screen and (max-width: 420px) {

        .order {

            max-width: 70%;
            margin: 0 auto;

        }

        margin-right: 0;

    }

    @media only screen and (max-width: 300px) {

        .order {

            max-width: 90%;
            margin: 0;

        }

    }

    @media only screen and (min-width: 300px) and (max-width: 350px) {

        .order {

            max-width: 95%;

        }

        .item {

            margin-left: .7rem;

        }

    }

    @media only screen and (min-width: 420px) and (max-width: 600px) {

        .order {

            max-width: 65%;
            margin-left: 4.5rem;

        }

        .item {

            margin-left: 1.7rem;

        }

    }

    h1, p {

        margin: 1rem;
        text-align: center;
        font-weight: 600;
        color: green;
        text-transform: uppercase;

    }

    #order-id-total {

        color: black;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.30);
        
    }

`;

export default OrderStyle;