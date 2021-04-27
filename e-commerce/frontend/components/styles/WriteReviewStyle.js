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

`;

export default WriteReviewStyle;