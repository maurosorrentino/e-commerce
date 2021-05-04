import styled from 'styled-components';

const MessageStyles = styled.div`

    padding: 2rem;
    background: white;
    margin: 2rem auto;
    width: 80%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.30);
    word-wrap: break-word;
    text-transform: uppercase;

    h1 {

        text-align: center;
        font-weight: 600;
        color: green;

    }

    .red {

        color: red;

    }

    @media only screen and (max-width: 600px) {

        padding: 1rem;

        h1 {

            font-size: .7rem;

        }

    }

`;

export default MessageStyles;