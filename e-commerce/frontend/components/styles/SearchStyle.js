import styled from 'styled-components';

const SearchStyle = styled.div`

    text-align: center;
    text-transform: uppercase;

    input {

        width: 100%;
        text-align: center;
        border: none;
        margin-top: 1rem;
        text-transform: uppercase;
        font-size: 2rem;

    }

    input:focus {

        outline: none;

    }

    li {

        list-style: none;
        margin: 1rem;
        box-shadow: 0 2px 1rem rgba(0, 0, 0, 0.30);
        max-width: 95%;
        padding: 1rem;
        word-break: break-all;

    }

    @media only screen and (max-width: 1100px) {

        ul {

            margin-right: 2rem;

        }

    }

`;

export default SearchStyle;