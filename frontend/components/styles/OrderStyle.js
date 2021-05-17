import styled from 'styled-components';

const OrderStyle = styled.div`

    word-wrap: break-word;
    margin: 1rem;
    margin-right: 3.5rem;

    h1, p {

        margin: 1rem;
        text-align: center;
        font-weight: 600;
        color: green;
        text-transform: uppercase;

    }

    #order-id-total {

        color: black;
        box-shadow: 0 1px 10px green;
        margin: 0 auto;

    }

    ul {

        list-style: none;
        margin: 3rem auto;  

    }

    .order {

        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 15px green;
        margin: 1rem;
        max-width: 100%;
        flex-wrap: wrap;
        margin: 1rem auto;

    }

    .item {

        margin: .5rem auto;
        padding: .5rem;
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        border: 5px solid white;
        background: rgba(0, 0, 0, 0.02);

    }

    .item h1 {

        color: black

    }

    span {

        color: green;

    }

    @media only screen and (max-width: 380px) {

        .order {

            max-width: 75%;

        }

        .item {

            max-width: 95%;

        }

        p, h1 {

            font-size: 1rem;

        }

    }

    @media only screen and (max-width: 420px) {

        .order {

            max-width: 70%;

        }

        .item {

            max-width: 90%;

        }

        p, h1 {

            font-size: 1rem;

        }

    }

    @media only screen and (max-width: 300px) {

        .order {

            max-width: 100%;

        }

    }

    @media only screen and (min-width: 300px) and (max-width: 350px) {

        .order {

            max-width: 90%;

        }

    }

    @media only screen and (min-width: 420px) and (max-width: 600px) {

        .order {

            max-width: 65%;

        }

    }

`;

export default OrderStyle;