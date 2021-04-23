import styled from 'styled-components';

const ListOfItems = styled.div`

    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 20px;
    max-width: 80%;
    margin: 0 auto;
    height: 100%;

    @media only screen and (max-width: 1200px) {

        grid-template-columns: 100%;

    }

`;

export default ListOfItems;