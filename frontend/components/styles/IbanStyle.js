import styled from 'styled-components';

const IbanStyle = styled.div`

    text-align: center;
    text-transform: uppercase;

    span {

        color: green;
        
    }

    @media only screen and (max-width: 600px) {

        h1, span {

            font-size: 1rem;

        }

    }

`;

export default IbanStyle;