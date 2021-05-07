import styled from 'styled-components';

const WriteReviewStyle = styled.div`

    text-transform: uppercase;
    text-align: center;

    button {

        width: auto;
        background: green;
        color: white;
        border: 0;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        margin: 1rem;
        text-transform: uppercase;

    }

    .remove-review {

        background: red;
        color: white;
        border: 0;
        font-size: .7rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        border-radius: 4px;

    }

    textarea {

        margin: 2rem auto;
        display: block;

    }

    button:hover {

        cursor: pointer;

    }

    .orange, .orange2 {

        color: orange;

    }

    @media only screen and (max-width: 600px) {

        button {

            font-size: 1.5rem;

        }

        h1 {

            font-size: 1.5rem;

        }

    }

`;

export default WriteReviewStyle;