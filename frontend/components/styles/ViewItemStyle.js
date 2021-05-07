import styled from 'styled-components';

const ViewItemStyle = styled.div`

    max-width: 50%;
    margin: 1rem auto;

    @media only screen and (max-width: 600px) {

        max-width: 100%;

    }

    @media only screen and (min-width: 600px) and (max-width: 1100px) {

        max-width: 80%;

    }

`;

export default ViewItemStyle;